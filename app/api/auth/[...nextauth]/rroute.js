// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add more providers as needed
  ],
  // Additional configuration
});

export { handler as GET, handler as POST };
