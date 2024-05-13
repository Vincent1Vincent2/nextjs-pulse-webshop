"use client";

import { Product, products as mockedProducts } from "@/data";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  deleteProduct: (product: Product) => void;
  saveNewProduct: (product: Product) => void;
  saveEditedProduct: (product: Product) => void;
}

const ProductContext = createContext<ContextValue>({} as ContextValue);

function ProductProvider(props: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockedProducts);

  useEffect(() => {
    const lsProcuts = localStorage.getItem("products");
    if (lsProcuts) {
      setProducts(JSON.parse(lsProcuts));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("products", JSON.stringify(products));
  }, [products, isLoaded]);

  function deleteProduct(product: Product) {
    setProducts(products.filter((p) => p.id !== product.id));
  }

  function saveNewProduct(product: any) {
    setProducts([...products, product]);
  }
  function saveEditedProduct(product: any) {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        deleteProduct,
        saveNewProduct,
        saveEditedProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);

export default ProductProvider;
