import { z } from "zod";

export const ProductCreateSchema = z.object({
  categoryProduct: z.array(
    z.object({
      name: z.string().min(5).max(80),
      price: z.any(),
      productIds: z.array(z.number()),
      categoryId: z.number(),
    })
  ),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;

export type categoryProduct = {
  categoryId: number;
  name: string;
  productIds: string;
};
