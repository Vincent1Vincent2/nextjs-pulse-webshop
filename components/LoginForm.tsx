"use client";
import { loginUser } from "@/app/actions/user";
import { UserLogin, UserLoginSchema } from "@/app/zodSchemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const form = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserLogin) => {
    await loginUser(data);
    form.reset();
  };

  return (
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
