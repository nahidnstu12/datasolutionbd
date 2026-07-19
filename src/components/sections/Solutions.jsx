import Link from "next/link";
import { solutions } from "@/data/solutions";

export default function Solutions() {
  return (
    <section
      className="section section--white"
      id="solutions"
      aria-labelledby="solutions-title"
    >
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Software Solutions</span>
          <h2 className="section-title" id="solutions-title">
            Platforms designed for
            <br />
            <span className="text-gradient">smarter operations</span>
          </h2>
          <p className="section-desc">
            Ready-to-deploy, secure, and scalable software that connects every
            part of your business.
          </p>
        </header>

        <div className="solutions-stack">
          {solutions.map((solution) => (
            <article
              key={solution.id}
              className={`solution-featured${
                solution.reverse ? " solution-featured--reverse" : ""
              } reveal`}
              id={solution.id}
            >
              <div className="solution-featured-content">
                <span className="solution-tag">{solution.tag}</span>
                <h3>
                  <Link href={`/solutions/${solution.id}`}>{solution.title}</Link>
                </h3>
                <p>{solution.description}</p>
                <ul className="solution-checks">
                  {solution.checks.map((check) => (
                    <li key={check}>
                      <i className="fas fa-check" aria-hidden="true" /> {check}
                    </li>
                  ))}
                </ul>
                <div className="solution-actions">
                  <a
                    href={solution.href}
                    className="btn btn-primary btn-lg"
                    {...(solution.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    Get Free Demo
                  </a>
                  <Link
                    href={`/solutions/${solution.id}`}
                    className="btn btn-outline btn-lg"
                  >
                    View Details
                    <i className="fas fa-arrow-right btn-icon" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="solution-featured-visual">
                <Link href={`/solutions/${solution.id}`}>
                  <img
                    src={solution.image}
                    alt={solution.alt}
                    className="solution-img"
                    loading="lazy"
                    width={560}
                    height={420}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
