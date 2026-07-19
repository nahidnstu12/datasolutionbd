import { site } from "@/data/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <span className="section-label section-label--light">Contact Us</span>
            <h2
              className="section-title section-title--light"
              id="contact-title"
            >
              Let&apos;s build something
              <br />
              <span className="text-gradient-light">great together</span>
            </h2>
            <p className="contact-desc">
              Ready to transform your business? Reach out for a free demo,
              consultation, or custom project quote.
            </p>
            <ul className="contact-list">
              <li>
                <i className="fas fa-location-dot" aria-hidden="true" />
                <div>
                  <strong>Office</strong>
                  <span>{site.location}</span>
                </div>
              </li>
              <li>
                <i className="fas fa-phone" aria-hidden="true" />
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${site.phoneTel}`}>
                    {site.phone.join(" / ")}
                  </a>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope" aria-hidden="true" />
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
              <li>
                <i className="fab fa-whatsapp" aria-hidden="true" />
                <div>
                  <strong>WhatsApp</strong>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
