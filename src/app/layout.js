import { Inter, Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollTop from "@/components/layout/ScrollTop";
import SiteEffects from "@/components/providers/SiteEffects";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import "./site.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-next",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <ScrollTop />
        <SiteEffects />
      </body>
    </html>
  );
}
