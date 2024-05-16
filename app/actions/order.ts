"use server";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { OrderCreate, ProductOrder } from "../zodSchemas/order";

// Function to create an order
export async function orderCreate(formData: OrderCreate) {
  const email = cookies().get("name");

  const user = await db.user.findUnique({ where: { email: email?.value } });
  if (!user) {
    throw new Error("User not found");
  }

  // Create the order and get the order ID
  const order = await db.order.create({
    data: {
      ProductsOrders: {
        create: formData.ProductOrder.map((po: ProductOrder) => ({
          productId: po.productId,
          quantity: po.quantity,
        })),
      },
    },
  });

  // Fetch and return the complete order details
  const orderDetails = await getOrderDetails(order.id);
  return orderDetails;
}

// Function to fetch the complete order details
async function getOrderDetails(orderId: number) {
  const order = await getOrder(orderId);
  const productsOrders = await getOrderProducts(orderId);

  return {
    order,
    productsOrders,
  };
}

// Function to fetch order details
export async function getOrder(orderId: number) {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });
  return order;
}

// Function to fetch products and quantities associated with the order
export async function getOrderProducts(orderId: number) {
  const productsOrders = await db.productsOrders.findMany({
    where: { orderId: orderId },
    include: {
      product: true, // This includes product details if needed
    },
  });
  return productsOrders;
}
