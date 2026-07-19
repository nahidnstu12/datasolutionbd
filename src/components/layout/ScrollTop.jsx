"use client";

import { useEffect, useRef, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 20;

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.min(y / docH, 1) : 0;
      setVisible(y > 400);
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(
          CIRCUMFERENCE * (1 - progress)
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top${visible ? " is-visible" : ""}`}
      id="scroll-top"
      aria-label="Scroll to top"
      onClick={handleClick}
    >
      <svg className="scroll-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="scroll-top-ring-bg" cx="24" cy="24" r="20" />
        <circle
          className="scroll-top-ring-progress"
          id="scroll-top-progress"
          ref={progressRef}
          cx="24"
          cy="24"
          r="20"
        />
      </svg>
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
