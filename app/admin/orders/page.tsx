import {authenticateUser} from "@/app/actions/authenticate";
import {getAllOrders, markOrderSent} from "@/app/actions/order";
import Image from "next/image";
import {redirect} from "next/navigation";

export default async function Orders() {
  const user = await authenticateUser();

  if (!user?.isAdmin) {
    redirect("/auth/signin");
  }

  const orders = await getAllOrders();

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Order History</h1>

      {orders.length > 0 ? (
        orders.map(order => {
          const total = order.ProductsOrders.reduce(
            (sum, orderRow) => sum + orderRow.product.price * orderRow.quantity,
            0,
          );
          return (
            <div
              key={order.id}
              className="mt-8 mx-auto w-full md:w-3/4 bg-white text-black p-4 md:p-6 rounded-sm"
            >
              <h3 className="text-xl font-bold mb-4 border-b border-gray-200">
                Order ID: {order.id}
              </h3>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <ul>
                    {order.ProductsOrders.map(({product, quantity}) => (
                      <li key={product.id} className="mb-4">
                        <div className="flex items-center mb-2">
                          {product.image && (
                            <Image
                              width={100}
                              height={100}
                              src={product.image}
                              alt={product.name}
                              className="rounded-sm mr-4"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm sm:text-xl text-black">
                                {product.name}
                              </p>
                              <p className="text-sm">{quantity}x</p>
                            </div>
                            <p className="text-sm">
                              {product.price.toFixed(2)} {"\u00A0"}Kr
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xl">Total:</p>
                    <p className="text-lg">
                      {total.toFixed(2)} {"\u00A0"} Kr
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm">
                      {order.isSent
                        ? "Order is on its way!"
                        : "Order waiting to be shipped"}
                    </p>
                    {!order.isSent && (
                      <form
                        action={async () => {
                          "use server";
                          await markOrderSent(order.id);
                        }}
                      >
                        <button className="bg-orange-400 text-white py-2 px-4 rounded-sm text-sm">
                          MARK AS SENT
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-10">
          <p>No orders made... TIME TO BUY!</p>
        </div>
      )}
    </div>
  );
}
