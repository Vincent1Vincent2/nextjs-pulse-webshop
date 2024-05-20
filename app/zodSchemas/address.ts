import { z } from "zod";

export const AddressCreateSchema = z.object({
  streetAdress: z.string().min(3).max(80),
  zipCode: z.number(),
  city: z.string(),
});

export type AddressCreate = z.infer<typeof AddressCreateSchema>;
