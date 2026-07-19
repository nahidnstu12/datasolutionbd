import { whyPoints } from "@/data/site";

export default function WhyUs() {
  return (
    <section className="section section--muted" id="why-us" aria-labelledby="why-title">
      <div className="container why-grid">
        <div className="why-content reveal">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title" id="why-title">
            Built on results,
            <br />
            <span className="text-gradient">trusted nationwide</span>
          </h2>
          <p className="section-desc">
            For over 15 years, Data Solution BD has been the technology partner
            Bangladeshi businesses rely on — delivering stable software, local
            support, and solutions that actually work in real operations.
          </p>
          <ul className="why-list">
            {whyPoints.map((point) => (
              <li key={point.title}>
                <div className="why-list-icon">
                  <i className="fas fa-check" aria-hidden="true" />
                </div>
                <div>
                  <strong>{point.title}</strong>
                  <span>{point.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary btn-lg">
            Start Your Free Trial
          </a>
        </div>
        <div className="why-visual reveal">
          <figure className="why-photo-wrap">
            <img
              src="/images/why-choose-us.webp"
              alt="Data Solution BD team collaborating on SaaS software in a modern office"
              className="why-photo"
              width={720}
              height={540}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
