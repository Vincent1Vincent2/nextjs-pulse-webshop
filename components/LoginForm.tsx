"use client";
import { authenticateUser } from "@/app/actions/authenticate";
import { loginUser } from "@/app/actions/user";
import { UserLogin, UserLoginSchema } from "@/app/zodSchemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LogoutButton from "./LogoutButton";

export default function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const form = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserLogin) => {
    await loginUser(data);
    form.reset();
    location.reload();
  };

  useEffect(() => {
    //kollar user auth status
    const checkAuthentication = async () => {
      try {
        const authUser = await authenticateUser();
        setIsLoggedIn(!!authUser);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthentication();
  }, []);

  // Renderear login och logout beroende på user auth status
  return isLoggedIn ? (
    <LogoutButton />
  ) : (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input {...form.register("email")} type="text" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...form.register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button>Login</button>
    </form>
  );
}
