import {ReactNode} from "react";

export type PageProps = Readonly<{params: {slug: string}}>;
export type LayoutProps = Readonly<{children: ReactNode}>;
export type FormProduct = {
  title: string;
  price: number;
  image: string;
  description: string;
  slug: string;
  id: string;
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  deleted?: boolean;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface ProductOrderDetails {
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    stock?: number;
    deleted?: boolean | undefined;
  };
}

export interface Order {
  id: number;
  orderDate: Date;
  deliveryAddressId: number;
  customerId: string;
}

export interface OrderDetails {
  order: Order | null;
  productOrders: ProductOrderDetails[];
}

export interface Address {
  id: string;
  streetAdress: string;
  zipCode: number;
  city: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}
