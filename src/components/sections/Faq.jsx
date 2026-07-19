import { faqs } from "@/data/faq";

export default function Faq() {
  return (
    <section className="section section--white" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">FAQ</span>
          <h2 className="section-title" id="faq-title">
            Frequently asked
            <br />
            <span className="text-gradient">questions</span>
          </h2>
          <p className="section-desc">
            Quick answers to common questions about our software and services.
          </p>
        </header>
        <div className="faq-list reveal">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary className="faq-question">
                <span>{faq.question}</span>
                <i className="fas fa-plus faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
