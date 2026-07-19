import { features } from "@/data/features";

export default function Features() {
  return (
    <section
      className="section section--white"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Features &amp; Benefits</span>
          <h2 className="section-title" id="features-title">
            Everything your business
            <br />
            <span className="text-gradient">needs to thrive</span>
          </h2>
          <p className="section-desc">
            Powerful capabilities engineered for real-world business operations
            in Bangladesh.
          </p>
        </header>
        <div className="features-grid stagger">
          {features.map((feature) => (
            <article className="feature-card reveal" key={feature.title}>
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`} aria-hidden="true" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
