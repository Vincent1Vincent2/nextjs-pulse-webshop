"use client";
import { logoutUser } from "@/app/actions/user";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();

    window.location.reload();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
