import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import NewProductForm from "./NewProductForm";

function NewProductPage() {
  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <div className="flex flex-cl justify-between p-4 items-center">
        <Link href={"/admin"}>
          <ChevronLeft width={30} height={30} />
        </Link>
        <span className="text-2xl">Add product</span>
      </div>
      <div className="flex ">
        <NewProductForm />
      </div>
    </main>
  );
}

export default NewProductPage;
