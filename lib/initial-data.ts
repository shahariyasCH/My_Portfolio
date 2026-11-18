export { parseJsonArray } from "./utils";

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  headline: string;
  statement: string;
  email: string;
  phone: string;
  location: string;
  availabilityStatus: string;
  resumeUrl: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImageUrl?: string | null;
}

export interface ExperienceData {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  responsibilities: string[];
  techTags: string[];
  order: number;
}

export interface SkillItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  order: number;
}

export interface SkillCategoryData {
  id: string;
  name: string;
  order: number;
  skills: SkillItem[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  coverImageUrl?: string | null;
  order: number;
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string | null;
  coursework: string[];
  order: number;
}

export const defaultProfile: ProfileData = {
  id: "default",
  name: "Shahariyas C",
  title: "AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
  headline: "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation.",
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
};

export const defaultExperiences: ExperienceData[] = [
  {
    id: "exp-1",
    company: "IntelliJohn Labs",
    title: "Lead AI Automation Developer",
    location: "Kochi, Kerala (Remote)",
    startDate: "Sep 2025",
    endDate: null,
    isCurrent: true,
    order: 1,
    responsibilities: [
      "Delivered 50+ agentic and non-agentic n8n workflows for 20+ clients across WhatsApp, Instagram and Facebook.",
      "Built AI chatbots with OpenAI, Google Gemini, LangChain and RAG to automate customer support, knowledge retrieval and sales interactions, contributing to 200+ captured leads.",
      "Implemented Retrieval-Augmented Generation (RAG) workflows for context-aware AI responses from business-specific knowledge sources.",
      "Developed Next.js and React web applications, including booking management systems with AI-powered automation.",
      "Integrated n8n workflows with PostgreSQL databases and web applications to automate business processes and customer interactions.",
      "Designed 24/7 automation workflows with exception handling, queue management and automated error recovery.",
      "Automated REST API integration, web scraping and data transformation with Python and JavaScript.",
      "Connected workflows to email, external services and legacy systems through REST and GraphQL APIs using OAuth 2.0 authentication.",
    ],
    techTags: [
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
    ],
  },
  {
    id: "exp-2",
    company: "Luminar Techno Lab",
    title: "Full Stack Developer",
    location: "Kochi, Kerala",
    startDate: "Aug 2024",
    endDate: "Jun 2025",
    isCurrent: false,
    order: 2,
    responsibilities: [
      "Engineered a modular Django back end with RESTful API endpoints serving a React client.",
      "Secured user data with JWT authentication and role-based access control (RBAC).",
      "Designed MySQL and SQLite schemas that improved data integrity and query speed.",
      "Delivered responsive React interfaces for mobile, tablet and desktop devices.",
    ],
    techTags: [
      "Django",
      "Python",
      "React.js",
      "RESTful APIs",
      "JWT Auth",
      "RBAC",
      "MySQL",
      "SQLite",
      "Responsive UI",
    ],
  },
];

export const defaultSkillCategories: SkillCategoryData[] = [
  {
    id: "cat-1",
    name: "Generative AI & LLM Engineering",
    order: 1,
    skills: [
      { id: "s-1", categoryId: "cat-1", name: "LLMs", description: "Large Language Model prompting, evaluation, fine-tuning and context windows", order: 1 },
      { id: "s-2", categoryId: "cat-1", name: "RAG (Retrieval-Augmented Generation)", description: "Context-aware generation from vector databases and external knowledge bases", order: 2 },
      { id: "s-3", categoryId: "cat-1", name: "Embeddings", description: "Semantic vector representations for document indexing and retrieval", order: 3 },
      { id: "s-4", categoryId: "cat-1", name: "Prompt Engineering", description: "Few-shot prompting, system steering, reasoning chains and structured output generation", order: 4 },
      { id: "s-5", categoryId: "cat-1", name: "Structured Outputs", description: "JSON schema enforcement, Pydantic validation, and type-safe LLM outputs", order: 5 },
      { id: "s-6", categoryId: "cat-1", name: "AI Agents & Agentic AI", description: "Autonomous multi-step agents, planning loops, and goal-oriented execution", order: 6 },
      { id: "s-7", categoryId: "cat-1", name: "Tool Calling", description: "Function calling and dynamic external tool execution via LLMs", order: 7 },
      { id: "s-8", categoryId: "cat-1", name: "AI Chatbots", description: "Conversational customer engagement and automated support agents", order: 8 },
      { id: "s-9", categoryId: "cat-1", name: "NLP", description: "Natural language processing, entity extraction, sentiment analysis, and tokenization", order: 9 },
    ],
  },
  {
    id: "cat-2",
    name: "AI APIs & Frameworks",
    order: 2,
    skills: [
      { id: "s-10", categoryId: "cat-2", name: "OpenAI API", description: "GPT-4o, GPT-4o-mini, embeddings, assistants and vision models", order: 1 },
      { id: "s-11", categoryId: "cat-2", name: "Gemini API", description: "Google Gemini 1.5 Flash & Pro multimodal integration and context caching", order: 2 },
      { id: "s-12", categoryId: "cat-2", name: "Claude API", description: "Anthropic Claude 3.5 Sonnet agentic tool workflows and code reasoning", order: 3 },
      { id: "s-13", categoryId: "cat-2", name: "LangChain", description: "Chains, retrieval agents, prompt templates, and vector store connectors", order: 4 },
      { id: "s-14", categoryId: "cat-2", name: "LangGraph", description: "Cyclic state machines and multi-agent coordination workflows", order: 5 },
      { id: "s-15", categoryId: "cat-2", name: "Hugging Face", description: "Open-source transformers, pipelines, tokenizers, and model hosting", order: 6 },
      { id: "s-16", categoryId: "cat-2", name: "WhatsApp Business API", description: "Automated business chatbots and conversational marketing integrations", order: 7 },
    ],
  },
  {
    id: "cat-3",
    name: "Automation & Integration",
    order: 3,
    skills: [
      { id: "s-17", categoryId: "cat-3", name: "n8n", description: "Delivered 50+ agentic and non-agentic workflows for 20+ clients across social channels", order: 1 },
      { id: "s-18", categoryId: "cat-3", name: "Workflow Automation", description: "24/7 automated pipelines with exception handling, queueing and error recovery", order: 2 },
      { id: "s-19", categoryId: "cat-3", name: "API Orchestration", description: "Bridging diverse microservices, webhook triggers, and enterprise backends", order: 3 },
      { id: "s-20", categoryId: "cat-3", name: "Web Scraping", description: "Dynamic headless scraping and data pipeline ingestion via Python & Node", order: 4 },
      { id: "s-21", categoryId: "cat-3", name: "REST APIs", description: "Clean RESTful design, serialization, rate limiting, and HTTP error semantics", order: 5 },
      { id: "s-22", categoryId: "cat-3", name: "GraphQL", description: "Flexible data querying, schemas, mutations, and resolver logic", order: 6 },
      { id: "s-23", categoryId: "cat-3", name: "OAuth 2.0", description: "Secure token authorizations, client credentials, and user delegating flows", order: 7 },
      { id: "s-24", categoryId: "cat-3", name: "JSON", description: "Data interchange, schema validation, serialization, and stream parsing", order: 8 },
    ],
  },
  {
    id: "cat-4",
    name: "Programming Languages",
    order: 4,
    skills: [
      { id: "s-25", categoryId: "cat-4", name: "Python", description: "Core backend engineering, automation scripts, LLM pipelines, and Django REST", order: 1 },
      { id: "s-26", categoryId: "cat-4", name: "JavaScript", description: "Modern ES6+, async/await, DOM scripting, and Node.js microservices", order: 2 },
      { id: "s-27", categoryId: "cat-4", name: "TypeScript", description: "Strict static typing, interfaces, generic types, and type-safe full stack apps", order: 3 },
      { id: "s-28", categoryId: "cat-4", name: "SQL", description: "Complex joins, indexing, query execution planning, and transactions", order: 4 },
      { id: "s-29", categoryId: "cat-4", name: "Dart", description: "Cross-platform mobile application programming with Flutter", order: 5 },
      { id: "s-30", categoryId: "cat-4", name: "HTML5", description: "Semantic markup, accessibility (a11y), and modern standards", order: 6 },
      { id: "s-31", categoryId: "cat-4", name: "CSS3", description: "Modern responsive layouts, Flexbox, Grid, keyframe animations", order: 7 },
    ],
  },
  {
    id: "cat-5",
    name: "Backend & Security",
    order: 5,
    skills: [
      { id: "s-32", categoryId: "cat-5", name: "Django", description: "High-performance Python backend framework with robust ORM and security defaults", order: 1 },
      { id: "s-33", categoryId: "cat-5", name: "Node.js", description: "Event-driven asynchronous backend services, API routes, and webhook servers", order: 2 },
      { id: "s-34", categoryId: "cat-5", name: "JWT Authentication", description: "Stateless JSON Web Tokens with access/refresh rotation and secure headers", order: 3 },
      { id: "s-35", categoryId: "cat-5", name: "RBAC", description: "Role-Based Access Control enforcing granular permission hierarchies", order: 4 },
      { id: "s-36", categoryId: "cat-5", name: "NextAuth.js", description: "Production session management, authentication middleware, and JWT callbacks", order: 5 },
      { id: "s-37", categoryId: "cat-5", name: "Google OAuth", description: "Social SSO authentication with verified user profiles and secure consent", order: 6 },
      { id: "s-38", categoryId: "cat-5", name: "API Security", description: "CORS, rate limiting, data sanitation, CSRF protection, and environment secret handling", order: 7 },
    ],
  },
  {
    id: "cat-6",
    name: "Frontend & Payments",
    order: 6,
    skills: [
      { id: "s-39", categoryId: "cat-6", name: "React.js", description: "Component-driven architecture, custom hooks, virtual DOM, and client state", order: 1 },
      { id: "s-40", categoryId: "cat-6", name: "Next.js", description: "App Router, SSR, Server Actions, API routes, and edge runtime performance", order: 2 },
      { id: "s-41", categoryId: "cat-6", name: "Tailwind CSS", description: "Utility-first modern styling, responsive layouts, and custom design systems", order: 3 },
      { id: "s-42", categoryId: "cat-6", name: "Responsive UI", description: "Mobile-first, cross-browser fluid user experiences and touch ergonomics", order: 4 },
      { id: "s-43", categoryId: "cat-6", name: "Razorpay", description: "Payment gateway integration, subscriptions, webhooks, and geo-based pricing", order: 5 },
    ],
  },
  {
    id: "cat-7",
    name: "Databases & ORM",
    order: 7,
    skills: [
      { id: "s-44", categoryId: "cat-7", name: "PostgreSQL", description: "Relational database modeling, complex indexing, JSONB queries, and ACID guarantees", order: 1 },
      { id: "s-45", categoryId: "cat-7", name: "MySQL", description: "Enterprise relational database schema design and optimized query execution", order: 2 },
      { id: "s-46", categoryId: "cat-7", name: "SQLite", description: "Lightweight local/edge database with fast embedded query execution", order: 3 },
      { id: "s-47", categoryId: "cat-7", name: "Firebase", description: "Firestore real-time state synchronization, authentication, and Cloud Messaging", order: 4 },
      { id: "s-48", categoryId: "cat-7", name: "Prisma ORM", description: "Type-safe database client, declarative schema migrations, and relational modeling", order: 5 },
      { id: "s-49", categoryId: "cat-7", name: "Neon", description: "Serverless Postgres with branching, connection pooling, and autoscaling compute", order: 6 },
    ],
  },
  {
    id: "cat-8",
    name: "DevOps & Tools",
    order: 8,
    skills: [
      { id: "s-50", categoryId: "cat-8", name: "Docker", description: "Containerization of applications, multi-stage builds, and Docker Compose environments", order: 1 },
      { id: "s-51", categoryId: "cat-8", name: "GitHub Actions & CI/CD", description: "Automated linting, test suites, builds, and seamless deployment workflows", order: 2 },
      { id: "s-52", categoryId: "cat-8", name: "Git & GitHub", description: "Collaborative version control, pull requests, branch protection, and code reviews", order: 3 },
      { id: "s-53", categoryId: "cat-8", name: "Vercel, Render & Netlify", description: "Cloud platform hosting, edge routing, serverless functions, and automated deploys", order: 4 },
      { id: "s-54", categoryId: "cat-8", name: "Postman", description: "REST/GraphQL API testing, environment mock servers, and automated collection runs", order: 5 },
    ],
  },
  {
    id: "cat-9",
    name: "Languages (Spoken)",
    order: 9,
    skills: [
      { id: "s-55", categoryId: "cat-9", name: "English", description: "Advanced professional proficiency", order: 1 },
      { id: "s-56", categoryId: "cat-9", name: "Malayalam", description: "Advanced native / bilingual proficiency", order: 2 },
      { id: "s-57", categoryId: "cat-9", name: "Hindi", description: "Beginner proficiency", order: 3 },
      { id: "s-58", categoryId: "cat-9", name: "Tamil", description: "Speaking proficiency", order: 4 },
    ],
  },
];

export const defaultProjects: ProjectData[] = [
  {
    id: "proj-1",
    title: "ResumeAt: AI-Powered ATS Resume Builder SaaS",
    category: "Full Stack SaaS Platform",
    description:
      "A full-stack SaaS resume builder with ATS-optimized templates, PDF/DOCX export, cover letter generation, multi-tier subscription payments via Razorpay, and custom analytics.",
    features: [
      "Built a full-stack SaaS resume builder with ATS-optimized templates, PDF/DOCX export and cover letter generation.",
      "Implemented a multi-tier subscription system with the Razorpay payment gateway and geo-based pricing.",
      "Designed a credit-based download system with per-plan limits on resumes, cover letters and template access.",
      "Integrated Google OAuth and Email OTP authentication via NextAuth.js.",
      "Modeled user, resume, payment and analytics data with Prisma ORM and PostgreSQL (Neon).",
      "Deployed on Vercel with custom analytics, visitor tracking and an admin dashboard.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "Razorpay",
      "NextAuth.js",
      "Tailwind CSS",
      "Vercel",
    ],
    liveUrl: "https://resume-at.vercel.app",
    githubUrl: "",
    caseStudyUrl: "",
    coverImageUrl: "/images/projects/resumeat-preview.jpg",
    order: 1,
  },
  {
    id: "proj-2",
    title: "E-Commerce Web Application",
    category: "Full Stack Web Development",
    description:
      "A complete full-stack e-commerce store with 5 core modules: authentication, catalog, shopping cart, Razorpay payment gateway, and administrative management.",
    features: [
      "Shipped a full-stack store with 5 modules: authentication, catalog, cart, Razorpay payments and admin.",
      "Integrated the Razorpay payment gateway for online checkout.",
      "Engineered backend with Django and Python, utilizing SQLite for structured data management.",
      "Implemented secure JWT authentication and role-based access for customer and admin portals.",
    ],
    techStack: ["Django", "Python", "SQLite", "Razorpay", "JavaScript", "HTML5", "CSS3"],
    liveUrl: "",
    githubUrl: "https://github.com/shahariyasCH/e-demoproject",
    caseStudyUrl: "",
    coverImageUrl: "/images/projects/ecommerce-preview.jpg",
    order: 2,
  },
  {
    id: "proj-3",
    title: "Disaster Alert & Management System (DAMS)",
    category: "Mobile & Real-Time Cloud Integration",
    description:
      "A real-time disaster emergency mobile application in Flutter for Android & iOS backed by Firebase, paired with a Google Maps web control panel for monitoring and relief dispatch.",
    features: [
      "Created a real-time alert app in Flutter for Android and iOS, backed by Firebase.",
      "Built a Google Maps web control panel for monitoring and managing alerts.",
      "Integrated Google Maps API for incident geolocation tracking and emergency visualization.",
      "Enabled real-time push alerts and live state synchronization via Firebase Cloud Messaging.",
    ],
    techStack: ["Flutter", "Firebase", "Maps API", "Dart", "Google Maps"],
    liveUrl: "",
    githubUrl: "https://github.com/shahariyasCH/DAMS",
    caseStudyUrl: "",
    coverImageUrl: "/images/projects/dams-preview.jpg",
    order: 3,
  },
];

export const defaultEducation: EducationData[] = [
  {
    id: "edu-1",
    institution: "APJ Abdul Kalam Technological University",
    degree: "B.Tech, Computer Science",
    location: "Kerala, India",
    startDate: "Jun 2020",
    endDate: "May 2024",
    gpa: "6.7/10",
    coursework: [
      "System Software",
      "Algorithm Analysis and Design",
      "Database Management Systems",
      "Machine Learning",
      "Deep Learning",
      "Operating Systems",
    ],
    order: 1,
  },
];
