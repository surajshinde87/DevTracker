import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      try {
        await connectToDB();

        if (account?.provider === "google" && profile?.email) {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            // Save the user to MongoDB
            await User.create({
              fullName: profile.name || "Google User",
              email: profile.email,
              password: "", // Not required for Google
              role: "user",
              skills: [],
              authProvider: "google",
            });
          }
        }

        return true;
      } catch (error) {
        console.error("[Google Signin Error]", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
    // Redirect to onboarding if the user just signed in
    return `${baseUrl}/auth/onboarding`;
  },

    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
