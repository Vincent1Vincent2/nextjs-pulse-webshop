import {z} from "zod";

export const CategoryCreateSchema = z.object({
  name: z.string().min(3).max(80),
  slug: z.string().min(3).max(80),
});

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
