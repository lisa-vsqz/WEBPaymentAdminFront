// hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for the session to load

    // Redirect to sign-in page if not authenticated
    if (!session) {
      router.push("http://localhost:3001/auth/signin");
    } 
    // Redirect to home page if authenticated but not an admin
    else if (session.user.role !== "admin" && router.pathname === "/userscrud") {
      router.push("/");
    }
  }, [session, status, router]);
}
