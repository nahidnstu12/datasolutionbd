"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/site";

function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const suffix =
    target === 99
      ? "%"
      : target >= 500 || target === 30 || target === 15
        ? "+"
        : "";

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    const val = Math.floor(eased * target);
    el.textContent = t >= 1 ? target + suffix : val + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export default function Stats() {
  const refs = useRef([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target, 10);
            if (!Number.isNaN(target)) animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" id="stats" aria-labelledby="stats-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label section-label--light">
            Our Achievements
          </span>
          <h2 className="section-title section-title--light" id="stats-title">
            Numbers that reflect
            <br />
            <span className="text-gradient-light">our commitment</span>
          </h2>
        </header>
        <div className="stats-grid stagger">
          {stats.map((stat, i) => (
            <div className="stat-box reveal" key={stat.label}>
              <strong
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-target={stat.target}
              >
                0
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
