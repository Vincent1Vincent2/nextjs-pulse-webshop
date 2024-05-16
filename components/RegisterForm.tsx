"use client";
import { registerUser } from "@/app/actions/user";
import { UserCreate, UserCreateSchema } from "@/app/zodSchemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const form = useForm<UserCreate>({
    resolver: zodResolver(UserCreateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserCreate) => {
    await registerUser(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input {...form.register("email")} type="text" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...form.register("password")}
        type="text"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input
        {...form.register("firstName")}
        type="text"
        placeholder="First Name"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <input
        {...form.register("lastName")}
        type="text"
        placeholder="Last Name"
      />
      {errors.lastName && <span>{errors.lastName.message}</span>}
      <input
        {...form.register("phoneNumber")}
        type="text"
        placeholder="Phone Number"
      />
      {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      <button>Register</button>
    </form>
  );
}
