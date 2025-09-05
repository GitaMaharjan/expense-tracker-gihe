import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // redirect to Welcome if not logged in
    },
});

export const config = {
    matcher: ["/dashboard/:path*"], // apply only to /dashboard
};
