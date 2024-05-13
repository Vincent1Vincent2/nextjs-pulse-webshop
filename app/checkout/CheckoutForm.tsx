"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { uid } from "uid";
import { useCart } from "../contexts/CartContext";
import { useOrderConfirm } from "../contexts/ConfirmContext";
import Cart from "./cart";

type Inputs = {
  Name: string;
  Adress: string;
  Zipcode: number;
  City: string;
  Phone: number;
  email: string;
  orderNumber: string;
};
export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const { setOrder, setPurchasedItems } = useOrderConfirm();
  const router = useRouter();
  const randomID = uid();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { orderNumber: randomID } });

  /* Genererad onsubmit hanterare */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Perform your form submission logic here
    // For example, you can send data to a server, handle errors, etc.

    try {
      // Assuming a successful submission, you can navigate to the new URL

      setOrder(data);
      setPurchasedItems(cart);
      clearCart();

      // Use router.push to navigate to the desired URL

      await router.push("/confirmation");
    } catch (error) {
      // Handle any errors that may occur during form submission
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <div className="bg-white">
        <Cart />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:grid md:grid-cols-2"
        data-cy="customer-form"
      >
        <Card className=" flex flex-col p-4">
          <h1 className="text-xl">Delivery</h1>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              data-cy="customer-name"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="John Doe"
              autoComplete="name"
              {...register("Name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/, //Endast mellanslag och bokstäver
                  message: "Invalid name (only alphabets and spaces allowed)",
                },
              })}
            />
            {errors.Name && (
              <p className="text-red-400" data-cy="customer-name-error">
                {errors.Name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Adress</label>
            <input
              data-cy="customer-address"
              autoComplete="street-address"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="Sveagatan 1"
              {...register("Adress", {
                required: true,
                minLength: 1,
              })}
            />
            {errors.Adress && (
              <p className="text-red-400" data-cy="customer-address-error">
                Invalid address
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Zipcode</label>
            <input
              data-cy="customer-zipcode"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="54145"
              autoComplete="postal-code"
              {...register("Zipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Invalid zipcode", //5 siffror inga mellanrum
                },
              })}
            />
            {errors.Zipcode && (
              <p className="text-red-400" data-cy="customer-zipcode-error">
                {errors.Zipcode.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>City</label>
            <input
              data-cy="customer-city"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="Skövde"
              autoComplete="address-level2"
              {...register("City", {
                required: true,
                minLength: 1,
              })}
            />
            {errors.City && (
              <p className="text-red-400" data-cy="customer-city-error">
                Invalid city
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              data-cy="customer-email"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="johndoe@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, //email format: inkludera @, "." prefix och suffix av sträng +/ nummer
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400" data-cy="customer-email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Phone</label>
            <input
              data-cy="customer-phone"
              autoComplete="tel"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
              placeholder="+46"
              {...register("Phone", {
                required: true,
                minLength: 5,
                //Implementera regex för att endast tillåta nummer i telefon nummer
              })}
            />
            {errors.Phone && (
              <p className="text-red-400" data-cy="customer-phone-error">
                Invalid phone number
              </p>
            )}
          </div>
        </Card>

        {/* --------------Fake input field-------------- */}
        <Card className="flex flex-col p-4">
          <div className="flex flex-col">
            <label>Creditcard</label>
            <input
              placeholder="1111 2222 3333 4444"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label>Expiration Date</label>
            <input
              type="date"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label>CVC</label>
            <input
              placeholder="CVC"
              className="border rounded-md border-gray-300 mt-1 mb-1 p-1"
            />
          </div>
        </Card>

        <Button>
          <input type="submit" className="cursor-pointer" />
        </Button>
      </form>
    </div>
  );
}
