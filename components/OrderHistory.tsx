"use client";
import { authenticateUser } from "@/app/actions/authenticate";
import { getOrder, getOrderProducts } from "@/app/actions/order";
import { ProductOrderDetails } from "@/app/types";
import { Order, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { AuthUser } from "./header/Header";

export default function OrderHistory() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<{
    [orderID: number]: Product[];
  }>({});

  useEffect(() => {
    async function fetchAuth() {
      const user = await authenticateUser();
      setUser(user);

      if (user) {
        const fetchedOrders = await getOrder(user.id);

        if (fetchedOrders) {
          setOrders(fetchedOrders);

          const productsByOrder: { [orderID: number]: Product[] } = {};

          for (const order of fetchedOrders) {
            const productOrders: ProductOrderDetails[] = await getOrderProducts(
              order.id
            );

            // Map the ProductOrderDetails to the Product type
            productsByOrder[order.id] = productOrders.map((po) => ({
              id: po.product.id,
              name: po.product.name,
              description: po.product.description,
              price: po.product.price,
              image: po.product.image,
            }));
          }

          setOrderProducts(productsByOrder);
        }
      }
    }

    fetchAuth();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {user ? (
        orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id}>
              <h2>Order #{order.id}</h2>
              <p>
                {" "}
                {order.isSent === true
                  ? "Order is on it's way!"
                  : "Order waiting to be shipped"}
              </p>
              {orderProducts[order.id] ? (
                <ul>
                  {orderProducts[order.id].map((product) => (
                    <li key={product.id}>
                      <div>
                        <strong>{product.name}</strong>
                        <p>{product.description}</p>
                        <p>Price: {product.price.toString()}</p>
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>We do a lil loading</p>
              )}
            </div>
          ))
        ) : (
          <p>No orders made... TIME TO BUY!</p>
        )
      ) : (
        <p>Need to sign in</p>
      )}
    </div>
  );
}
