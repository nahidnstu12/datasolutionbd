import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section
      className="section section--muted"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Our Process</span>
          <h2 className="section-title" id="process-title">
            How we deliver
            <br />
            <span className="text-gradient">your solution</span>
          </h2>
          <p className="section-desc">
            A structured approach ensuring every project meets the highest
            quality standards.
          </p>
        </header>
        <ol className="process-track stagger">
          {processSteps.map((step) => (
            <li className="process-step reveal" key={step.num}>
              <div className="process-marker">
                <span className="process-marker-num">{step.num}</span>
                <span className="process-marker-icon">
                  <i className={`fas ${step.icon}`} aria-hidden="true" />
                </span>
              </div>
              <div className="process-step-body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
