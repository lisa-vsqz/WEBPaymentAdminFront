// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token && token.role === "admin", // Only allow if token exists and user is an admin
  },
  pages: {
    signIn: "/auth/signin", // Redirect to the sign-in page if not authorized
  },
});

// Define routes that require authentication and role verification
export const config = { matcher: ["/userscrud/:path*"] };
