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
      className="flex flex-col justify-center gap-4 bg-gray-100 p-5 w-full rounded-sm shadow-md "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Your Address</h2>
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Street Address</label>
        <input
          className="bg-white border border-gray-300 px-4 py-2 rounded-sm w-full"
          {...register("streetAdress")}
        />
        {errors.streetAdress && (
          <span className="text-red-700">{errors.streetAdress.message}</span>
        )}
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Zip Code</label>
        <input
          className="bg-white border border-gray-300 px-4 py-2 rounded-sm w-full"
          {...register("zipCode", {valueAsNumber: true})}
        />
        {errors.zipCode && (
          <span className="text-red-700">{errors.zipCode.message}</span>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium">City</label>
        <input
          className="bg-white border border-gray-300 px-4 py-2 rounded-sm w-full"
          {...register("city")}
        />
        {errors.city && (
          <span className="text-red-700">{errors.city.message}</span>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black py-2 px-4 rounded-sm hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded-sm hover:bg-orange-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditAddressForm;
