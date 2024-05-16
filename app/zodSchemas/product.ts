import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(5).max(80),
  price: z.any(),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
