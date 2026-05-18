"use client";
import FadeIn from "./FadeIn";
import ScrollHint from "./ScrollHint";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-16"
    >
      <FadeIn>
        <h2
          className="text-[clamp(1.7rem,2.8vw,2.3rem)] font-medium tracking-wide text-center mb-14"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          About Me
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-3xl w-full items-start">
        {/* Left */}
        <FadeIn delay={0.1}>
          <h3
            className="text-[1.25rem] font-medium mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            I&apos;m a Software Developer
          </h3>
          <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
            Full-stack developer based in Wanaka, New Zealand. I enjoy working
            across the entire stack — crafting intuitive interfaces and building
            robust backend systems. I thrive in collaborative environments and
            love solving problems with clean, elegant solutions.
          </p>
        </FadeIn>

        {/* Right */}
        <FadeIn delay={0.2} className="flex flex-col gap-10">
          <div>
            <h3
              className="text-[1.25rem] font-medium mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              10 Projects
            </h3>
            <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
              Delivered across web applications, APIs, and mobile experiences —
              each contributing real value to users and continuously pushing my
              skills further.
            </p>
          </div>
          <div>
            <h3
              className="text-[1.25rem] font-medium mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              3 Years of Experience
            </h3>
            <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
              Building production-grade applications with modern stacks including
              Next.js, TypeScript, Node.js, and PostgreSQL. Always learning and
              adapting to new technologies.
            </p>
          </div>
        </FadeIn>
      </div>

      <ScrollHint href="#portfolio" label="Scroll to see my works" />
    </section>
  );
}
