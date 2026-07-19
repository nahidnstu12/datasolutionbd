import { trustItems } from "@/data/site";

export default function TrustStrip() {
  const items = [...trustItems, ...trustItems];

  return (
    <section className="logos-section" aria-label="Trusted product categories">
      <div className="container">
        <p className="logos-label reveal">
          Trusted by growing businesses across Bangladesh
        </p>
        <div className="logos-marquee" aria-hidden="true">
          <div className="logos-track">
            {items.map((item, i) => (
              <span key={`${item.label}-${i}`}>
                <i className={`fas ${item.icon}`} /> {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
