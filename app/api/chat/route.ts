import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  defaultProfile,
  defaultExperiences,
  defaultProjects,
  defaultSkillCategories,
  defaultEducation,
} from "@/lib/initial-data";
import { parseJsonArray } from "@/lib/utils";

// In-memory rate limiting for chat endpoint to prevent abuse
const chatRateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = chatRateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    chatRateLimitMap.set(ip, { count: 1, expiresAt: now + 60 * 1000 });
    return true;
  }
  if (entry.count >= 20) {
    return false; // Max 20 queries per minute per IP
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          text: "You have sent too many questions in a short period. Please wait a minute before asking again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const query: string = (body.message || "").trim();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // 1. Fetch live portfolio data from DB (fallback to initial-data)
    const [profileDb, experiencesDb, projectsDb, skillCategoriesDb, educationDb] =
      await Promise.all([
        prisma.profile.findUnique({ where: { id: "default" } }).catch(() => null),
        prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.skillCategory
          .findMany({
            orderBy: { order: "asc" },
            include: { skills: { orderBy: { order: "asc" } } },
          })
          .catch(() => []),
        prisma.education.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      ]);

    const profile = profileDb || defaultProfile;
    const experiences = experiencesDb.length > 0 ? experiencesDb : defaultExperiences;
    const projects = projectsDb.length > 0 ? projectsDb : defaultProjects;
    const skillCategories =
      skillCategoriesDb.length > 0 ? skillCategoriesDb : defaultSkillCategories;
    const education = educationDb.length > 0 ? educationDb : defaultEducation;

    // 2. Build structured knowledge context for AI
    const knowledgeBase = `
CANDIDATE INFORMATION:
- Name: ${profile.name}
- Title: ${profile.title}
- Headline: ${profile.headline}
- Location: ${profile.location} (Available immediately for UAE on-site/hybrid and global remote opportunities)
- Email: ${profile.email}
- Phone: ${profile.phone}
- Availability: ${profile.availabilityStatus}
- Bio/Statement: ${profile.statement}
- Resume PDF: ${profile.resumeUrl}
- GitHub: ${profile.githubUrl}
- LinkedIn: ${profile.linkedinUrl}

WORK EXPERIENCE:
${experiences
  .map(
    (exp: any) => `
* Company: ${exp.company}
  Title: ${exp.title}
  Location: ${exp.location}
  Dates: ${exp.startDate} - ${exp.isCurrent ? "Present" : exp.endDate}
  Responsibilities: ${parseJsonArray(exp.responsibilities).join("; ")}
  Technologies: ${parseJsonArray(exp.techTags).join(", ")}
`
  )
  .join("")}

FEATURED PROJECTS:
${projects
  .map(
    (proj: any) => `
* Title: ${proj.title} (${proj.category})
  Overview: ${proj.description}
  Key Capabilities: ${parseJsonArray(proj.features).join("; ")}
  Tech Stack: ${parseJsonArray(proj.techStack).join(", ")}
  Live App: ${proj.liveUrl || "Available on request"}
  GitHub: ${proj.githubUrl || "Available on request"}
`
  )
  .join("")}

TECHNICAL SKILLS & PROFICIENCIES:
${skillCategories
  .map(
    (cat: any) => `
* ${cat.name}: ${(cat.skills || []).map((s: any) => `${s.name}${s.description ? ` (${s.description})` : ""}`).join(", ")}
`
  )
  .join("")}

ACADEMIC BACKGROUND & EDUCATION:
${education
  .map(
    (edu: any) => `
* Degree: ${edu.degree}
  Institution: ${edu.institution} (${edu.location})
  Period: ${edu.startYear} - ${edu.endYear}
  GPA/Marks: ${edu.gpa || "N/A"}
  Details: ${edu.details || ""}
`
  )
  .join("")}
`;

    // 3. System instruction strictly enforcing training only on Shahariyas's data
    const systemPrompt = `You are the personal AI Assistant for Shahariyas, integrated into his official portfolio website.

CRITICAL INSTRUCTIONS & STRICT BOUNDARIES:
1. ONLY ANSWER ABOUT SHAHARIYAS: You are strictly trained and authorized to answer questions about Shahariyas, his background, technical stack (Python, Django, React, UiPath, etc.), featured projects, work experience, education, resume, and how to hire or contact him.
2. REFUSE UNRELATED QUESTIONS: If the user asks about ANYTHING unrelated to Shahariyas (for example: current world news, weather forecasts, general math problems, recipes, writing code or essays for unrelated tasks, politics, celebrities, or random trivia), you MUST politely refuse:
"I am an AI assistant specifically trained on Shahariyas's professional background and portfolio. I can only answer questions regarding his skills, projects, work experience, education, and how to hire him."
3. STRICT FACTUAL ACCURACY: Use ONLY the verified data provided below. Do NOT invent, assume, or hallucinate any facts, jobs, degrees, or certifications.
4. CONCISE & PROFESSIONAL: Deliver helpful, friendly, and concise answers (typically 2-4 sentences or short bullet points).

VERIFIED PORTFOLIO DATA:
${knowledgeBase}
`;

    let replyText = "";

    // 4. Connect to LLM API (Google Gemini API or OpenAI API)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemPrompt}\n\nVisitor Question: "${query}"\n\nAssistant Response:`,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 350,
                temperature: 0.2,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        } else {
          const errText = await geminiRes.text();
          console.warn("Gemini API non-ok status:", geminiRes.status, errText);
        }
      } catch (e) {
        console.warn("Gemini API call encountered an issue, falling back to local grounded engine:", e);
      }
    } else if (openaiKey) {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: query },
            ],
            max_tokens: 350,
            temperature: 0.2,
          }),
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json();
          replyText = openaiData.choices?.[0]?.message?.content?.trim() || "";
        }
      } catch (e) {
        console.warn("OpenAI API call encountered an issue, falling back to local grounded engine:", e);
      }
    }

    // 5. Intelligent Grounded Knowledge Engine (Fallback when no API key or network glitch)
    if (!replyText) {
      replyText = generateGroundedResponse(
        query,
        profile,
        experiences,
        projects,
        skillCategories,
        education
      );
    }

    // 6. Action Detection for interactive UI buttons
    const action = detectAction(query, replyText, profile);

    return NextResponse.json({
      text: replyText,
      action,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        text: "I experienced a brief connection hiccup. Shahariyas is a Python Full Stack Developer & Lead Automation Engineer. Feel free to explore his projects, experience, or contact him directly!",
        action: {
          type: "scroll",
          target: "#projects",
          label: "Explore Featured Projects",
        },
      },
      { status: 200 }
    );
  }
}

