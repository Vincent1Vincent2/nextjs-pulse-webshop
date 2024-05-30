"use server";
import {auth} from "@/auth";
import {db} from "@/prisma/db";
import {OrderCreate} from "../zodSchemas/order";

export async function orderCreate(formData: OrderCreate, addressId: number) {
  const session = await auth();
  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("User not found");
  }
  // Use a transaction to ensure atomicity
  const result = await db.$transaction(async prisma => {
    // Create the order and its associated product orders
    const order = await prisma.order.create({
      data: {
        orderDate: new Date(),
        deliveryAddressId: addressId,
        customerId: user.id,
        ProductsOrders: {
          create: formData.ProductOrder.map(po => ({
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

    for (const po of formData.ProductOrder) {
      const product = await prisma.product.findUnique({
        where: {id: po.productId},
      });
      if (!product) {
        throw new Error(`Product with ID ${po.productId} not found`);
      }
      if (product.stock < po.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      await prisma.product.update({
        where: {id: po.productId},
        data: {stock: product.stock - po.quantity},
      });
    }

    return order;
  });

  return {
    order: {
      id: result.id,
      orderDate: result.orderDate,
      deliveryAddressId: result.deliveryAddressId,
      customerId: result.customerId,
    },
    productOrders: result.ProductsOrders.map(po => ({
      productId: po.productId,
      quantity: po.quantity,
      product: {
        id: po.product.id,
        name: po.product.name,
        description: po.product.description,
        price: po.product.price,
        image: po.product.image,
        slug: po.product.slug,
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
    where: {isSent: false},
  });
  return orders;
}

export async function sentOrders() {
  const orders = await db.order.findMany({
    where: {isSent: true},
  });
  return orders;
}

export async function markOrderSent(id: number | undefined) {
  if (!id) return null;

  const order = await db.order.update({
    where: {id: id},
    data: {isSent: true},
  });

  return order;
}
// Function to fetch order details
export async function getOrder(customerId: string | undefined) {
  const order = await db.order.findMany({
    where: {customerId: customerId},
  });
  return order;
}

// Function to fetch products and quantities associated with the order
export async function getOrderProducts(orderId: number | undefined) {
  const productsOrders = await db.productsOrders.findMany({
    where: {orderId: orderId},
    include: {
      product: true, // This includes product details
    },
  });
  return productsOrders;
}
