import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section
      className="section section--white"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title" id="testimonials-title">
            What our clients
            <br />
            <span className="text-gradient">say about us</span>
          </h2>
          <p className="section-desc">
            Real feedback from business owners who transformed their operations
            with Data Solution BD.
          </p>
        </header>
        <div className="testimonial-grid stagger">
          {testimonials.map((item) => (
            <blockquote className="testimonial-card reveal" key={item.name}>
              <div className="testimonial-stars" aria-label="5 stars">
                ★★★★★
              </div>
              <p>&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <div className="avatar" aria-hidden="true">
                  {item.initial}
                </div>
                <div>
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
