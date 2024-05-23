import {z} from "zod";

export const AddressCreateSchema = z.object({
  streetAdress: z.string().min(10).max(80),
  zipCode: z.number().min(3),
  city: z.string().min(3).max(25),
});

export type AddressCreate = z.infer<typeof AddressCreateSchema>;
