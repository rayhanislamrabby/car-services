import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCollection = dbConnect(collectionNameObj.userCollection);

        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (user) return user;
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        const { providerAccountId, provider } = account;

        const { email: user_email, image, name } = user;

        const userCollection = dbConnect(collectionNameObj.userCollection);

        const isExisted = await userCollection.findOne({ providerAccountId });

        if (!isExisted) {
          const payload = {
            providerAccountId,
            provider,
            email: user_email,
            image,
            name,
          };

          await userCollection.insertOne(payload);
        }
      }

      return true;
    },
  },
};
