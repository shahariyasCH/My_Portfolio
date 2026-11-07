import React from "react";
import prisma from "@/lib/prisma";
import {
  defaultProfile,
  defaultExperiences,
  defaultSkillCategories,
  defaultProjects,
  defaultEducation,
} from "@/lib/initial-data";
import { parseJsonArray } from "@/lib/utils";

import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import About from "@/components/public/About";
import Experience from "@/components/public/Experience";
import SkillsBento from "@/components/public/SkillsBento";
import Projects from "@/components/public/Projects";
import Education from "@/components/public/Education";
import RecruiterCTA from "@/components/public/RecruiterCTA";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";
import ShahariyasAssistant from "@/components/public/ShahariyasAssistant";

// ISR Revalidation time
export const revalidate = 60; // 60 seconds or on-demand via revalidatePath

async function getPortfolioData() {
  try {
    const profileDb = await prisma.profile.findUnique({
      where: { id: "default" },
    });

    const experiencesDb = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    const skillCategoriesDb = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
    });

    const projectsDb = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    const educationDb = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });

    const profile = profileDb || defaultProfile;

    const experiences =
      experiencesDb.length > 0
        ? experiencesDb.map((exp) => ({
            id: exp.id,
            company: exp.company,
            title: exp.title,
            location: exp.location,
            startDate: exp.startDate,
            endDate: exp.endDate,
            isCurrent: exp.isCurrent,
            responsibilities: parseJsonArray(exp.responsibilities),
            techTags: parseJsonArray(exp.techTags),
            order: exp.order,
          }))
        : defaultExperiences;

    const skillCategories =
      skillCategoriesDb.length > 0
        ? skillCategoriesDb.map((cat) => ({
            id: cat.id,
            name: cat.name,
            order: cat.order,
            skills: cat.skills.map((s) => ({
              id: s.id,
              categoryId: s.categoryId,
              name: s.name,
              description: s.description,
              order: s.order,
            })),
          }))
        : defaultSkillCategories;

    const projects =
      projectsDb.length > 0
        ? projectsDb.map((proj) => ({
            id: proj.id,
            title: proj.title,
            category: proj.category,
            description: proj.description,
            features: parseJsonArray(proj.features),
            techStack: parseJsonArray(proj.techStack),
            liveUrl: proj.liveUrl,
            githubUrl: proj.githubUrl,
            caseStudyUrl: proj.caseStudyUrl,
            coverImageUrl: proj.coverImageUrl,
            order: proj.order,
          }))
        : defaultProjects;

    const education =
      educationDb.length > 0
        ? educationDb.map((edu) => ({
            id: edu.id,
            institution: edu.institution,
            degree: edu.degree,
            location: edu.location,
            startDate: edu.startDate,
            endDate: edu.endDate,
            gpa: edu.gpa,
            coursework: parseJsonArray(edu.coursework),
            order: edu.order,
          }))
        : defaultEducation;

    return {
      profile,
      experiences,
      skillCategories,
      projects,
      education,
    };
  } catch (error) {
    console.error("Database connection fallback to static data:", error);
    return {
      profile: defaultProfile,
      experiences: defaultExperiences,
      skillCategories: defaultSkillCategories,
      projects: defaultProjects,
      education: defaultEducation,
    };
  }
}

export default async function HomePage() {
  const { profile, experiences, skillCategories, projects, education } =
    await getPortfolioData();

  const allSkillNames = skillCategories.flatMap((c) => c.skills.map((s) => s.name));

  return (
    <main className="flex-1 ai-aurora-bg min-h-screen relative">
      {/* 1. Modern Glass Navigation */}
      <Navbar
        name={profile.name}
        availabilityStatus={profile.availabilityStatus}
        resumeUrl={profile.resumeUrl}
      />

      {/* 2. Hero Presentation with Voice Prompt Triggers */}
      <Hero
        name={profile.name}
        title={profile.title}
        headline={profile.headline}
        statement={profile.statement}
        availabilityStatus={profile.availabilityStatus}
        resumeUrl={profile.resumeUrl}
        skillsList={allSkillNames}
        email={profile.email}
        location={profile.location}
      />

      {/* 3. About Me Story & Engineering Philosophy */}
      <About
        name={profile.name}
        title={profile.title}
        headline={profile.headline}
        statement={profile.statement}
        location={profile.location}
      />

      {/* 4. Career Work Experience Timeline */}
      <Experience experiences={experiences} />

      {/* 5. Selected Production Projects */}
      <Projects projects={projects} />

      {/* 6. Technical Stack Bento Matrix */}
      <SkillsBento categories={skillCategories} />

      {/* 7. Academic Background */}
      <Education education={education} />

      {/* 8. Call to Collaborate & Hire */}
      <RecruiterCTA
        availabilityStatus={profile.availabilityStatus}
        resumeUrl={profile.resumeUrl}
        email={profile.email}
      />

      {/* 9. Contact Direct Channels */}
      <Contact
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
      />

      {/* 10. Modern Light Footer */}
      <Footer
        name={profile.name}
        title={profile.title}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
        resumeUrl={profile.resumeUrl}
      />

      {/* 11. Interactive Voice & Chat Assistant: Shahariyas Assistant */}
      <ShahariyasAssistant
        name={profile.name}
        title={profile.title}
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
        resumeUrl={profile.resumeUrl}
      />
    </main>
  );
}
