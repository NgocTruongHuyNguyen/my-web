"use client";
import FadeIn from "./FadeIn";
import ScrollHint from "./ScrollHint";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-40"
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
            Recently graduated from Ara Institute of Canterbury with a Bachelor of
            Information and Communication Technology, specialising in Software
            Development — graduating with{" "}
            <span style={{ color: "var(--text)" }}>Distinction</span>.
          </p>
          <p className="text-[0.82rem] leading-loose mt-3" style={{ color: "var(--muted)" }}>
            I work across the full stack with experience in C#, Python, JavaScript,
            Java, PHP, HTML, CSS, and databases including MySQL and MongoDB. Outside
            of study I build personal projects to sharpen my skills and tackle
            real-world problems I&apos;ve noticed in everyday life.
          </p>
          <p className="text-[0.82rem] leading-loose mt-3" style={{ color: "var(--muted)" }}>
            I have a strong interest in data, analysis, and finding the root cause of
            problems. I&apos;m also passionate about finance, economics, and investment —
            and love applying my technical skills in those spaces.
          </p>
          <p className="text-[0.82rem] leading-loose mt-3" style={{ color: "var(--muted)" }}>
            When I&apos;m not coding, you&apos;ll find me playing sports, going for walks,
            or capturing the scenery and people around me through photography.
          </p>
        </FadeIn>

        {/* Right */}
        <FadeIn delay={0.2} className="flex flex-col gap-10">
          <div>
            <h3
              className="text-[1.25rem] font-medium mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              2 Years Experience
            </h3>
            <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
              As a full-stack developer through academic projects and personal
              builds, plus 5 months of hands-on experience working in a
              professional development team as an intern.
            </p>
          </div>
          <div>
            <h3
              className="text-[1.25rem] font-medium mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Full-Stack Skills
            </h3>
            <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
              Comfortable across frontend and backend, multiple languages and
              frameworks, databases, APIs, and shipping complete products from
              idea to deployment.
            </p>
          </div>
          <div>
            <h3
              className="text-[1.25rem] font-medium mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Problem Solver
            </h3>
            <p className="text-[0.82rem] leading-loose" style={{ color: "var(--muted)" }}>
              I enjoy digging into problems, understanding the root cause, and
              building practical solutions.
            </p>
          </div>
        </FadeIn>
      </div>

      <ScrollHint href="#portfolio" label="Scroll to see my works" />
    </section>
  );
}
