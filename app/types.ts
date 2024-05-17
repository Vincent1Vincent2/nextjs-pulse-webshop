import { Product } from "@prisma/client";
import { ReactNode } from "react";

export type PageProps = Readonly<{ params: { slug: string } }>;
export type LayoutProps = Readonly<{ children: ReactNode }>;
export type FormProduct = {
  title: string;
  price: string;
  image: string;
  description: string;
  slug: string;
  id: string;
};

export type Order = {
  Adress: string;
  City: string;
  Name: string;
  Phone: string;
  Zipcode: string;
  email: string;
  orderNumber: string;
};
export interface category {
  categoryId: number;
}

export type productCreate = {
  name: string;
  price: number;
  categoryId: number;
};

export interface CategoryProducts {
  id: number;
  category: string;
  categoryId: number;
  product: Product;
}
