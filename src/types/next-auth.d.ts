import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend built-in types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;  // ✅ we add this
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        _id: string;  // ✅ from MongoDB
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}
