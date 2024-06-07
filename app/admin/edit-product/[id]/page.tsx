import {authenticateUser} from "@/app/actions/authenticate";
import {getCategories} from "@/app/actions/category";
import {getCurrentProducts, getProduct} from "@/app/actions/product";
import EditForm from "@/components/EditForm";
import {ArrowRightIcon} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";

export async function generateStaticParams() {
  const products = await getCurrentProducts();
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({params}: EditProductPageProps) {
  const user = await authenticateUser();

  if (!user || !user.isAdmin) {
    redirect("/auth/signin");
  }

  const categories = await getCategories();
  const product = await getProduct(Number(params.id));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center m-2">
      <h1 className="text-xl sm:text-3xl font-bold text-white mb-6">
        Edit Product
      </h1>
      <div className="max-w-5xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6">
          {product?.name}
        </h1>
        {product && <EditForm categories={categories} product={product} />}
        <Link
          href="/admin"
          className="flex text-black justify-center items-center gap-4"
        >
          <p className="text-xl font-bold hover:text-black/70 transition-all">
            To Admin Dashboard
          </p>
          <ArrowRightIcon className="size-5 hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
