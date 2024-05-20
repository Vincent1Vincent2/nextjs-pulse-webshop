import { z } from 'zod';

export const ProductCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive('Please enter a positive number')
  ),
  image: z.string().url(),
  stock: z.number().int().positive(),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
