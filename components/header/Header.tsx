"use client";
import { authenticateUser } from "@/app/actions/authenticate";
import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";

export interface AuthUser {
  name: string | null;
  isAdmin: boolean | null;
}

export default function Header() {
  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    async function fetchAuth() {
      const user = await authenticateUser();
      setUser(user);
    }
    fetchAuth();
  }, []);

  if (!user) {
    return <GuestHeader />;
  }

  if (user && !user.isAdmin) {
    return <UserHeader />;
  }

  if (user && user.isAdmin) {
    return <AdminHeader />;
  }
}
