"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "";
      document.querySelectorAll("section[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 140) {
          current = section.getAttribute("id") || "";
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`site-header${scrolled ? " scrolled" : ""}`}
        id="site-header"
      >
        <div className="container header-inner">
          <nav
            className={`nav${scrolled ? " scrolled" : ""}`}
            id="navbar"
            aria-label="Main navigation"
          >
            <a href="/" className="nav-logo" onClick={closeMenu}>
              <img
                src="/images/logo-dsbd.png"
                alt={site.name}
                className="nav-logo-img"
                width={200}
                height={56}
              />
            </a>
            <ul
              className={`nav-menu${menuOpen ? " open" : ""}`}
              id="nav-menu"
            >
              {navLinks.map((link) => {
                const hash = link.href.includes("#")
                  ? link.href.split("#")[1]
                  : "";
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={active === hash ? "active" : undefined}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="nav-actions">
              <a href="/#contact" className="btn btn-primary btn-sm" onClick={closeMenu}>
                Contact Us
              </a>
              <button
                type="button"
                className={`nav-toggle${menuOpen ? " open" : ""}`}
                id="nav-toggle"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="nav-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <div
        className={`nav-overlay${menuOpen ? " visible" : ""}`}
        id="nav-overlay"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
    </>
  );
}
