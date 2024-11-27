import { signOut } from "next-auth/react";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_FRONT_URL;

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: `${ADMIN_URL}/auth/signin` })}
      className="mb-4 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
