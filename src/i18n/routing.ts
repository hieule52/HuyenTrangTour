import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en', 'fr', 'zh', 'ko', 'ja'],
  defaultLocale: 'vi',
  localePrefix: 'always',
});
