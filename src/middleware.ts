import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude api, _next, _vercel, admin, and files with extensions from next-intl locale prefixing
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
