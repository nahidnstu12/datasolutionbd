import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="section section--white">
      <div className="container" style={{ textAlign: "center", paddingBlock: "4rem" }}>
        <h1>Page not found</h1>
        <p style={{ marginBlock: "1rem 1.5rem" }}>
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </main>
  );
}
