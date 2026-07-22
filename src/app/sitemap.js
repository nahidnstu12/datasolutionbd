import { site } from "@/data/site";
import { getSolutionIds } from "@/data/solutions";

export default function sitemap() {
  const lastModified = new Date();

  const home = {
    url: site.url,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };

  const solutionPages = getSolutionIds().map((id) => ({
    url: `${site.url}/solutions/${id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [home, ...solutionPages];
}
