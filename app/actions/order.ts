"use server";
import {db} from "@/prisma/db";
import {revalidatePath} from "next/cache";
import {OrderCreate} from "../zodSchemas/order";
import {authenticateUser} from "./authenticate";

export async function orderCreate(formData: OrderCreate, addressId: number) {
  const user = await authenticateUser();

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
  //Exempel på hur vi kan säkra vår APR endpoints
  // const session = await auth();
  // if (!session?.user.isAdmin) return {error: "Not authorized"};

  const user = await authenticateUser();
  if (!user?.isAdmin) {
    throw new Error("Not authorized");
  }

  return await db.order.findMany({
    include: {ProductsOrders: {include: {product: true}}, customer: true},
  });
}

export async function nonSentOrders() {
  const user = await authenticateUser();
  if (!user?.isAdmin) {
    throw new Error("Not authorized");
  }

  return await db.order.findMany({
    where: {isSent: false},
  });
}

export async function sentOrders() {
  const user = await authenticateUser();
  if (!user?.isAdmin) {
    throw new Error("Not authorized");
  }

  return await db.order.findMany({
    where: {isSent: true},
  });
}

export async function markOrderSent(id: number | undefined) {
  const user = await authenticateUser();
  if (!user?.isAdmin) {
    throw new Error("Not authorized");
  }

  if (!id) return null;

  await db.order.update({
    where: {id: id},
    data: {isSent: true},
  });

  revalidatePath("/admin/orders");
}
// Function to fetch order details
export async function getOrder(customerId: string | undefined) {
  const user = await authenticateUser();
  if (!user) {
    throw new Error("Not authorized");
  }

  const order = await db.order.findMany({
    where: {customerId: customerId},
  });
  return order;
}

// Function to fetch products and quantities associated with the order
export async function getOrderProducts(orderId: number | undefined) {
  const user = await authenticateUser();
  if (!user) {
    throw new Error("Not authorized");
  }

  const productsOrders = await db.productsOrders.findMany({
    where: {orderId: orderId},
    include: {
      product: true, // This includes product details
    },
  });
  return productsOrders;
}

export async function getBestSellingProducts() {
  // Fetch all products
  const products = await db.product.findMany({
    include: {
      ProductsOrders: true,
    },
  });

  // Filter products that were ordered more than three times
  const bestSellers = products.filter(
    product => product.ProductsOrders.length > 3,
  );

  return bestSellers;
}
