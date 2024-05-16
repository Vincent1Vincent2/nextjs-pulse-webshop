"use client";
import { orderCreate } from "@/app/actions/order";
import { useCart } from "@/app/contexts/CartContext";
import { OrderCreate, OrderCreateSchema } from "@/app/zodSchemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function OrderForm() {
  const { cart } = useCart();
  const form = useForm<OrderCreate>({
    resolver: zodResolver(OrderCreateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: OrderCreate) => {
    await orderCreate(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input
        {...form.register("customerAddress")}
        type="text"
        placeholder="customerAddress"
      />
      {errors.customerAddress && <span>{errors.customerAddress.message}</span>}

      <button>Register</button>
    </form>
  );
}
