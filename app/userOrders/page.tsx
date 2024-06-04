import {authenticateUser} from "@/app/actions/authenticate";
import {getOrder, getOrderProducts} from "@/app/actions/order";
import Image from "next/image";
import {redirect} from "next/navigation";

export default async function Orders() {
  const user = await authenticateUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const orders = await getOrder(user.id);

  const orderDetails = await Promise.all(
    orders.map(async order => {
      const products = await getOrderProducts(order.id);
      const total = products.reduce(
        (sum, productOrder) =>
          sum + productOrder.product.price * productOrder.quantity,
        0,
      );
      return {...order, products, total};
    }),
  );

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold text-center mt-10">Your Orders</h1>

      {orderDetails.length > 0 ? (
        orderDetails.map(order => (
          <div
            key={order.id}
            className="mt-8 mx-auto w-full md:w-3/4 bg-white text-black p-4 md:p-6 rounded-sm"
          >
            {order.products ? (
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <ul>
                    <h3 className="text-xl font-bold mb-4 border-b border-gray-200">
                      Order ID: {order.id}
                    </h3>
                    {order.products.map(productOrder => (
                      <li key={productOrder.product.id} className="mb-4">
                        <div className="flex items-center mb-2">
                          {productOrder.product.image && (
                            <Image
                              width={100}
                              height={100}
                              src={productOrder.product.image}
                              alt={productOrder.product.name}
                              className="rounded-sm mr-4"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-xl text-black">
                                {productOrder.product.name}
                              </p>
                              <p className="text-sm">
                                {productOrder.quantity}x
                              </p>
                            </div>
                            <p className="text-sm">
                              {productOrder.product.price.toFixed(2)} {"\u00A0"}
                              Kr
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xl">Total:</p>
                    <p className="text-lg">
                      {order.total.toFixed(2)} {"\u00A0"}Kr
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm">
                      {order.isSent
                        ? "Order is on its way!"
                        : "Order waiting to be shipped"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">Loading order details...</p>
            )}
          </div>
        ))
      ) : (
        <div className="text-center mt-10">
          <p>No orders made... TIME TO BUY!</p>
        </div>
      )}
    </div>
  );
}
