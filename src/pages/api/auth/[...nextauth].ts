import { loginGoogle } from '@/services/login.api';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      id: `google`,
      name: `google`,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || ``,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || ``,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async signIn({ account }) {
      const result = await loginGoogle({
        token: (account.id_token as string) || ``,
      });
      const { isNewUser } = result.data.data;
      if (isNewUser) return `/register`;
      return `/`;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith(`/`)) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
        token[`id_token`] = account?.id_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session[`access_token`] = token.access_token;
      session[`id_token`] = token?.id_token;
      return session;
    },
  },
});
