import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Shahariyas's Portfolio...");

  // 1. Admin Account
  const adminEmail = process.env.ADMIN_EMAIL || "shahariyaschatheri10@gmail.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "Shahariyas@Admin2026!";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail.toLowerCase().trim() },
    update: {
      hashedPassword,
      name: "Shahariyas C",
    },
    create: {
      email: adminEmail.toLowerCase().trim(),
      hashedPassword,
      name: "Shahariyas C",
    },
  });
  console.log(`✅ Admin account seeded: ${adminEmail}`);

  // 2. Profile Singleton
  await prisma.profile.upsert({
    where: { id: "default" },
    update: {
      name: "Shahariyas C",
      title: "AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
      headline:
        "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation.",
      statement:
        "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation. Full stack expertise in Django, Node.js, React.js, Next.js, REST APIs, JWT authentication, PostgreSQL, Docker and CI/CD. Delivered 50+ n8n workflows for 20+ clients, plus AI agents and chatbots built on OpenAI, Gemini and the WhatsApp Business API for customer engagement. Experienced in agentic AI, RAG and workflow automation, with a focus on turning business requirements into reliable, production-ready systems.",
      email: "shahariyaschatheri10@gmail.com",
      phone: "+971 54 153 3979",
      location: "Dubai, UAE",
      availabilityStatus: "Immediate Joiner | Open to relocation",
      resumeUrl: "/resume.pdf",
      githubUrl: "https://github.com/shahariyasCH",
      linkedinUrl: "https://linkedin.com/in/shahariyas-c-35ba31309",
      seoTitle: "Shahariyas C | AI Automation Developer & Full Stack Developer",
      seoDescription:
        "Production-grade portfolio of Shahariyas C: AI Automation Developer, Full Stack Developer, n8n, LLMs & RAG specialist.",
    },
    create: {
      id: "default",
      name: "Shahariyas C",
      title: "AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
      headline:
        "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation.",
      statement:
        "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation. Full stack expertise in Django, Node.js, React.js, Next.js, REST APIs, JWT authentication, PostgreSQL, Docker and CI/CD. Delivered 50+ n8n workflows for 20+ clients, plus AI agents and chatbots built on OpenAI, Gemini and the WhatsApp Business API for customer engagement. Experienced in agentic AI, RAG and workflow automation, with a focus on turning business requirements into reliable, production-ready systems.",
      email: "shahariyaschatheri10@gmail.com",
      phone: "+971 54 153 3979",
      location: "Dubai, UAE",
      availabilityStatus: "Immediate Joiner | Open to relocation",
      resumeUrl: "/resume.pdf",
      githubUrl: "https://github.com/shahariyasCH",
      linkedinUrl: "https://linkedin.com/in/shahariyas-c-35ba31309",
      seoTitle: "Shahariyas C | AI Automation Developer & Full Stack Developer",
      seoDescription:
        "Production-grade portfolio of Shahariyas C: AI Automation Developer, Full Stack Developer, n8n, LLMs & RAG specialist.",
    },
  });
  console.log("✅ Profile seeded");

  // 3. Experiences
  await prisma.experience.deleteMany();

  const experiences = [
    {
      company: "IntelliJohn Labs",
      title: "Lead AI Automation Developer",
      location: "Kochi, Kerala (Remote)",
      startDate: "Sep 2025",
      endDate: null,
      isCurrent: true,
      order: 1,
      responsibilities: JSON.stringify([
        "Delivered 50+ agentic and non-agentic n8n workflows for 20+ clients across WhatsApp, Instagram and Facebook.",
        "Built AI chatbots with OpenAI, Google Gemini, LangChain and RAG to automate customer support, knowledge retrieval and sales interactions, contributing to 200+ captured leads.",
        "Implemented Retrieval-Augmented Generation (RAG) workflows for context-aware AI responses from business-specific knowledge sources.",
        "Developed Next.js and React web applications, including booking management systems with AI-powered automation.",
        "Integrated n8n workflows with PostgreSQL databases and web applications to automate business processes and customer interactions.",
        "Designed 24/7 automation workflows with exception handling, queue management and automated error recovery.",
        "Automated REST API integration, web scraping and data transformation with Python and JavaScript.",
        "Connected workflows to email, external services and legacy systems through REST and GraphQL APIs using OAuth 2.0 authentication.",
      ]),
      techTags: JSON.stringify([
        "n8n",
        "AI Agents",
        "LangChain",
        "OpenAI API",
        "Google Gemini",
        "RAG",
        "Next.js",
        "React.js",
        "PostgreSQL",
        "Python",
        "JavaScript",
        "REST APIs",
        "GraphQL",
        "OAuth 2.0",
        "WhatsApp Business API",
      ]),
    },
    {
      company: "Luminar Techno Lab",
      title: "Full Stack Developer",
      location: "Kochi, Kerala",
      startDate: "Aug 2024",
      endDate: "Jun 2025",
      isCurrent: false,
      order: 2,
      responsibilities: JSON.stringify([
        "Engineered a modular Django back end with RESTful API endpoints serving a React client.",
        "Secured user data with JWT authentication and role-based access control (RBAC).",
        "Designed MySQL and SQLite schemas that improved data integrity and query speed.",
        "Delivered responsive React interfaces for mobile, tablet and desktop devices.",
      ]),
      techTags: JSON.stringify([
        "Django",
        "Python",
        "React.js",
        "RESTful APIs",
        "JWT Auth",
        "RBAC",
        "MySQL",
        "SQLite",
        "Responsive UI",
      ]),
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ Seeded ${experiences.length} experience records`);

  // 4. Skills & Categories
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  const skillCategories = [
    {
      name: "Generative AI & LLM Engineering",
      order: 1,
      skills: [
        { name: "LLMs", description: "Large Language Model prompting, evaluation, fine-tuning and context windows" },
        { name: "RAG (Retrieval-Augmented Generation)", description: "Context-aware generation from vector databases and external knowledge bases" },
        { name: "Embeddings", description: "Semantic vector representations for document indexing and retrieval" },
        { name: "Prompt Engineering", description: "Few-shot prompting, system steering, reasoning chains and structured output generation" },
        { name: "Structured Outputs", description: "JSON schema enforcement, Pydantic validation, and type-safe LLM outputs" },
        { name: "AI Agents & Agentic AI", description: "Autonomous multi-step agents, planning loops, and goal-oriented execution" },
        { name: "Tool Calling", description: "Function calling and dynamic external tool execution via LLMs" },
        { name: "AI Chatbots", description: "Conversational customer engagement and automated support agents" },
        { name: "NLP", description: "Natural language processing, entity extraction, sentiment analysis, and tokenization" },
      ],
    },
    {
      name: "AI APIs & Frameworks",
      order: 2,
      skills: [
        { name: "OpenAI API", description: "GPT-4o, GPT-4o-mini, embeddings, assistants and vision models" },
        { name: "Gemini API", description: "Google Gemini 1.5 Flash & Pro multimodal integration and context caching" },
        { name: "Claude API", description: "Anthropic Claude 3.5 Sonnet agentic tool workflows and code reasoning" },
        { name: "LangChain", description: "Chains, retrieval agents, prompt templates, and vector store connectors" },
        { name: "LangGraph", description: "Cyclic state machines and multi-agent coordination workflows" },
        { name: "Hugging Face", description: "Open-source transformers, pipelines, tokenizers, and model hosting" },
        { name: "WhatsApp Business API", description: "Automated business chatbots and conversational marketing integrations" },
      ],
    },
    {
      name: "Automation & Integration",
      order: 3,
      skills: [
        { name: "n8n", description: "Delivered 50+ agentic and non-agentic workflows for 20+ clients across social channels" },
        { name: "Workflow Automation", description: "24/7 automated pipelines with exception handling, queueing and error recovery" },
        { name: "API Orchestration", description: "Bridging diverse microservices, webhook triggers, and enterprise backends" },
        { name: "Web Scraping", description: "Dynamic headless scraping and data pipeline ingestion via Python & Node" },
        { name: "REST APIs", description: "Clean RESTful design, serialization, rate limiting, and HTTP error semantics" },
        { name: "GraphQL", description: "Flexible data querying, schemas, mutations, and resolver logic" },
        { name: "OAuth 2.0", description: "Secure token authorizations, client credentials, and user delegating flows" },
        { name: "JSON", description: "Data interchange, schema validation, serialization, and stream parsing" },
      ],
    },
    {
      name: "Programming Languages",
      order: 4,
      skills: [
        { name: "Python", description: "Core backend engineering, automation scripts, LLM pipelines, and Django REST" },
        { name: "JavaScript", description: "Modern ES6+, async/await, DOM scripting, and Node.js microservices" },
        { name: "TypeScript", description: "Strict static typing, interfaces, generic types, and type-safe full stack apps" },
        { name: "SQL", description: "Complex joins, indexing, query execution planning, and transactions" },
        { name: "Dart", description: "Cross-platform mobile application programming with Flutter" },
        { name: "HTML5", description: "Semantic markup, accessibility (a11y), and modern standards" },
        { name: "CSS3", description: "Modern responsive layouts, Flexbox, Grid, keyframe animations" },
      ],
    },
    {
      name: "Backend & Security",
      order: 5,
      skills: [
        { name: "Django", description: "High-performance Python backend framework with robust ORM and security defaults" },
        { name: "Node.js", description: "Event-driven asynchronous backend services, API routes, and webhook servers" },
        { name: "JWT Authentication", description: "Stateless JSON Web Tokens with access/refresh rotation and secure headers" },
        { name: "RBAC", description: "Role-Based Access Control enforcing granular permission hierarchies" },
        { name: "NextAuth.js", description: "Production session management, authentication middleware, and JWT callbacks" },
        { name: "Google OAuth", description: "Social SSO authentication with verified user profiles and secure consent" },
        { name: "API Security", description: "CORS, rate limiting, data sanitation, CSRF protection, and environment secret handling" },
      ],
    },
    {
      name: "Frontend & Payments",
      order: 6,
      skills: [
        { name: "React.js", description: "Component-driven architecture, custom hooks, virtual DOM, and client state" },
        { name: "Next.js", description: "App Router, SSR, Server Actions, API routes, and edge runtime performance" },
        { name: "Tailwind CSS", description: "Utility-first modern styling, responsive layouts, and custom design systems" },
        { name: "Responsive UI", description: "Mobile-first, cross-browser fluid user experiences and touch ergonomics" },
        { name: "Razorpay", description: "Payment gateway integration, subscriptions, webhooks, and geo-based pricing" },
      ],
    },
    {
      name: "Databases & ORM",
      order: 7,
      skills: [
        { name: "PostgreSQL", description: "Relational database modeling, complex indexing, JSONB queries, and ACID guarantees" },
        { name: "MySQL", description: "Enterprise relational database schema design and optimized query execution" },
        { name: "SQLite", description: "Lightweight local/edge database with fast embedded query execution" },
        { name: "Firebase", description: "Firestore real-time state synchronization, authentication, and Cloud Messaging" },
        { name: "Prisma ORM", description: "Type-safe database client, declarative schema migrations, and relational modeling" },
        { name: "Neon", description: "Serverless Postgres with branching, connection pooling, and autoscaling compute" },
      ],
    },
    {
      name: "DevOps & Tools",
      order: 8,
      skills: [
        { name: "Docker", description: "Containerization of applications, multi-stage builds, and Docker Compose environments" },
        { name: "GitHub Actions & CI/CD", description: "Automated linting, test suites, builds, and seamless deployment workflows" },
        { name: "Git & GitHub", description: "Collaborative version control, pull requests, branch protection, and code reviews" },
        { name: "Vercel, Render & Netlify", description: "Cloud platform hosting, edge routing, serverless functions, and automated deploys" },
        { name: "Postman", description: "REST/GraphQL API testing, environment mock servers, and automated collection runs" },
      ],
    },
    {
      name: "Languages (Spoken)",
      order: 9,
      skills: [
        { name: "English", description: "Advanced professional proficiency" },
        { name: "Malayalam", description: "Advanced native / bilingual proficiency" },
        { name: "Hindi", description: "Beginner proficiency" },
        { name: "Tamil", description: "Speaking proficiency" },
      ],
    },
  ];

  for (const cat of skillCategories) {
    const categoryRecord = await prisma.skillCategory.create({
      data: {
        name: cat.name,
        order: cat.order,
      },
    });

    for (let i = 0; i < cat.skills.length; i++) {
      await prisma.skill.create({
        data: {
          categoryId: categoryRecord.id,
          name: cat.skills[i].name,
          description: cat.skills[i].description,
          order: i + 1,
        },
      });
    }
  }
  console.log("✅ Seeded Skill categories and skills");

  // 5. Featured Projects
  await prisma.project.deleteMany();

  const projects = [
    {
      title: "ResumeAt: AI-Powered ATS Resume Builder SaaS",
      category: "Full Stack SaaS Platform",
      description:
        "A full-stack SaaS resume builder with ATS-optimized templates, PDF/DOCX export, cover letter generation, multi-tier subscription payments via Razorpay, and custom analytics.",
      features: JSON.stringify([
        "Built a full-stack SaaS resume builder with ATS-optimized templates, PDF/DOCX export and cover letter generation.",
        "Implemented a multi-tier subscription system with the Razorpay payment gateway and geo-based pricing.",
        "Designed a credit-based download system with per-plan limits on resumes, cover letters and template access.",
        "Integrated Google OAuth and Email OTP authentication via NextAuth.js.",
        "Modeled user, resume, payment and analytics data with Prisma ORM and PostgreSQL (Neon).",
        "Deployed on Vercel with custom analytics, visitor tracking and an admin dashboard.",
      ]),
      techStack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL (Neon)",
        "Razorpay",
        "NextAuth.js",
        "Tailwind CSS",
        "Vercel",
      ]),
      liveUrl: "https://resume-at.vercel.app",
      githubUrl: "",
      caseStudyUrl: "",
      coverImageUrl: "/images/projects/resumeat-preview.jpg",
      order: 1,
    },
    {
      title: "E-Commerce Web Application",
      category: "Full Stack Web Development",
      description:
        "A complete full-stack e-commerce store with 5 core modules: authentication, catalog, shopping cart, Razorpay payment gateway, and administrative management.",
      features: JSON.stringify([
        "Shipped a full-stack store with 5 modules: authentication, catalog, cart, Razorpay payments and admin.",
        "Integrated the Razorpay payment gateway for online checkout.",
        "Engineered backend with Django and Python, utilizing SQLite for structured data management.",
        "Implemented secure JWT authentication and role-based access for customer and admin portals.",
      ]),
      techStack: JSON.stringify(["Django", "Python", "SQLite", "Razorpay", "JavaScript", "HTML5", "CSS3"]),
      liveUrl: "",
      githubUrl: "https://github.com/shahariyasCH/e-demoproject",
      caseStudyUrl: "",
      coverImageUrl: "/images/projects/ecommerce-preview.jpg",
      order: 2,
    },
    {
      title: "Disaster Alert & Management System (DAMS)",
      category: "Mobile & Real-Time Cloud Integration",
      description:
        "A real-time disaster emergency mobile application in Flutter for Android & iOS backed by Firebase, paired with a Google Maps web control panel for monitoring and relief dispatch.",
      features: JSON.stringify([
        "Created a real-time alert app in Flutter for Android and iOS, backed by Firebase.",
        "Built a Google Maps web control panel for monitoring and managing alerts.",
        "Integrated Google Maps API for incident geolocation tracking and emergency visualization.",
        "Enabled real-time push alerts and live state synchronization via Firebase Cloud Messaging.",
      ]),
      techStack: JSON.stringify(["Flutter", "Firebase", "Maps API", "Dart", "Google Maps"]),
      liveUrl: "",
      githubUrl: "https://github.com/shahariyasCH/DAMS",
      caseStudyUrl: "",
      coverImageUrl: "/images/projects/dams-preview.jpg",
      order: 3,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }
  console.log(`✅ Seeded ${projects.length} featured projects`);

  // 6. Education
  await prisma.education.deleteMany();

  const educations = [
    {
      institution: "APJ Abdul Kalam Technological University",
      degree: "B.Tech, Computer Science",
      location: "Kerala, India",
      startDate: "Jun 2020",
      endDate: "May 2024",
      gpa: "6.7/10",
      coursework: JSON.stringify([
        "System Software",
        "Algorithm Analysis and Design",
        "Database Management Systems",
        "Machine Learning",
        "Deep Learning",
        "Operating Systems",
      ]),
      order: 1,
    },
  ];

  for (const edu of educations) {
    await prisma.education.create({ data: edu });
  }
  console.log(`✅ Seeded ${educations.length} education records`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
