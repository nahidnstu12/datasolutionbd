import { aboutHighlights } from "@/data/site";

export default function About() {
  return (
    <section className="section section--white" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="about-media">
              <img
                src="/images/about-team.webp"
                alt="Data Solution BD software team collaborating in office"
                className="about-img"
                width={640}
                height={800}
                loading="lazy"
              />
              <div className="about-badge">
                <strong>8+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
          </div>
          <div className="about-content reveal">
            <span className="section-label">About Data Solution BD</span>
            <h2 className="about-title" id="about-title">
              Innovation Meets
              <br />
              <span className="text-gradient">Scalable Technology</span>
            </h2>
            <p className="about-lead">
              We are a trusted <strong>technology partner</strong> for businesses
              across Bangladesh — building <strong>scalable SaaS platforms</strong>{" "}
              and custom software that simplify operations, improve efficiency, and
              accelerate <strong>digital transformation</strong>.
            </p>
            <div className="about-highlights">
              {aboutHighlights.map((item) => (
                <article className="about-card" key={item.title}>
                  <div className="about-card-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true" />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                </article>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary btn-lg">
              Learn More About Us{" "}
              <i className="fas fa-arrow-right btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
