import CategoryForm from "@/components/CategoryForm";
import ProductForm from "@/components/ProductForm";

export default function Home() {
  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <div className="flex flex-col gap-4 p-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <CategoryForm />
        <ProductForm />
      </div>
    </main>
  );
}
