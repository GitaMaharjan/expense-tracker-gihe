// Import function that connects to MongoDB database
import { connectDB } from "@/lib/mongodb";

// Import the User model (represents the "users" collection in MongoDB)
import User from "@/models/User";

// Import the type definition for NextAuth configuration
import type { NextAuthOptions } from "next-auth";

// Import the built-in credentials provider from NextAuth
// (used for email + password login instead of Google, GitHub, etc.)
import credentials from "next-auth/providers/credentials";

// Import bcryptjs to securely compare hashed passwords
import bcrypt from "bcryptjs";


// Export NextAuth configuration object
// This object tells NextAuth how to handle authentication in your app
export const authOptions: NextAuthOptions = {
  // List of authentication providers we want to use
  providers: [
    // Using the "Credentials" provider (email + password login)
    credentials({
      // Display name for this login option (shown on login form)
      name: "Credentials",

      // ID of this provider (must be unique)
      id: "credentials",

      // Define the fields that users will fill in on the login form
      credentials: {
        email: { label: "Email", type: "text" },       // input field for email
        password: { label: "Password", type: "password" }, // input field for password
      },

      // The function that actually checks if the user is valid
      async authorize(credentials) {
        // 1. Connect to MongoDB
        await connectDB();

        // 2. Try to find the user by email
        const user = await User.findOne({
          email: credentials?.email,   // "credentials" contains user input
        }).select("+password");        // explicitly include password field

        // 3. If user does not exist, throw error
        if (!user) throw new Error("Wrong Email");

        // 4. Compare entered password with stored (hashed) password
        const passwordMatch = await bcrypt.compare(
          credentials!.password,  // password user typed in
          user.password           // hashed password in DB
        );

        // 5. If password is wrong, throw error
        if (!passwordMatch) throw new Error("Wrong Password");

        // 6. If everything is good, return the user object
        // Returning the user tells NextAuth: "this user is authenticated"
        return user;

      },
    }),
  ],

  // Define how sessions are managed
  session: {
    strategy: "jwt", // store session info in a signed JWT instead of database
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Make sure to stringify ObjectId
        token.id = user._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }


};
