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
import {ShoppingCartIcon} from "lucide-react";
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
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false);
    }

    fetchAddress();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

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

  console.log(orderDetails);
  return (
    <div className=" ">
      <ShoppingCartIcon className=" size-10 text-white mx-auto " />
      {cart.length !== 0 ? (
        <p className="text-xl font-bold text-white text-center m-4">
          Your Cart
        </p>
      ) : (
        <p className="  text-white text-center m-4">Your cart is empty</p>
      )}

      <div className="flex  flex-col justify-between my-2 items-center bg-neutral-100 p-10 rounded-sm max-w-5xl mx-auto">
        {edit ? (
          <EditAddressForm
            address={address![0]}
            onSubmit={handleAddressSubmit}
            onCancel={() => setEdit(false)}
          />
        ) : (
          <div className="flex flex-col sm:flex-row py-2 bg-neutral-100 w-full justify-between items-center">
            <h2 className=" text-xl font-bold text-center rounded-sm p-8">
              Delivery Address
            </h2>
            {address && (
              <ul className="flex flex-col sm:flex-row items-center gap-5 ">
                <li>{address[0].streetAdress}</li>
                <li>{address[0].zipCode}</li>
                <li>{address[0].city}</li>
              </ul>
            )}
            <button
              className=" rounded-sm m-5 bg-orange-400 hover:bg-orange-300 text-white py-2 px-6"
              onClick={() => setEdit(true)}
            >
              Edit Address
            </button>
          </div>
        )}
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col max-w-5xl mx-auto bg-neutral-100">
          {cart.map((product, index) => (
            <div key={product.id}>
              <input
                type="hidden"
                value={product.id}
                {...form.register(`ProductOrder.${index}.productId`, {
                  valueAsNumber: true,
                })}
              />
              <div className="flex justify-between my-2 items-center bg-white text-black p-10 rounded-sm max-w-5xl mx-auto">
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
          <div className="flex justify-between items-center mt-4 p-8 border-t border-gray-400 ">
            <p className="text-xl">Total:</p>
            <p className="text-lg">
              {" "}
              {totalForProduct(cart).toFixed(2)} {"\u00A0"} Kr
            </p>
          </div>
          {errors.ProductOrder && <span>{errors.ProductOrder.message}</span>}
          {cart.length > 0 ? (
            <button
              className="self-center bg-orange-400 hover:bg-orange-300 w-96 my-8 py-2 rounded-sm text-white"
              type="submit"
            >
              BUY NOW
            </button>
          ) : null}
        </div>
      </form>

      {orderDetails && (
        <div className="flex flex-col mx-auto bg-white mt-10 p-6 rounded-md shadow-md max-w-5xl text-black">
          <h2 className="self-center text-2xl font-bold mb-4">Order Details</h2>
          <p className="self-center text-xl mb-4">
            Order ID: {orderDetails.order?.id}
          </p>
          <h3 className="text-lg font-semibold mb-5 border-b border-gray-400">
            Products
          </h3>
          <ul className="mb-4">
            {orderDetails.productOrders.map(po => (
              <div
                key={po.productId}
                className="flex justify-between my-2 items-center"
              >
                <div className="flex flex-col sm:flex-row items-center gap-10 my-2">
                  <Image
                    src={po.product.image!}
                    alt="product image"
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <span className="flex flex-col self-baseline">
                    <label className="text-lg font-semibold">
                      {po.product.name}
                    </label>
                    <label>{po.product.price.toString() + " "} Kr</label>
                    <label className="text-sm">{po.product.description}</label>
                  </span>
                </div>
              </div>
            ))}
          </ul>
          <h3 className="text-lg font-semibold border-t border-gray-400">
            Total
          </h3>
          <p className="text-xl">
            {orderDetails.productOrders.reduce(
              (acc, po) =>
                acc + parseFloat(po.product.price.toString()) * po.quantity,
              0,
            ) + " "}{" "}
            Kr
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
