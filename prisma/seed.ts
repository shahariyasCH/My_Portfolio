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
      name: "Shahariyas",
    },
    create: {
      email: adminEmail.toLowerCase().trim(),
      hashedPassword,
      name: "Shahariyas",
    },
  });
  console.log(`✅ Admin account seeded: ${adminEmail}`);

  // 2. Profile Singleton
  await prisma.profile.upsert({
    where: { id: "default" },
    update: {
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
        "Production-grade portfolio of Shahariyas: Python Full Stack Developer, Automation Engineer, and Backend specialist specializing in Django, React, RPA, and Cloud integrations.",
    },
    create: {
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
        "Production-grade portfolio of Shahariyas: Python Full Stack Developer, Automation Engineer, and Backend specialist specializing in Django, React, RPA, and Cloud integrations.",
    },
  });
  console.log("✅ Profile seeded");

  // 3. Experiences
  await prisma.experience.deleteMany();

  const experiences = [
    {
      company: "Intellijhon",
      title: "Lead Automation Developer",
      location: "Kochi, Kerala",
      startDate: "Sep 2025",
      endDate: null,
      isCurrent: true,
      order: 1,
      responsibilities: JSON.stringify([
        "Engineered end-to-end bot flows for high-volume business processes, including exception handling, dynamic queue management, and error recovery.",
        "Developed custom automation scripts in Python/JavaScript for API integration, web scraping, and data transformation to extend RPA platform capabilities.",
        "Designed and implemented API-driven workflows, connecting RPA bots with REST/GraphQL services and legacy systems to enable seamless data exchange.",
      ]),
      techTags: JSON.stringify([
        "Python",
        "JavaScript",
        "UiPath",
        "Automation Anywhere",
        "n8n",
        "REST APIs",
        "GraphQL",
        "Web Scraping",
        "Process Automation",
      ]),
    },
    {
      company: "Luminar Techno Lab",
      title: "Python Full Stack Developer",
      location: "Kochi, Kerala",
      startDate: "Sep 2024",
      endDate: null,
      isCurrent: true,
      order: 2,
      responsibilities: JSON.stringify([
        "Built secure, scalable, and modular back-end architectures using Python and Django.",
        "Designed and developed RESTful API endpoints to ensure efficient data exchange and integration with front-end systems.",
        "Implemented database models and logic using MySQL and SQLite, focusing on data integrity, query optimization, and smooth migrations.",
        "Implemented JWT-based authentication and role-based access control to ensure secure and flexible user management.",
        "Developed responsive and interactive front-end interfaces using React, enhancing cross-device user experience.",
      ]),
      techTags: JSON.stringify([
        "Python",
        "Django",
        "Django REST Framework",
        "React.js",
        "MySQL",
        "SQLite",
        "JWT Auth",
        "RESTful APIs",
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
      name: "Core Languages",
      order: 1,
      skills: [
        { name: "Python", description: "Primary language for backend APIs, microservices, data pipelines, automation scripts & ML models" },
        { name: "JavaScript", description: "Modern ES6+, async programming, dynamic frontend logic, and Node.js runtime scripts" },
        { name: "SQL", description: "Complex relational queries, indexing, schema design, and query optimization" },
        { name: "PHP", description: "Backend development with Laravel framework and legacy system integrations" },
        { name: "Dart", description: "Cross-platform mobile application development with Flutter" },
        { name: "HTML / CSS", description: "Semantic markup, modern styling, accessible layouts, and responsive structures" },
      ],
    },
    {
      name: "Frontend Development",
      order: 2,
      skills: [
        { name: "React.js", description: "Component-driven architecture, state management, custom hooks, and virtual DOM optimization" },
        { name: "Next.js", description: "Server-side rendering (SSR), ISR, static site generation, API routes, App router" },
        { name: "Responsive UI", description: "Cross-device fluid layouts, touch-friendly interfaces, and accessibility standards" },
        { name: "Tailwind CSS", description: "Utility-first modern design systems, custom themes, and clean layout patterns" },
        { name: "REST API Integration", description: "Fetch/Axios workflows, JWT token handling, state caching, and optimistic UI" },
      ],
    },
    {
      name: "Backend Development",
      order: 3,
      skills: [
        { name: "Django & DRF", description: "High-performance REST APIs, ORM modeling, serializer architecture, and JWT auth" },
        { name: "Node.js", description: "Asynchronous I/O services, event loops, lightweight microservices, and bot runtimes" },
        { name: "Laravel", description: "MVC architecture, Eloquent ORM, middleware pipelines, and service providers" },
        { name: "RESTful API Design", description: "Clean endpoints, proper HTTP status codes, pagination, rate limiting, and OpenAPI specs" },
        { name: "Authentication & Authorization", description: "JWT, OAuth2, session management, and Role-Based Access Control (RBAC)" },
      ],
    },
    {
      name: "Mobile Development",
      order: 4,
      skills: [
        { name: "Flutter (Android & iOS)", description: "Single codebase native-performance apps, state management, and native plugin integrations" },
        { name: "React Native", description: "Cross-platform mobile apps, native bridge interaction, and responsive mobile UI" },
      ],
    },
    {
      name: "Databases",
      order: 5,
      skills: [
        { name: "PostgreSQL", description: "ACID compliance, relational schema design, JSONB support, and indexing" },
        { name: "MySQL", description: "Enterprise relational database management, query tuning, and replication" },
        { name: "SQLite", description: "Lightweight local/edge storage, rapid prototyping, and local caching" },
        { name: "Neon DB", description: "Serverless Postgres with branching, connection pooling, and autoscaling compute" },
      ],
    },
    {
      name: "Cloud & DevOps",
      order: 6,
      skills: [
        { name: "Render & Vercel", description: "Serverless deployments, automated CI/CD pipelines, and preview environments" },
        { name: "Netlify", description: "Edge functions, frontend deployment, custom domains, and automated webhooks" },
        { name: "AWS S3 & Cloudinary", description: "Scalable object storage, media optimization, and secure signed URLs" },
        { name: "Docker (Basics)", description: "Containerization of apps, Dockerfiles, and multi-container compose environments" },
        { name: "CI/CD (GitHub Actions)", description: "Automated test runs, lint checks, build verifications, and deployment workflows" },
      ],
    },
    {
      name: "Automation & RPA",
      order: 7,
      skills: [
        { name: "UiPath", description: "Enterprise robotic process automation, robotic workflows, and desktop & web bots" },
        { name: "Automation Anywhere", description: "Enterprise cognitive RPA, automated bot deployment, and queue management" },
        { name: "n8n", description: "Self-hosted node-based workflow automation, webhook triggers, and API integrations" },
        { name: "Workflow Automation", description: "Multi-system event dispatching, retry logic, and exception handling" },
        { name: "API Orchestration", description: "Connecting heterogeneous third-party APIs and microservices seamlessly" },
      ],
    },
    {
      name: "AI & Machine Learning",
      order: 8,
      skills: [
        { name: "AI Chatbot Development", description: "Conversational agent architectures, context management, and prompt engineering" },
        { name: "NLP Basics", description: "Text classification, tokenization, sentiment analysis, and entity extraction" },
        { name: "Model Integration", description: "Connecting LLM APIs (OpenAI, Gemini, HuggingFace) into backend pipelines" },
        { name: "AI-Powered Automation", description: "Intelligent document processing, automated categorization, and smart workflows" },
      ],
    },
    {
      name: "Tools & Engineering Practices",
      order: 9,
      skills: [
        { name: "Git & GitHub", description: "Branching strategies, PR reviews, merge conflict resolution, and collaborative workflow" },
        { name: "Postman", description: "API testing, automated test collections, environment mock servers, and API documentation" },
        { name: "VS Code & PyCharm", description: "IDE productivity, linters, debuggers, profiling tools, and extensions" },
        { name: "Debugging & Optimization", description: "Database indexing, query profiling, memory leak detection, and network tuning" },
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
      title: "E-Commerce Web Application",
      category: "Full Stack Web Development",
      description:
        "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and secure admin panel.",
      features: JSON.stringify([
        "Developed a full-featured e-commerce platform with user authentication, product catalog, shopping cart, and secure admin panel.",
        "Designed clean and responsive UI integrated with Django's templating engine and backend logic.",
        "Implemented secure payment workflow and role-based access using Django's built-in auth system.",
        "Optimized database interactions using Django ORM and handled migrations efficiently.",
      ]),
      techStack: JSON.stringify(["Python", "Django", "SQLite", "Razorpay", "HTML", "CSS", "JavaScript"]),
      liveUrl: "",
      githubUrl: "",
      caseStudyUrl: "",
      coverImageUrl: "/images/projects/ecommerce-preview.jpg",
      order: 1,
    },
    {
      title: "Disaster Alert & Management System (DAMS)",
      category: "Mobile & Cloud Integration",
      description:
        "A real-time mobile application and command center for users to send emergency alerts during disasters and for authorities to coordinate relief.",
      features: JSON.stringify([
        "Developed a real-time mobile application using Flutter for users to send emergency alerts during disasters.",
        "Built a web-based control panel for disaster management authorities to monitor and respond to incoming alerts.",
        "Integrated Google Maps API for geolocation tracking and visual representation of reported emergencies.",
        "Implemented real-time alerts and state sync with Firebase Cloud Messaging and Firestore.",
      ]),
      techStack: JSON.stringify(["Flutter", "Firebase", "Google Maps API", "Dart", "Cloud Functions"]),
      liveUrl: "",
      githubUrl: "",
      caseStudyUrl: "",
      coverImageUrl: "/images/projects/dams-preview.jpg",
      order: 2,
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
      institution: "APJ Abdul Kalam Technological University, Trivandrum",
      degree: "B.Tech in Computer Science and Engineering",
      location: "Trivandrum, Kerala",
      startDate: "June 2020",
      endDate: "May 2024",
      gpa: "6.7/10",
      coursework: JSON.stringify([
        "System Software",
        "Algorithm Analysis and Design",
        "Database Management System",
        "Machine Learning",
        "Deep Learning",
      ]),
      order: 1,
    },
    {
      institution: "MSM HSS, Kallingparamba",
      degree: "Higher Secondary Education",
      location: "Kallingparamba, Kerala",
      startDate: "June 2018",
      endDate: "May 2020",
      gpa: null,
      coursework: JSON.stringify(["Physics", "Chemistry", "Mathematics", "Computer Science"]),
      order: 2,
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
