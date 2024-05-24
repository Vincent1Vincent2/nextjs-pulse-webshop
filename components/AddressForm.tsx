import {addressCreate} from "@/app/actions/adress";
import {AddressCreate, AddressCreateSchema} from "@/app/zodSchemas/address";
import {zodResolver} from "@hookform/resolvers/zod";
import {Address} from "@prisma/client";
import {useState} from "react";
import {useForm} from "react-hook-form";

interface AddressFormProps {
  onAddressCreated: (addressId: number) => void;
}
export interface AddressCreateResponse {
  address: Address;
  reload: boolean;
}

export default function AddressForm({onAddressCreated}: AddressFormProps) {
  const form = useForm<AddressCreate>({
    resolver: zodResolver(AddressCreateSchema),
  });
  const [address, setAddress] = useState<AddressCreateResponse | null>(null);

  const {
    formState: {errors},
  } = form;

  const handleSubmit = async (data: AddressCreate) => {
    const address = await addressCreate(data);
    if (address.reload) {
      window.location.reload();
    }
    setAddress(address);
    onAddressCreated(address.address.id);
    form.reset();
  };

  return (
    <form
      className="flex flex-col justify-center gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <input
        className="bg-slate-100 px-3 py-1 rounded-xl"
        {...form.register("streetAdress")}
        type="text"
        placeholder="Street Address"
      />
      {errors.streetAdress && (
        <span className="text-red-700">{errors.streetAdress.message}</span>
      )}
      <input
        className="bg-slate-100 px-3 py-1 rounded-xl"
        {...form.register("zipCode", {valueAsNumber: true})}
        type="number"
        placeholder="Zip-Code"
      />
      {errors.zipCode && (
        <span className="text-red-700">{errors.zipCode.message}</span>
      )}
      <input
        className=" bg-slate-100 px-3 py-1 rounded-xl"
        {...form.register("city")}
        type="text"
        placeholder="City"
      />
      {errors.city && (
        <span className="text-red-700">{errors.city.message}</span>
      )}
      <button className=" rounded-xl my-5 bg-neutral-200 hover:bg-neutral-100">
        Use Address
      </button>
    </form>
  );
}
