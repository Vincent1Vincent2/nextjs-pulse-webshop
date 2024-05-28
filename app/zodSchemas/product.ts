/* id             Int              @id @default(autoincrement())
name           String
description    String
price          Decimal
image          String?
deleted        Boolean          @default(false)
categories     Category[]
ProductsOrders ProductsOrders[] */

import {z} from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(0).max(80),
  description: z.string().min(0).max(500),
  price: z.number().min(0),
  image: z.string().min(0).max(500),
  stock: z.number().int().min(0),
  categories: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
    }),
  ),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
