import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/app', '/login', '/api/'] },
    sitemap: 'https://www.licences-app.fr/sitemap.xml',
    host: 'https://www.licences-app.fr',
  }
}