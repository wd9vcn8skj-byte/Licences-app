import type { MetadataRoute } from 'next'

const base = 'https://www.licences-app.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/calculateur`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/mentions-legales`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/cgv`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/confidentialite`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}