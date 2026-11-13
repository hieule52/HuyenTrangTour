import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './prisma';

export const getAdminEmails = (): string[] => {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'huyentrangtour-super-secret-key-2026',
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const adminEmails = getAdminEmails();
        const isAdmin = adminEmails.includes(user.email.toLowerCase());

        // Upsert user into database upon Google login
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
            googleId: account?.providerAccountId,
            // If email is in ADMIN_EMAILS list, promote to ADMIN
            ...(isAdmin ? { role: 'ADMIN' } : {}),
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: account?.providerAccountId,
            role: isAdmin ? 'ADMIN' : 'CUSTOMER',
          },
        });
        return true;
      } catch (error) {
        console.error('Error saving user on signIn:', error);
        // Allow sign-in even if DB is temporarily unreachable in dev
        return true;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true, role: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
          } else {
            const adminEmails = getAdminEmails();
            token.role = adminEmails.includes(user.email.toLowerCase()) ? 'ADMIN' : 'CUSTOMER';
          }
        } catch {
          const adminEmails = getAdminEmails();
          token.role = adminEmails.includes(user.email.toLowerCase()) ? 'ADMIN' : 'CUSTOMER';
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || (token.sub as string);
        session.user.role = (token.role as 'CUSTOMER' | 'ADMIN') || 'CUSTOMER';
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
};

/**
 * Server helper to get current session user
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

/**
 * Server guard: throws error or returns null if not an ADMIN
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required.');
  }
  return user;
}

