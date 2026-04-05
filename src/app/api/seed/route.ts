import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";

// Seed sample jobs
export async function POST() {
  await dbConnect();

  const jobs = [
    {
      title: "Java Developer",
      description:
        "We are looking for an experienced Java Developer to design, develop, and maintain high-performance backend applications. You will work with Spring Boot, microservices architecture, and cloud technologies to build scalable solutions.",
      location: ["Karachi"],
      team: "Java Developer",
      vacancies: 5,
      workingHours: "8 hours",
      requirements: [
        "Strong Java and Spring Boot skills",
        "Microservices architecture experience",
        "REST API design and development",
        "1+ years experience",
      ],
    },
    {
      title: "MERN Stack Developer",
      description:
        "Looking for a skilled MERN Stack Developer to build and maintain web applications. You will work with MongoDB, Express.js, React.js, and Node.js to develop full-stack solutions.",
      location: ["Karachi"],
      team: "Mern Stack Developer",
      vacancies: 5,
      workingHours: "8 hours",
      requirements: [
        "MongoDB, Express, React, Node.js",
        "REST API design",
        "Git version control",
        "1+ years experience",
      ],
    },
    {
      title: "Senior Java Developer",
      description:
        "Join our engineering team as a Senior Java Developer. You will lead the design and implementation of complex backend systems, mentor junior developers, and drive best practices across the team.",
      location: ["Karachi"],
      team: "Java Developer",
      vacancies: 2,
      workingHours: "8 hours",
      requirements: [
        "3+ years Java experience",
        "Spring Boot and Hibernate",
        "System design and architecture",
        "Team leadership skills",
      ],
    },
    {
      title: "Sales Executive",
      description:
        "We are hiring a Sales Executive to drive revenue growth by identifying and closing new business opportunities. You will build client relationships, manage sales pipelines, and meet monthly targets.",
      location: ["Karachi"],
      team: "Sales",
      vacancies: 10,
      workingHours: "9 hours",
      requirements: [
        "Excellent communication skills",
        "Sales or business development experience",
        "Target-driven mindset",
        "CRM tools knowledge preferred",
      ],
    },
    {
      title: "Full Stack Developer (MERN)",
      description:
        "We are seeking a Full Stack Developer proficient in the MERN stack to build end-to-end web applications. You will collaborate with designers and backend teams to deliver seamless user experiences.",
      location: ["Karachi"],
      team: "Mern Stack Developer",
      vacancies: 3,
      workingHours: "8 hours",
      requirements: [
        "React.js and Next.js proficiency",
        "Node.js and Express backend",
        "MongoDB database design",
        "Responsive UI development",
      ],
    },
    {
      title: "Sales Manager",
      description:
        "Lead our sales team as a Sales Manager. You will set sales strategies, manage a team of sales executives, analyze performance metrics, and drive the company towards its revenue goals.",
      location: ["Karachi"],
      team: "Sales",
      vacancies: 2,
      workingHours: "9 hours",
      requirements: [
        "2+ years sales management experience",
        "Team leadership and coaching",
        "Strategic planning skills",
        "Strong negotiation abilities",
      ],
    },
  ];

  await Job.deleteMany({});
  const created = await Job.insertMany(jobs);

  return NextResponse.json({
    message: `Seeded ${created.length} jobs`,
    jobs: created,
  });
}
