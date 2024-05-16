import { z } from "zod";

export const ProductOrderSchema = z.object({
  productId: z.number().int(),
});

export type ProductOrder = z.infer<typeof ProductOrderSchema>;

export const OrderCreateSchema = z.object({
  customerId: z.string().min(3).max(80),
  customerAddress: z.string().min(3).max(80),
  date: z.date(),
  ProductOrder: z.array(ProductOrderSchema),
});

export type OrderCreate = z.infer<typeof OrderCreateSchema>;
