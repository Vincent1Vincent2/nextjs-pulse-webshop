"use server";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { OrderCreate } from "../zodSchemas/order";

export async function orderCreate(formData: OrderCreate, addressId: number) {
  const email = cookies().get("name");

  const user = await db.user.findUnique({ where: { email: email?.value } });
  if (!user) {
    throw new Error("User not found");
  }

  const order = await db.order.create({
    data: {
      orderDate: new Date(),
      deliveryAddressId: addressId,
      customerId: user.id,
      ProductsOrders: {
        create: formData.ProductOrder.map((po) => ({
          productId: po.productId,
          quantity: po.quantity,
        })),
      },
    },
    include: {
      ProductsOrders: {
        include: {
          product: true,
        },
      },
    },
  });

  return {
    order: {
      id: order.id,
      orderDate: order.orderDate,
      deliveryAddressId: order.deliveryAddressId,
      customerId: order.customerId,
    },
    productOrders: order.ProductsOrders.map((po) => ({
      productId: po.productId,
      quantity: po.quantity,
      product: {
        id: po.product.id,
        name: po.product.name,
        description: po.product.description,
        price: po.product.price,
        image: po.product.image,
      },
    })),
  };
}

export async function getAllOrders() {
  const order = await db.order.findMany({});
  return order;
}

export async function nonSentOrders() {
  const orders = await db.order.findMany({
    where: { isSent: false },
  });
  return orders;
}

export async function sentOrders() {
  const orders = await db.order.findMany({
    where: { isSent: true },
  });
  return orders;
}

export async function markOrderSent(id: number | undefined) {
  if (!id) return null;

  const order = await db.order.update({
    where: { id: id },
    data: { isSent: true },
  });

  return order;
}
// Function to fetch order details
export async function getOrder(customerId: number | undefined) {
  const order = await db.order.findMany({
    where: { customerId: customerId },
  });
  return order;
}

// Function to fetch products and quantities associated with the order
export async function getOrderProducts(orderId: number | undefined) {
  const productsOrders = await db.productsOrders.findMany({
    where: { orderId: orderId },
    include: {
      product: true, // This includes product details
    },
  });
  return productsOrders;
}
