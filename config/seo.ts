export const baseUrl = process.env.NODE_ENV === "production" ? "https://benapatton.com" : "";
export const baseEmail = "bass41992ben@gmail.com";

export const defaultSEO = {
  title: "Ben Patton",
  description: "Software Engineer, writer, and idea guy.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    site_name: "Ben A Patton",
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: "Ben A Patton",
      },
    ],
  },
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/static/${options.image}` }]
    : defaultSEO.openGraph.images;

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options.url}`,
    },
  };
}
