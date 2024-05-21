import { z } from "zod";

export const OrderCreateSchema = z.object({
  ProductOrder: z.array(
    z.object({
      productId: z.number().min(1, "Product ID is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
});

export type OrderCreate = z.infer<typeof OrderCreateSchema>;
