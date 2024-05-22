import {auth} from "@/auth";
import DeleteButton from "@/components/DeleteButton";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import {getCurrentProducts} from "../actions/product";

export default async function AdminPage() {
  const session = await auth();

  const products = await getCurrentProducts();

  return session?.user.isAdmin ? (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col gap-5">
      <div>
        <h2>Add a product</h2>
        <ProductForm />
      </div>
      <Link className="text-black" href={"/admin/orders"}>
        User Orders
      </Link>
      {products?.map(p => (
        <div key={p.id}>
          <ul>
            <li>ID - {p.id}</li>
            <li>{p.name}</li>
            <li>{p.description}</li>
          </ul>
          <DeleteButton id={p.id} />
          <Link href={`/admin/edit-product/${p.id}`}>
            <button>We do a lil editing?</button>
          </Link>
        </div>
      ))}
    </main>
  ) : (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col gap-5">
      <p>Loading!</p>
    </main>
  );
}
