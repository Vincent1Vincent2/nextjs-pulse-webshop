"use client";
import { orderCreate } from "@/app/actions/order";
import { useCart } from "@/app/contexts/CartContext";
import { OrderDetails } from "@/app/types";
import { OrderCreate, OrderCreateSchema } from "@/app/zodSchemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddressForm from "./AddressForm";

const OrderForm = () => {
  const { cart, clearCart } = useCart();
  const form = useForm<OrderCreate>({
    resolver: zodResolver(OrderCreateSchema),
  });
  const {
    formState: { errors },
  } = form;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [addressId, setAddressId] = useState<number | null>(null);

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

  if (addressId === null) {
    return <AddressForm onAddressCreated={onAddressCreated} />;
  }

  return (
    <div>
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
              <div className="flex justify-between mx-5 my-2">
                <label>{product.title}</label>
                <Controller
                  name={`ProductOrder.${index}.quantity`}
                  control={form.control}
                  defaultValue={product.quantity}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <span>{product.quantity}x</span>
              </div>
            </div>
          ))}
          {errors.ProductOrder && <span>{errors.ProductOrder.message}</span>}
          {cart.length > 0 ? (
            <button
              className="border self-center border-black w-1/3 my-4 hover:bg-black hover:bg-opacity-5"
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
            {orderDetails.productOrders.map((po) => {
              const totalForProduct =
                parseFloat(po.product.price.toString()) * po.quantity;

              return (
                <ul className="flex justify-between my-2" key={po.productId}>
                  <li>{po.product.name}</li>
                  <div className="flex gap-5">
                    <li>{po.quantity}x</li>
                    <p>${totalForProduct}</p>
                  </div>
                </ul>
              );
            })}
          </ul>
          <h3>Total</h3>
          <p>
            $
            {orderDetails.productOrders.reduce(
              (acc, po) =>
                acc + parseFloat(po.product.price.toString()) * po.quantity,
              0
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
