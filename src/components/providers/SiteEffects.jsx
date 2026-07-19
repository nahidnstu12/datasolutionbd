"use client";

import { useEffect } from "react";

export default function SiteEffects() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("visible");
      }
    });

    const buttons = document.querySelectorAll(".btn, .btn-pricing, .link-arrow");
    const onDown = (e) => e.currentTarget.classList.add("is-pressed");
    const onUp = (e) => e.currentTarget.classList.remove("is-pressed");
    buttons.forEach((btn) => {
      btn.addEventListener("mousedown", onDown);
      btn.addEventListener("mouseup", onUp);
      btn.addEventListener("mouseleave", onUp);
    });

    return () => {
      revealObserver.disconnect();
      buttons.forEach((btn) => {
        btn.removeEventListener("mousedown", onDown);
        btn.removeEventListener("mouseup", onUp);
        btn.removeEventListener("mouseleave", onUp);
      });
    };
  }, []);

  return null;
}
