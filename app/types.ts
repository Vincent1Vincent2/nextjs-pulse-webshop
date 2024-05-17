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

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
}

export interface ProductOrderDetails {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
}

export interface OrderDetails {
  order: Order | null;
  productsOrders: ProductOrderDetails[];
}
