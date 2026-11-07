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
  name: "Shahariyas",
  title: "Python Full Stack Developer | Automation Developer | AI & Backend Engineer",
  headline: "Building scalable web applications, intelligent automations, and reliable backend systems.",
  statement:
    "Professional Python Full Stack Developer with advanced backend expertise in Django REST Framework and frontend proficiency in React JS. Specializes in designing scalable and secure REST APIs, managing database migrations, and implementing robust JWT authentication systems. Adept at developing efficient CRUD operations and delivering innovative technical solutions. Also experienced in React Native, Flutter, and PHP Laravel, with a strong focus on cross-platform mobile development and high-performance web applications.",
  email: "shahariyaschatheri10@gmail.com",
  phone: "+91 9061451636",
  location: "Tirur, Kerala, India",
  availabilityStatus: "Open to opportunities",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  seoTitle: "Shahariyas | Python Full Stack Developer & Automation Engineer",
  seoDescription:
    "Production-grade portfolio of Shahariyas: Python Full Stack Developer, Automation Engineer, and Backend specialist.",
};

export const defaultExperiences: ExperienceData[] = [
  {
    id: "exp-1",
    company: "Intellijhon",
    title: "Lead Automation Developer",
    location: "Kochi, Kerala",
    startDate: "Sep 2025",
    endDate: null,
    isCurrent: true,
    order: 1,
    responsibilities: [
      "Engineered end-to-end bot flows for high-volume business processes, including exception handling, dynamic queue management, and error recovery.",
      "Developed custom automation scripts in Python/JavaScript for API integration, web scraping, and data transformation to extend RPA platform capabilities.",
      "Designed and implemented API-driven workflows, connecting RPA bots with REST/GraphQL services and legacy systems to enable seamless data exchange.",
    ],
    techTags: [
      "Python",
      "JavaScript",
      "UiPath",
      "Automation Anywhere",
      "n8n",
      "REST APIs",
      "GraphQL",
      "Web Scraping",
      "Process Automation",
    ],
  },
  {
    id: "exp-2",
    company: "Luminar Techno Lab",
    title: "Python Full Stack Developer",
    location: "Kochi, Kerala",
    startDate: "Sep 2024",
    endDate: null,
    isCurrent: true,
    order: 2,
    responsibilities: [
      "Built secure, scalable, and modular back-end architectures using Python and Django.",
      "Designed and developed RESTful API endpoints to ensure efficient data exchange and integration with front-end systems.",
      "Implemented database models and logic using MySQL and SQLite, focusing on data integrity, query optimization, and smooth migrations.",
      "Implemented JWT-based authentication and role-based access control to ensure secure and flexible user management.",
      "Developed responsive and interactive front-end interfaces using React, enhancing cross-device user experience.",
    ],
    techTags: [
      "Python",
      "Django",
      "Django REST Framework",
      "React.js",
      "MySQL",
      "SQLite",
      "JWT Auth",
      "RESTful APIs",
    ],
  },
];

