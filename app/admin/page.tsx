import {auth} from "@/auth";
import DeleteButton from "@/components/DeleteButton";
import ProductForm from "@/components/ProductForm";
import {ArrowRightIcon} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";
import {authenticateUser} from "../actions/authenticate";
import {getCurrentProducts} from "../actions/product";

export default async function AdminPage() {
  const session = await auth();
  const user = await authenticateUser();

  if (!session || !user?.isAdmin) {
    redirect("/auth/signin");
  }

  const products = await getCurrentProducts();

  return (
    <main className="bg-black min-h-screen text-white p-4 max-w-5xl mx-auto">
      <h2 className=" text-white text-2xl font-bold mt-4 block p-4 rounded-sm text-center">
        Admin Dashboard
      </h2>
      <div className="flex justify-end mt-4">
        <Link
          href={"/admin/orders"}
          className=" flex justify-between items-center bg-black border border-orange-400 gap-4  font-normal leading-6 text-orange-400 transition-all md:text-lg hover:text-orange-300  hover:bg-slate-900/65 px-2 py-1  md:px-5 md:py-2 rounded-sm"
        >
          <p>All Orders</p>
          <ArrowRightIcon className=" size-5 hover:translate-x-1 transition-all" />
        </Link>
      </div>
      <div className=" bg-slate-100 p-4 rounded-sm mt-4">
        <h2 className=" text-black text-xl font-bold m-4 text-center">
          Add a Product
        </h2>
        <ProductForm />
      </div>
      {products?.map(p => (
        <div key={p.id} className="bg-white text-black p-6 rounded-sm mt-4">
          <ul>
            <li className="text-xl font-semibold border-b border-gray-200">
              ID: {p.id}
            </li>
            <li className="text-lg font-bold my-4 ">{p.name}</li>
            <li className="text-md">{p.description}</li>
          </ul>
          <p>{p.price} kr</p>
          {p.stock > 0 ? (
            <p className="font-semibold text-green-600 my-2">
              In Stock - {p.stock}
            </p>
          ) : (
            <p className="text-red-600">Not in Stock</p>
          )}
          <div className="flex gap-4 mt-4">
            <DeleteButton id={p.id} />
            <Link href={`/admin/edit-product/${p.id}`}>
              <button className="bg-orange-400 text-white py-2 px-10 rounded-sm hover:bg-orange-300">
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
