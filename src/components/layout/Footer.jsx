import Link from "next/link";
import { site } from "@/data/site";
import { solutions } from "@/data/solutions";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-logo footer-logo">
            <img
              src="/images/white_logo.png"
              alt={site.name}
              className="nav-logo-img nav-logo-img--footer"
              width={200}
              height={56}
            />
          </Link>
          <p>
            Leading software company in Bangladesh — delivering POS, ERP, and
            custom digital solutions since {site.founded}.
          </p>
          <div className="social-row">
            <a
              href={site.social.facebook}
              className="social-link"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href={site.social.whatsapp}
              className="social-link"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </a>
            <a
              href={site.social.linkedin}
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href={site.social.youtube}
              className="social-link"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
        <nav className="footer-col" aria-label="Footer services">
          <h4>Services</h4>
          <ul>
            {solutions.map((s) => (
              <li key={s.id}>
                <Link href={`/solutions/${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Footer company">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/#about">About Us</Link>
            </li>
            <li>
              <Link href="/#process">Our Process</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-location-dot" aria-hidden="true" />{" "}
              {site.location}
            </li>
            <li>
              <i className="fas fa-phone" aria-hidden="true" />
              {site.phone.join(" / ")}
            </li>
            <li>
              <i className="fas fa-envelope" aria-hidden="true" /> {site.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <Link href="/#contact">Support</Link>
        </div>
      </div>
    </footer>
  );
}