export const defaultSkillCategories: SkillCategoryData[] = [
  {
    id: "cat-1",
    name: "Core Languages",
    order: 1,
    skills: [
      { id: "s-1", categoryId: "cat-1", name: "Python", description: "Primary language for backend APIs, microservices, data pipelines, automation scripts & ML models", order: 1 },
      { id: "s-2", categoryId: "cat-1", name: "JavaScript", description: "Modern ES6+, async programming, dynamic frontend logic, and Node.js runtime scripts", order: 2 },
      { id: "s-3", categoryId: "cat-1", name: "SQL", description: "Complex relational queries, indexing, schema design, and query optimization", order: 3 },
      { id: "s-4", categoryId: "cat-1", name: "PHP", description: "Backend development with Laravel framework and legacy system integrations", order: 4 },
      { id: "s-5", categoryId: "cat-1", name: "Dart", description: "Cross-platform mobile application development with Flutter", order: 5 },
      { id: "s-6", categoryId: "cat-1", name: "HTML / CSS", description: "Semantic markup, modern styling, accessible layouts, and responsive structures", order: 6 },
    ],
  },
  {
    id: "cat-2",
    name: "Backend & APIs",
    order: 2,
    skills: [
      { id: "s-7", categoryId: "cat-2", name: "Django & DRF", description: "High-performance REST APIs, ORM modeling, serializer architecture, and JWT auth", order: 1 },
      { id: "s-8", categoryId: "cat-2", name: "Node.js", description: "Asynchronous I/O services, event loops, lightweight microservices, and bot runtimes", order: 2 },
      { id: "s-9", categoryId: "cat-2", name: "Laravel", description: "MVC architecture, Eloquent ORM, middleware pipelines, and service providers", order: 3 },
      { id: "s-10", categoryId: "cat-2", name: "RESTful API Design", description: "Clean endpoints, proper HTTP status codes, pagination, rate limiting, and OpenAPI specs", order: 4 },
      { id: "s-11", categoryId: "cat-2", name: "Authentication & RBAC", description: "JWT, OAuth2, session management, and Role-Based Access Control", order: 5 },
    ],
  },
  {
    id: "cat-3",
    name: "Frontend & Mobile",
    order: 3,
    skills: [
      { id: "s-12", categoryId: "cat-3", name: "React.js", description: "Component-driven architecture, state management, custom hooks, and virtual DOM optimization", order: 1 },
      { id: "s-13", categoryId: "cat-3", name: "Next.js", description: "Server-side rendering (SSR), ISR, static site generation, API routes, App router", order: 2 },
      { id: "s-14", categoryId: "cat-3", name: "Flutter (Android & iOS)", description: "Single codebase native-performance apps, state management, and native plugin integrations", order: 3 },
      { id: "s-15", categoryId: "cat-3", name: "React Native", description: "Cross-platform mobile apps, native bridge interaction, and responsive mobile UI", order: 4 },
      { id: "s-16", categoryId: "cat-3", name: "Tailwind CSS", description: "Utility-first modern design systems, custom themes, and clean layout patterns", order: 5 },
    ],
  },
  {
    id: "cat-4",
    name: "Automation & RPA",
    order: 4,
    skills: [
      { id: "s-17", categoryId: "cat-4", name: "UiPath", description: "Enterprise robotic process automation, robotic workflows, and desktop & web bots", order: 1 },
      { id: "s-18", categoryId: "cat-4", name: "Automation Anywhere", description: "Enterprise cognitive RPA, automated bot deployment, and queue management", order: 2 },
      { id: "s-19", categoryId: "cat-4", name: "n8n", description: "Self-hosted node-based workflow automation, webhook triggers, and API integrations", order: 3 },
      { id: "s-20", categoryId: "cat-4", name: "Workflow Orchestration", description: "Multi-system event dispatching, retry logic, exception handling, and scraping", order: 4 },
    ],
  },
  {
    id: "cat-5",
    name: "AI & Machine Learning",
    order: 5,
    skills: [
      { id: "s-21", categoryId: "cat-5", name: "AI Chatbot Development", description: "Conversational agent architectures, context management, and prompt engineering", order: 1 },
      { id: "s-22", categoryId: "cat-5", name: "NLP Basics", description: "Text classification, tokenization, sentiment analysis, and entity extraction", order: 2 },
      { id: "s-23", categoryId: "cat-5", name: "Model Integration", description: "Connecting LLM APIs (OpenAI, Gemini, HuggingFace) into backend pipelines", order: 3 },
      { id: "s-24", categoryId: "cat-5", name: "AI-Powered Automation", description: "Intelligent document processing, automated categorization, and smart workflows", order: 4 },
    ],
  },
  {
    id: "cat-6",
    name: "Databases & Cloud DevOps",
    order: 6,
    skills: [
      { id: "s-25", categoryId: "cat-6", name: "PostgreSQL / MySQL", description: "Relational schema design, ACID transactions, complex queries, and indexing", order: 1 },
      { id: "s-26", categoryId: "cat-6", name: "SQLite & Neon DB", description: "Serverless Postgres with branching and lightweight edge databases", order: 2 },
      { id: "s-27", categoryId: "cat-6", name: "Render, Vercel & Netlify", description: "Automated Git CI/CD deployments, serverless functions, and preview builds", order: 3 },
      { id: "s-28", categoryId: "cat-6", name: "AWS S3 & Cloudinary", description: "Scalable object storage, media optimization, and secure asset delivery", order: 4 },
      { id: "s-29", categoryId: "cat-6", name: "Git, GitHub & Docker", description: "Version control workflows, PR reviews, CI/CD actions, and containerization", order: 5 },
    ],
  },
];

export const defaultProjects: ProjectData[] = [
  {
    id: "proj-1",
    title: "E-Commerce Web Application",
    category: "Full Stack Web Development",
    description:
      "A full-featured e-commerce platform with user authentication, dynamic product catalog, shopping cart, and secure admin management panel.",
    features: [
      "Developed a full-featured e-commerce platform with user authentication, product catalog, shopping cart, and secure admin panel.",
      "Designed clean and responsive UI integrated with Django's templating engine and backend logic.",
      "Implemented secure payment workflow and role-based access using Django's built-in auth system.",
      "Optimized database interactions using Django ORM and handled migrations efficiently.",
    ],
    techStack: ["Python", "Django", "SQLite", "Razorpay", "HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    coverImageUrl: "",
    order: 1,
  },
  {
    id: "proj-2",
    title: "Disaster Alert & Management System (DAMS)",
    category: "Mobile & Cloud Integration",
    description:
      "A real-time mobile application and command center for users to send emergency alerts during disasters and for authorities to coordinate relief.",
    features: [
      "Developed a real-time mobile application using Flutter for users to send emergency alerts during disasters.",
      "Built a web-based control panel for disaster management authorities to monitor and respond to incoming alerts.",
      "Integrated Google Maps API for geolocation tracking and visual representation of reported emergencies.",
      "Implemented real-time alerts and state sync with Firebase Cloud Messaging and Firestore.",
    ],
    techStack: ["Flutter", "Firebase", "Google Maps API", "Dart", "Cloud Functions"],
    liveUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    coverImageUrl: "",
    order: 2,
  },
];

export const defaultEducation: EducationData[] = [
  {
    id: "edu-1",
    institution: "APJ Abdul Kalam Technological University, Trivandrum",
    degree: "B.Tech in Computer Science and Engineering",
    location: "Trivandrum, Kerala",
    startDate: "June 2020",
    endDate: "May 2024",
    gpa: "6.7/10",
    coursework: [
      "System Software",
      "Algorithm Analysis and Design",
      "Database Management System",
      "Machine Learning",
      "Deep Learning",
    ],
    order: 1,
  },
  {
    id: "edu-2",
    institution: "MSM HSS, Kallingparamba",
    degree: "Higher Secondary Education",
    location: "Kallingparamba, Kerala",
    startDate: "June 2018",
    endDate: "May 2020",
    gpa: null,
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    order: 2,
  },
];
