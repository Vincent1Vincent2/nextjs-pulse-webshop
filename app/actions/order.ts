"use server";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { OrderCreate } from "../zodSchemas/order";

export async function orderCreate(formData: OrderCreate) {
  const email = cookies().get("name");

  const user = await db.user.findUnique({ where: { email: email?.value } });

  await db.order.create({
    data: {
      ProductsOrders: {
        create: [
          { productId: formData.ProductOrder[0].productId, quantity: 5 },
        ],
      },
    },
  });
}
