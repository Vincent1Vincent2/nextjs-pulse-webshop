"use client";
import {authenticateUser} from "@/app/actions/authenticate";
import {
  getAllOrders,
  getOrderProducts,
  markOrderSent,
} from "@/app/actions/order";
import {ProductOrderDetails, ProductWithQuantity} from "@/app/types";
import {Order, User} from "@prisma/client";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Orders() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<{
    [orderID: number]: ProductWithQuantity[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      const fetchedUser = await authenticateUser();
      setUser(fetchedUser);

      if (fetchedUser) {
        const fetchedOrders = await getAllOrders();

        if (fetchedOrders) {
          setOrders(fetchedOrders);

          const productsByOrder: {[orderID: number]: ProductWithQuantity[]} =
            {};

          for (const order of fetchedOrders) {
            const productOrders: ProductOrderDetails[] = await getOrderProducts(
              order.id,
            );

            // Map the ProductOrderDetails to the Product type
            productsByOrder[order.id] = productOrders.map(po => ({
              id: po.product.id,
              name: po.product.name,
              description: po.product.description,
              price: po.product.price,
              image: po.product.image,
              deleted: po.product.deleted!,
              quantity: po.quantity,
            }));
          }

          setOrderProducts(productsByOrder);
        }
      }
      setLoading(false);
    }

    fetchAuth();
  }, []);

  const handleMarkOrderSent = async (orderId: number) => {
    await markOrderSent(orderId);

    setOrders(
      orders.map(order =>
        order.id === orderId ? {...order, isSent: true} : order,
      ),
    );
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Order History</h1>

      {user ? (
        orders.length > 0 ? (
          orders.map(order => {
            const total =
              orderProducts[order.id]?.reduce(
                (sum, product) => sum + product.price * product.quantity,
                0,
              ) || 0;
            return (
              <div
                key={order.id}
                className="mt-8 mx-auto w-full md:w-3/4 bg-white text-black p-4 md:p-6 rounded-sm"
              >
                {orderProducts[order.id] ? (
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      <ul>
                        {orderProducts[order.id].map(product => (
                          <li key={product.id} className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm sm:text-xl text-black">
                                {product.name}
                              </p>
                              <p className="text-sm">{product.quantity}x</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm">
                                {product.price.toFixed(2)} {"\u00A0"}Kr
                              </p>
                              {product.image && (
                                <Image
                                  width={100}
                                  height={100}
                                  src={product.image}
                                  alt={product.name}
                                  className="rounded-sm"
                                />
                              )}
                              <div className="flex  flex-col gap-5 items-right">
                                <p className="text-sm">
                                  {order.isSent
                                    ? "Order is on its way!"
                                    : "Order waiting to be shipped"}
                                </p>
                                {!order.isSent && (
                                  <button
                                    className="bg-orange-400 text-white py-2 px-4 rounded-sm text-sm"
                                    onClick={() =>
                                      handleMarkOrderSent(order.id)
                                    }
                                  >
                                    MARK AS SENT
                                  </button>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <p className="text-xl">Total:</p>
                        <p className="text-lg">
                          {" "}
                          {total.toFixed(2)} {"\u00A0"} Kr
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center">Loading order details...</p>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center mt-10">
            <p>No orders made... TIME TO BUY!</p>
          </div>
        )
      ) : (
        <p className="text-center mt-10">Need to sign in</p>
      )}
    </div>
  );
}
