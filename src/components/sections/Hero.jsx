import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid-layout">
        <div className="hero-content">
          <p className="hero-badge reveal">{site.tagline}</p>
          <h1 className="hero-title reveal" id="hero-title">
            Simple &amp; Powerful Software
            <br />
            <em className="hero-accent">to Grow Your Business</em>
          </h1>
          <p className="hero-lead reveal">{site.description}</p>
          <div className="hero-cta reveal">
            <a href="#solutions" className="btn btn-primary btn-lg">
              Explore Solutions
              <i className="fas fa-arrow-right btn-icon" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-outline btn-lg">
              <i className="fas fa-check btn-icon" aria-hidden="true" />
              Book a Demo
            </a>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="hero-photo-wrap">
            <img
              src="/images/hero-team.webp"
              alt="Data Solution BD software team collaborating around iMac SaaS dashboard"
              className="hero-photo"
              width={800}
              height={600}
              fetchPriority="high"
            />
            <div className="hero-float-stat">
              <div className="hero-float-num">1000+</div>
              <div className="hero-float-copy">
                <strong>Happy Clients</strong>
                <span>Growing Businesses Trust Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
