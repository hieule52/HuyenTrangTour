import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

if (process.env.NODE_ENV === 'production' && (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.includes('localhost'))) {
  process.env.NEXTAUTH_URL = 'https://www.huyentrangtour.com';
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

