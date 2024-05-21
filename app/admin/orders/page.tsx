"use client";
import { authenticateUser } from "@/app/actions/authenticate";
import {
  getAllOrders,
  getOrderProducts,
  markOrderSent,
} from "@/app/actions/order";
import { ProductOrderDetails, ProductWithQuantity } from "@/app/types";
import { AuthUser } from "@/components/header/Header";
import { Order } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Orders() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<{
    [orderID: number]: ProductWithQuantity[];
  }>({});
  const pageView = ["all", "sent", "notSent"];

  useEffect(() => {
    async function fetchAuth() {
      const user = await authenticateUser();
      setUser(user);

      if (user) {
        const fetchedOrders = await getAllOrders();

        if (fetchedOrders) {
          setOrders(fetchedOrders);

          const productsByOrder: { [orderID: number]: ProductWithQuantity[] } =
            {};

          for (const order of fetchedOrders) {
            const productOrders: ProductOrderDetails[] = await getOrderProducts(
              order.id
            );

            // Map the ProductOrderDetails to the Product type
            productsByOrder[order.id] = productOrders.map((po) => ({
              id: po.product.id,
              name: po.product.name,
              description: po.product.description,
              price: po.product.price.toString(),
              image: po.product.image,
              deleted: po.product.deleted!,
              quantity: po.quantity,
            }));
          }

          setOrderProducts(productsByOrder);
        }
      }
    }

    fetchAuth();
  }, []);

  return (
    <div className="bg-white">
      <h1>Order History</h1>
      {user ? (
        orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id}>
              {orderProducts[order.id] ? (
                <ul>
                  {orderProducts[order.id].map((product) => (
                    <li key={product.id}>
                      <div className="flex justify-between">
                        <strong>{product.name}</strong>
                        <p>{product.quantity}x</p>
                      </div>
                      <div>
                        <p>${product.price.toString()}</p>
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                        <div className="flex gap-5">
                          <p>
                            {" "}
                            {order.isSent === true
                              ? "Order is on it's way!"
                              : "Order waiting to be shipped"}
                          </p>

                          <button
                            className="bg-slate-900 text-yellow-50 py-0 px-3 rounded-md text-sm"
                            onClick={() => markOrderSent(order.id)}
                          >
                            MARK AS SENT
                          </button>
                        </div>
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