/**
 * Intelligent Grounded Knowledge Engine
 * Answers accurately from the candidate's exact data without hallucination
 * Politely refuses queries outside Shahariyas's scope
 */
function generateGroundedResponse(
  query: string,
  profile: any,
  experiences: any[],
  projects: any[],
  skillCategories: any[],
  education: any[]
): string {
  const q = query.toLowerCase().trim();

  // Out-of-bounds rejection check
  const isOffTopic =
    (q.includes("weather") ||
      q.includes("recipe") ||
      q.includes("president") ||
      q.includes("movie") ||
      q.includes("song") ||
      q.includes("capital of") ||
      q.includes("elon musk") ||
      q.includes("crypto price") ||
      q.includes("write an essay") ||
      q.includes("solve for x")) &&
    !q.includes("shahariyas");

  if (isOffTopic) {
    return "I am an AI assistant specifically trained on Shahariyas's professional background and portfolio. I can only answer questions regarding his skills, projects, work experience, education, and how to hire him.";
  }

  // 1. Who is Shahariyas / Bio
  if (
    q.includes("who is") ||
    q.includes("about") ||
    q.includes("introduce") ||
    q.includes("yourself") ||
    q.includes("bio") ||
    q.includes("background")
  ) {
    return `${profile.name} is a ${profile.title} based in ${profile.location}. ${profile.headline} He is currently ${profile.availabilityStatus.toLowerCase()} for new opportunities.`;
  }

  // 2. Experience & Roles
  if (
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("job") ||
    q.includes("company") ||
    q.includes("career") ||
    q.includes("intellijhon") ||
    q.includes("luminar")
  ) {
    const list = experiences
      .map(
        (exp, i) =>
          `${i + 1}. ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.isCurrent ? "Present" : exp.endDate}): ${parseJsonArray(exp.responsibilities)[0] || ""}`
      )
      .join("\n");
    return `Here is Shahariyas's professional work experience:\n${list}`;
  }

  // 3. Technical Skills
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("python") ||
    q.includes("django") ||
    q.includes("react") ||
    q.includes("uipath") ||
    q.includes("database") ||
    q.includes("framework")
  ) {
    const skillsSummary = skillCategories
      .map(
        (cat) =>
          `• ${cat.name}: ${(cat.skills || []).map((s: any) => s.name).join(", ")}`
      )
      .join("\n");
    return `Shahariyas has core technical competencies across full-stack engineering and automation:\n${skillsSummary}`;
  }

  // 4. Projects
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("ecommerce") ||
    q.includes("dams") ||
    q.includes("app") ||
    q.includes("portfolio")
  ) {
    const projList = projects
      .map(
        (p, i) =>
          `${i + 1}. ${p.title} (${p.category}): ${p.description} Built with: ${parseJsonArray(p.techStack).join(", ")}.`
      )
      .join("\n");
    return `Shahariyas has engineered key production-grade projects:\n${projList}`;
  }

  // 5. Contact & WhatsApp & Hire
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("whatsapp") ||
    q.includes("hire") ||
    q.includes("call") ||
    q.includes("reach") ||
    q.includes("dubai")
  ) {
    return `You can reach Shahariyas directly via:\n• Email: ${profile.email}\n• Phone / WhatsApp: ${profile.phone}\n• Location: ${profile.location} (${profile.availabilityStatus})\nFeel free to connect directly or send a message!`;
  }

  // 6. Resume
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("download") ||
    q.includes("pdf")
  ) {
    return `You can view or download Shahariyas's verified resume PDF covering his full engineering experience, skills, and academic history.`;
  }

  // 7. Education
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("gpa") ||
    q.includes("study")
  ) {
    const eduList = education
      .map(
        (e) =>
          `• ${e.degree} from ${e.institution} (${e.startYear} - ${e.endYear}${e.gpa ? `, GPA: ${e.gpa}` : ""})`
      )
      .join("\n");
    return `Shahariyas's educational credentials:\n${eduList}`;
  }

  // 8. Automation / RPA
  if (
    q.includes("automation") ||
    q.includes("bot") ||
    q.includes("rpa") ||
    q.includes("n8n")
  ) {
    return `As Lead Automation Developer at Intellijhon, Shahariyas designs scalable UiPath and n8n autonomous bots for document processing, web scraping, queue management, and enterprise workflow optimization.`;
  }

  // Default grounded response
  return `${profile.name} is a ${profile.title} specialized in Python, Django REST Framework, React, and UiPath automations. You can ask me about his work experience, projects, skills, education, or how to contact him.`;
}

