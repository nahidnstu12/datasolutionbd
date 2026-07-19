import { posts } from "@/data/blog";

export default function Blog() {
  return (
    <section
      className="section section--muted"
      id="blog"
      aria-labelledby="blog-title"
    >
      <div className="container">
        <header className="section-header section-header--row reveal">
          <div>
            <span className="section-label">Latest Blog</span>
            <h2 className="section-title" id="blog-title">
              Insights &amp; <span className="text-gradient">resources</span>
            </h2>
            <p className="section-desc">
              Tips and strategies for business growth and digital
              transformation.
            </p>
          </div>
          <a href="#" className="btn btn-outline btn-sm section-header-cta">
            View All Posts
          </a>
        </header>
        <div className="blog-grid stagger">
          {posts.map((post) => (
            <article className="blog-card reveal" key={post.title}>
              <a href={post.href} className="blog-thumb">
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  width={640}
                  height={360}
                />
              </a>
              <div className="blog-body">
                <span className="blog-meta">{post.meta}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href={post.href} className="blog-link">
                  Read more <i className="fas fa-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
