import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/libs/mongodb";

export const authOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const db = await connectDB();
      const userRecord = await db.connection.db.collection('users').findOne({ email: session.user.email });

      session.user.id = userRecord._id;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const db = await connectDB();
      const existingUser = await db.connection.db.collection('users').findOne({ email: user.email });

      if (!existingUser) {
        await db.connection.db.collection('users').insertOne({ email: user.email, name: user.name, image: user.image });
      }

      return true;
    },
  },
});

export default NextAuth(authOptions)
