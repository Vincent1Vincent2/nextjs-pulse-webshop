"use client";

import { CartItem } from "@/data";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Order } from "../types";

interface ContextValue {
  order: Order;
  purchasedItems: CartItem[];
  setOrder: Dispatch<any>;
  setPurchasedItems: Dispatch<any>;
}

const ConfirmContext = createContext<ContextValue>({} as ContextValue);

function ConfirmProvider(props: PropsWithChildren) {
  const [order, setOrder] = useState<any>();
  const [purchasedItems, setPurchasedItems] = useState<any>();

  return (
    <ConfirmContext.Provider
      value={{
        order,
        setOrder,
        purchasedItems,
        setPurchasedItems,
      }}
    >
      {props.children}
    </ConfirmContext.Provider>
  );
}

export const useOrderConfirm = () => useContext(ConfirmContext);

export default ConfirmProvider;
