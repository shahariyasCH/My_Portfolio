# Shahariyas — Premium Developer Portfolio & Admin CMS

A **production-grade, recruiter-facing personal career platform** for **Shahariyas**, built with Next.js 14 App Router, Tailwind CSS, Framer Motion, Prisma ORM, and NextAuth.js, deployable to Vercel with an interactive Admin CMS for live content updates without touching code.

---

## ⚡ Key Features

- **Recruiter-Focused Visuals**: Dark-first aesthetic (`#08080c` to `#0e0e18`) with cyan/teal neon accents, strict typography scale (Inter + JetBrains Mono), glassmorphism navbar, and subtle grid textures.
- **Interactive Terminal Hero**: Animated bash terminal cycling through real-time commands (`whoami`, `skills --list`, `status --check`), featuring full interactive user input support.
- **Bento-Grid Skills**: Categorized skills with interactive hover tooltips highlighting production context without fake percentage bars.
- **Dynamic Authenticity**: Live availability status badge ("Open to opportunities", etc.) and project buttons (Live Demo / GitHub / Case Study) rendered strictly when valid URLs exist.
- **Full Admin CMS (`/admin`)**:
  - Secure single-admin authentication via NextAuth Credentials.
  - Full CRUD & reordering for **Experiences**, **Skills & Categories**, **Projects**, **Education**, and **Contact Info**.
  - Resume PDF replacement tool with instant live propagation across all download triggers.
  - Inquiries inbox for messages submitted through the public contact form.
  - On-demand ISR cache revalidation (`revalidatePath`) on save.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server & Client Components, TypeScript) |
| **Styling** | Tailwind CSS + custom glassmorphic utilities |
| **Icons & Animation** | Lucide React, Framer Motion, CSS Keyframes |
| **Database & ORM** | Prisma ORM with SQLite (Local) & PostgreSQL / Neon (Vercel Production) |
| **Authentication** | NextAuth.js (Credentials Provider with Bcrypt password hashing) |
| **Forms & Validation** | React Hook Form + Zod |
| **Email Delivery** | Resend API (`/api/contact`) with database logging fallback |
| **File Storage** | Vercel Blob with local static fallback |

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Environment Variables Configuration
Copy `.env.example` to `.env`:
```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="shahariyaschatheri10@gmail.com"
ADMIN_PASSWORD="Shahariyas@Admin2026!"
```

### 3. Initialize & Seed Database
```bash
# Push schema to SQLite database
npx prisma db push

# Seed authentic resume data and admin account
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit:
- **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Email**: `shahariyaschatheri10@gmail.com`
  - **Password**: `Shahariyas@Admin2026!`

---

## 🌐 Deploying to Vercel

1. Push your repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:
   - `DATABASE_URL`: Your PostgreSQL / Neon database connection string (e.g., `postgres://user:password@ep-xyz.neon.tech/neondb?sslmode=require`)
   - `NEXTAUTH_SECRET`: A generated 32-char secret (e.g., generated with `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://shahariyas.vercel.app`)
   - `ADMIN_EMAIL`: `shahariyaschatheri10@gmail.com`
   - `ADMIN_PASSWORD`: Your chosen strong admin password
   - `RESEND_API_KEY`: *(Optional)* API key from [Resend](https://resend.com) for forwarding contact form inquiries
   - `BLOB_READ_WRITE_TOKEN`: *(Optional)* Vercel Blob token for cloud uploads
4. Click **Deploy**.
5. Once deployed, run the seed command in the Vercel console or locally with your production `DATABASE_URL` via `npx prisma db push && npm run db:seed`.

---

## 📁 Repository Structure

```
├── app/
│   ├── (public)/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── education/page.tsx
│   │   ├── recruiter/page.tsx
│   │   ├── resume/page.tsx
│   │   └── messages/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── admin/
│   │   │   ├── profile/route.ts
│   │   │   ├── experience/route.ts
│   │   │   ├── skills/route.ts
│   │   │   ├── projects/route.ts
│   │   │   ├── education/route.ts
│   │   │   └── upload/route.ts
│   │   └── contact/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── admin/
│   │   ├── AdminHeader.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── SessionProvider.tsx
│   └── public/
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Education.tsx
│       ├── Experience.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── Navbar.tsx
│       ├── Projects.tsx
│       ├── RecruiterCTA.tsx
│       ├── SkillsBento.tsx
│       ├── TerminalVisual.tsx
│       ├── WhatILikeBuilding.tsx
│       └── Workflow.tsx
├── lib/
│   ├── auth.ts
│   ├── blob.ts
│   ├── initial-data.ts
│   ├── prisma.ts
│   ├── resend.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── resume.pdf
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 📄 License & Authenticity

All biographical details, experience history, and educational qualifications are authentic and sourced from Shahariyas's verified CV.
