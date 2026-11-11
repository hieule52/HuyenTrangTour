import { MetadataRoute } from 'next';

const BASE_URL = 'https://huyentrangtour.com';
const LOCALES = ['vi', 'en', 'fr', 'zh', 'ko', 'ja'];
const ROUTES = ['', '/about', '/services', '/pricing', '/gallery', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    ROUTES.forEach((route) => {
      const url = locale === 'vi' ? `${BASE_URL}${route}` : `${BASE_URL}/${locale}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}

