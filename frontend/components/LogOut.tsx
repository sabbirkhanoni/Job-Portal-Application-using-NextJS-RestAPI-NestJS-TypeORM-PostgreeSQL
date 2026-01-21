"use client";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here of httpOnly cookies
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline btn-error text-sm">
      <LuLogOut className="mr-2" />
      Logout
    </button>
  );
}
