"use client";
import {addressCreate, checkAddress, editAddress} from "@/app/actions/adress";
import {orderCreate} from "@/app/actions/order";
import {useCart} from "@/app/contexts/CartContext";
import {OrderDetails} from "@/app/types";
import {AddressCreate} from "@/app/zodSchemas/address";
import {OrderCreate, OrderCreateSchema} from "@/app/zodSchemas/order";
import {CartItem} from "@/data";
import {zodResolver} from "@hookform/resolvers/zod";
import {Address} from "@prisma/client";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import AddressForm from "./AddressForm";
import EditAddressForm from "./EditAddressFrom";
import {QuantityArrows} from "./QuantityArrows";
import SignInButton from "./SignInButton";

const OrderForm = () => {
  const {cart, addToCart, removeFromCart, clearCart} = useCart();
  const form = useForm<OrderCreate>({
    resolver: zodResolver(OrderCreateSchema),
  });
  const {
    formState: {errors},
  } = form;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [addressId, setAddressId] = useState<number | null>(null);
  const [address, setAddress] = useState<Address[] | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const onAddressCreated = (createdAddressId: number) => {
    setAddressId(createdAddressId);
  };

  const handleSubmit = async (data: OrderCreate) => {
    try {
      const orderDetails = await orderCreate(data, addressId!);

      setOrderDetails(orderDetails);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleAddressSubmit = async (data: AddressCreate) => {
    try {
      if (edit) {
        await editAddress(data);
      } else {
        const address = await addressCreate(data);
        onAddressCreated(address.address.id);
      }
      setEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  useEffect(() => {
    async function fetchAddress() {
      try {
        const hasAddress = await checkAddress();
        if (hasAddress.length > 0) {
          const addressID = hasAddress[0].id;
          setAddressId(addressID);
          setAddress(hasAddress);
        }
      } catch (error: any) {
        if (error.message === "SignInRequired") {
          setErrorType("SignInRequired");
        } else if (error.message === "NoAddressRegistered") {
          setErrorType("NoAddressRegistered");
        } else {
          setErrorType("GenericError");
        }
        console.error("Error fetching address:", error);
      }
    }

    fetchAddress();
  }, []);

  if (errorType === "SignInRequired") {
    return (
      <div className="text-red-700 flex justify-center items-center h-96 flex-col gap-5">
        <p>Please sign in to continue.</p>
        <SignInButton />
      </div>
    );
  }

  if (errorType === "NoAddressRegistered") {
    return (
      <div className=" flex justify-center items-center h-96 flex-col gap-5">
        <p className="text-red-700">Register a delivery address to order.</p>
        <AddressForm onAddressCreated={onAddressCreated} />
      </div>
    );
  }

  if (addressId === null) {
    return <AddressForm onAddressCreated={onAddressCreated} />;
  }

  function totalForProduct(cart: CartItem[]) {
    return cart.reduce((total, product) => {
      return total + parseFloat(product.price.toString()) * product.quantity;
    }, 0);
  }

  return (
    <div>
      <div className="flex flex-col items-center py-5">
        {edit ? (
          <EditAddressForm
            address={address![0]}
            onSubmit={handleAddressSubmit}
            onCancel={() => setEdit(false)}
          />
        ) : (
          <div className="flex flex-col py-5">
            <h2 className="py-5 text-xl">Delivery Address</h2>
            {address && (
              <ul className="flex flex-col items-center gap-3 ">
                <li>{address[0].streetAdress}</li>
                <li>{address[0].zipCode}</li>
                <li>{address[0].city}</li>
              </ul>
            )}
            <button
              className=" rounded-xl my-5 bg-neutral-200 hover:bg-neutral-100 py-0.5 px-6"
              onClick={() => setEdit(true)}
            >
              Edit Address
            </button>
          </div>
        )}
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col ">
          {cart.map((product, index) => (
            <div key={product.id}>
              <input
                type="hidden"
                value={product.id}
                {...form.register(`ProductOrder.${index}.productId`, {
                  valueAsNumber: true,
                })}
              />
              <div className="flex justify-between mx-5 my-2 items-center bg-neutral-100 p-10 rounded-lg">
                <div className="flex gap-5 flex-wrap">
                  <Image
                    src={product.image!}
                    alt="product image"
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                  <span className="flex flex-col py-4">
                    <label className="text-xl">{product.name}</label>
                    <label>
                      {product.price.toString() + " "}
                      SEK
                    </label>
                  </span>
                </div>
                <Controller
                  name={`ProductOrder.${index}.quantity`}
                  control={form.control}
                  defaultValue={product.quantity}
                  render={({field}) => <input type="hidden" {...field} />}
                />

                <QuantityArrows cart={product}>
                  <span>{product.quantity}x</span>
                </QuantityArrows>
              </div>
            </div>
          ))}
          <p className="mx-10 mt-5">
            {" "}
            Totalt {" " + totalForProduct(cart) + " "}SEK
          </p>

          {errors.ProductOrder && <span>{errors.ProductOrder.message}</span>}
          {cart.length > 0 ? (
            <button
              className="border self-center border-black w-1/3 my-4 hover:bg-black hover:bg-opacity-5 "
              type="submit"
            >
              Buy
            </button>
          ) : null}
        </div>
      </form>

      {orderDetails && (
        <div className="flex flex-col mx-5">
          <h2 className="self-center">Order Details</h2>
          <p className="self-center">Order ID: {orderDetails.order?.id}</p>
          <h3 className="font-medium">Products</h3>
          <ul>
            {orderDetails.productOrders.map(po => {
              return (
                <div className="flex justify-between mx-5 my-2 items-center">
                  <div className="flex items-center">
                    <Image
                      src={po.product.image!}
                      alt="product image"
                      width={150}
                      height={150}
                    />
                    <span className="flex flex-col self-baseline">
                      <label className="text-xl">{po.product.name}</label>
                      <label>
                        {po.product.price.toString() + " "}
                        SEK
                      </label>
                      <label className="w-3/4">{po.product.description}</label>
                    </span>
                  </div>
                </div>
              );
            })}
          </ul>
          <h3>Total</h3>
          <p>
            {orderDetails.productOrders.reduce(
              (acc, po) =>
                acc + parseFloat(po.product.price.toString()) * po.quantity,
              0,
            ) + " "}
            sek
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
