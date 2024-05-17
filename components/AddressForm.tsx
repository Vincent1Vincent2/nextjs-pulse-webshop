"use client";
import { addressCreate } from "@/app/actions/adress";
import { AddressCreate, AddressCreateSchema } from "@/app/zodSchemas/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface AddressFormProps {
  onAddressCreated: (addressId: number) => void;
}

export default function AddressForm({ onAddressCreated }: AddressFormProps) {
  const form = useForm<AddressCreate>({
    resolver: zodResolver(AddressCreateSchema),
  });
  const [address, setAddress] = useState<Address | null>(null);

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: AddressCreate) => {
    const address = await addressCreate(data);
    setAddress(address);
    onAddressCreated(address.id);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input
        {...form.register("streetAdress")}
        type="text"
        placeholder="Street Address"
      />
      {errors.streetAdress && <span>{errors.streetAdress.message}</span>}
      <input
        {...form.register("zipCode", { valueAsNumber: true })}
        type="number"
        placeholder="Zip-Code"
      />
      {errors.zipCode && <span>{errors.zipCode.message}</span>}
      <input {...form.register("city")} type="text" placeholder="City" />
      <button>Use Address</button>
    </form>
  );
}
