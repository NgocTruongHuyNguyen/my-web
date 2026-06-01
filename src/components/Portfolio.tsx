"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollHint from "./ScrollHint";

interface Project {
  id: number;
  name: string;
  description: string;
  image?: string;
  link?: string;
  stats?: string;
  tags?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Motorhome Parking Platform",
    description:
      "A 4-month internship project enhancing an existing responsive web app that lets motorhome travellers search, book, and review parking spaces across New Zealand. Working as a full-stack developer, I gained hands-on experience applying React, TypeScript, and Ionic in a real-world production codebase.",
    tags: ["React", "TypeScript", "Ionic"],
    image: "/MotorhomeApp.png",
  },
  {
    id: 2,
    name: "Millars Beach Website Remake",
    description:
      "One of my first real-client projects, a full redesign of the Millars Beach community website built to spec from client requirements. Working full-stack, I learned how to translate real-world briefs into a clean, modern site using PHP, Tailwind, and HTML.",
    link: "https://github.com/yourusername",
    tags: ["PHP", "Tailwind", "HTML"],
    image: "/MillarsBeachRemake.png",
  },
  {
    id: 3,
    name: "Tax Calculator App",
    description:
      "A personal project born from a real-world problem. While on a trip back to Vietnam, I noticed the confusion around the country's new tax rules and decided to build a solution. I took it all the way from idea to tested product, calculating income tax under the updated rules and turning a personal frustration into something practical.",
    link: "https://github.com/NgocTruongHuyNguyen/TaxCalculatorApp",
    tags: ["React", "TypeScript", "Firebase"],
    image: "/TaxImg.png",
  },
  {
    id: 4,
    name: "Personal Website",
    description:
      "My personal portfolio site, built to serve as my online resume. A central place where I can showcase my projects, skills, and experience in a way that feels more alive than a PDF ever could.",
    link: "https://github.com/yourusername",
    tags: ["Next.js", "TypeScript", "CSS"],
    image: "/PersonalWeb.png",
  },
];

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    className="shrink-0 opacity-50 group-hover/link:opacity-100 transition-opacity">
    <path d="M1 12L12 1M12 1H4M12 1V9"
      stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group"
    >
      {/* Mobile: stacked. Desktop: side by side */}
      <div className="flex flex-col sm:flex-row sm:gap-8 sm:items-start">

        {/* INFO — full width on mobile, flex-1 on desktop */}
        <div className="flex flex-col gap-2 flex-1 min-w-0 mb-5 sm:mb-0">
          <a
            href={project.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 no-underline group/link w-fit"
            style={{ color: "var(--text)" }}
          >
            <span
              className="text-[1.1rem] sm:text-[1.25rem] font-medium tracking-wide transition-opacity duration-200 group-hover/link:opacity-70"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {project.name}
            </span>
            {project.link && <ArrowIcon />}
          </a>

          <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>

          {project.stats && (
            <p className="text-[0.82rem]" style={{ color: "var(--muted)" }}>
              {project.stats}
            </p>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.72rem] px-3 py-1 rounded-full"
                  style={{ background: "var(--green)", color: "#fff" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* THUMBNAIL — hidden on mobile, fixed width on desktop */}
        {project.image && (
          <a
            href={project.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block shrink-0 w-full sm:w-[220px] overflow-hidden rounded-sm transition-opacity duration-300 hover:opacity-80"
            tabIndex={-1}
          >
            <Image
              src={project.image}
              alt={project.name}
              width={440}
              height={440}
              className="w-full h-auto block"
              loading="eager"
            />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20 pb-20"
    >
      <div className="w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-[clamp(1.7rem,2.8vw,2.3rem)] font-medium tracking-wide text-center mb-14"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Portfolio
        </motion.h2>

        <div className="flex flex-col gap-14 w-full">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <ScrollHint href="#contact" label="Scroll to contact me" />
    </section>
  );
}
