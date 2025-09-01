import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client';

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-client-secret',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo-client-secret',
    }),
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  // Allow automatic account linking when email addresses match
  allowDangerousEmailAccountLinking: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // For OAuth providers, if there's an account linking error, 
      // we can allow linking if the email matches an existing user
      if (account?.provider && user?.email) {
        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
    // Add linking callback to handle account linking
    async linkAccount({ user, account, profile }) {
      return true;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