/**
 * Detects context-appropriate UI action buttons
 */
function detectAction(
  query: string,
  reply: string,
  profile: any
): { type: "scroll" | "email" | "resume" | "call" | "link"; target?: string; label: string } | undefined {
  const combined = (query + " " + reply).toLowerCase();

  if (combined.includes("whatsapp")) {
    const cleanPhone = (profile.phone || "").replace(/[^0-9]/g, "");
    return {
      type: "link",
      target: `https://wa.me/${cleanPhone}`,
      label: `Chat on WhatsApp (${profile.phone})`,
    };
  }

  if (combined.includes("resume") || combined.includes("cv") || combined.includes("download")) {
    return {
      type: "resume",
      target: profile.resumeUrl || "/resume.pdf",
      label: "Download Resume PDF",
    };
  }

  if (combined.includes("project")) {
    return {
      type: "scroll",
      target: "#projects",
      label: "View Featured Projects",
    };
  }

  if (combined.includes("experience") || combined.includes("work")) {
    return {
      type: "scroll",
      target: "#experience",
      label: "View Work Experience",
    };
  }

  if (combined.includes("skill") || combined.includes("stack")) {
    return {
      type: "scroll",
      target: "#skills",
      label: "Inspect Skills Matrix",
    };
  }

  if (combined.includes("contact") || combined.includes("hire") || combined.includes("email")) {
    return {
      type: "scroll",
      target: "#contact",
      label: "Get in Touch with Shahariyas",
    };
  }

  if (combined.includes("education") || combined.includes("degree")) {
    return {
      type: "scroll",
      target: "#education",
      label: "View Education",
    };
  }

  return undefined;
}
