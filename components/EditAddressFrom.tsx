import {AddressCreate, AddressCreateSchema} from "@/app/zodSchemas/address";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

interface PageProps {
  address: AddressCreate;
  onSubmit: (data: AddressCreate) => void;
  onCancel: () => void;
}

const EditAddressForm = ({address, onSubmit, onCancel}: PageProps) => {
  const form = useForm<AddressCreate>({
    resolver: zodResolver(AddressCreateSchema),
    defaultValues: address,
  });
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = form;

  return (
    <form
      className="flex flex-col justify-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col ">
        <label>Street Address</label>
        <input
          className="bg-slate-100 px-3 py-1 rounded-xl"
          {...register("streetAdress")}
        />
        {errors.streetAdress && (
          <span className="text-red-700">{errors.streetAdress.message}</span>
        )}
      </div>
      <div className="flex flex-col ">
        <label>Zip Code</label>
        <input
          className="bg-slate-100 px-3 py-1 rounded-xl"
          {...register("zipCode", {valueAsNumber: true})}
        />
        {errors.zipCode && (
          <span className="text-red-700">{errors.zipCode.message}</span>
        )}
      </div>
      <div className="flex flex-col ">
        <label>City</label>
        <input
          className=" bg-slate-100 px-3 py-1 rounded-xl"
          {...register("city")}
        />
        {errors.city && (
          <span className="text-red-700"> {errors.city.message}</span>
        )}
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditAddressForm;
