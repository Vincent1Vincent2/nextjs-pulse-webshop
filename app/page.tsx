import CategoryForm from "@/components/CategoryForm";
import ListProducts from "@/components/ListProducts";
import OrderForm from "@/components/OrderForm";
import ProductForm from "@/components/ProductForm";

export default function Home() {
  return (
    <div className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col flex-1">
      {/* <Header /> */}
      <div className="flex flex-col gap-4 p-4 ">
        <CategoryForm />
        <ProductForm />
      </div>
      <OrderForm />

      <OrderHistory />
      <ListProducts />
    </div>
  );
}
