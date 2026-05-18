"use client";

interface ScrollHintProps {
  href: string;
  label: string;
}

export default function ScrollHint({ href, label }: ScrollHintProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 no-underline"
      style={{ color: "var(--muted)" }}
    >
      <span className="text-[0.78rem] font-light whitespace-nowrap">{label}</span>
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        className="animate-bounce"
      >
        <path
          d="M7 1V17M7 17L1 11M7 17L13 11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
