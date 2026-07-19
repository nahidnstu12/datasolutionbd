import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSolutionById,
  getSolutionIds,
  solutions,
} from "@/data/solutions";
import { site } from "@/data/site";

export function generateStaticParams() {
  return getSolutionIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = getSolutionById(slug);
  if (!solution) {
    return { title: "Solution not found" };
  }

  const title = solution.seo?.title || solution.title;
  const description = solution.seo?.description || solution.description;
  const url = `${site.url}/solutions/${solution.id}`;

  return {
    title,
    description,
    keywords: solution.seo?.keywords || site.seo.keywords,
    alternates: { canonical: `/solutions/${solution.id}` },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${site.name}`,
      description,
      images: [
        {
          url: solution.image,
          width: 1200,
          height: 630,
          alt: solution.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [solution.image],
    },
  };
}

function SolutionJsonLd({ solution }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: solution.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: solution.seo?.description || solution.description,
    image: `${site.url}${solution.image}`,
    url: `${site.url}/solutions/${solution.id}`,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BDT",
      url: solution.external ? solution.href : `${site.url}/#contact`,
    },
    featureList: solution.featureGroups?.flatMap((g) => g.items) || solution.checks,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${site.url}/#solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.title,
        item: `${site.url}/solutions/${solution.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const solution = getSolutionById(slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.id !== solution.id).slice(0, 3);

  return (
    <main id="main-content">
      <SolutionJsonLd solution={solution} />
      <article className="solution-page">
        <header className="solution-page-hero">
          <div className="container">
            <nav className="solution-breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/#solutions">Solutions</Link>
                </li>
                <li aria-current="page">{solution.title}</li>
              </ol>
            </nav>
            <div className="solution-page-hero-grid">
              <div>
                <span className="solution-tag">{solution.tag}</span>
                <h1>{solution.title}</h1>
                <p className="solution-page-lead">
                  {solution.overview || solution.description}
                </p>
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
                  <Link href="/#contact" className="btn btn-outline btn-lg">
                    Talk to Sales
                  </Link>
                </div>
              </div>
              <div className="solution-page-hero-media">
                <img
                  src={solution.image}
                  alt={solution.alt}
                  width={640}
                  height={480}
                  className="solution-img"
                />
              </div>
            </div>
          </div>
        </header>

        <section
          className="section section--white"
          aria-labelledby="features-heading"
        >
          <div className="container">
            <header className="section-header">
              <span className="section-label">Features</span>
              <h2 className="section-title" id="features-heading">
                Everything included in{" "}
                <span className="text-gradient">{solution.title}</span>
              </h2>
              <p className="section-desc">
                Full capability list — designed for real operations in Bangladesh.
              </p>
            </header>

            <div className="solution-feature-groups">
              {solution.featureGroups?.map((group) => (
                <section
                  key={group.title}
                  className="solution-feature-card"
                  aria-labelledby={`fg-${group.title}`}
                >
                  <h3 id={`fg-${group.title}`}>{group.title}</h3>
                  <ul className="solution-feature-list">
                    {group.items.map((item) => (
                      <li key={item}>
                        <i className="fas fa-check" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--muted" aria-labelledby="related-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">More Solutions</span>
              <h2 className="section-title" id="related-heading">
                Explore other <span className="text-gradient">platforms</span>
              </h2>
            </header>
            <div className="solution-related-grid">
              {others.map((item) => (
                <Link
                  key={item.id}
                  href={`/solutions/${item.id}`}
                  className="solution-related-card"
                >
                  <img src={item.image} alt="" width={320} height={200} loading="lazy" />
                  <div>
                    <span className="solution-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.checks.slice(0, 2).join(" · ")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="solution-page-cta">
          <div className="container">
            <h2>Ready to get started with {solution.title}?</h2>
            <p>
              Book a free demo or talk to our Dhaka team — we&apos;ll map the
              right plan for your business.
            </p>
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
              <Link href="/#contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
