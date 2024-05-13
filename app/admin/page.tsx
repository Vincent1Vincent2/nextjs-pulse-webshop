"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { ChevronLeft, Edit2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../contexts/ProductContext";

// kan inte "rensa" detta page, shadcn fockar med att sätta rutan inuti parent när man sätter allt nedan i en komponent.

export default function AdminPage() {
  const { products, deleteProduct } = useProducts();

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <div className="flex flex-cl justify-between p-4 items-center">
        <Link href={"/"}>
          <ChevronLeft width={30} height={30} />
        </Link>
        <span className="text-2xl">Products</span>
      </div>
      <div className="flex px-4">
        <div className="flex-1"></div>
        <Link href={"/admin/product/new"} data-cy="admin-add-product">
          <Button className="right-0">Add product</Button>
        </Link>
      </div>
      {products.length < 1 && (
        <div className="flex items-center flex-col p-8 gap-4">
          <div className="text-4xl">No products found...</div>
          <div className="text-9xl">🤷‍♂️</div>
          <div className="flex gap-4 items-center">
            <span className="text-5xl">👉</span>
            <Link href={"/admin/product/new"}>
              <Button>Add product</Button>
            </Link>
            <span className="text-5xl">👈</span>
          </div>
        </div>
      )}
      {products.map((product) => (
        <div
          className="m-4 p-4 shadow rounded-lg bg-white grid md:grid-cols-3"
          key={product.id}
          data-cy="product"
        >
          <div className="flex gap-4">
            <Image
              src={product.image}
              alt="product image"
              width={80}
              height={80}
              className="object-contain"
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl" data-cy="product-title">
                {product.title}
              </span>
              <span className="text-" data-cy="product-price">
                Price: ${product.price}
              </span>
              <span className="text-" data-cy="product-id">
                {product.id}
              </span>
            </div>
          </div>
          <div
            className="flex justify-center items-center p-4"
            data-cy="product-description"
          >
            {product.description}
          </div>
          <div className="flex gap-4 justify-end md:items-center">
            <Link href={`/admin/product/${product.slug}`}>
              <Edit2Icon
                width={35}
                height={35}
                className="cursor-pointer"
                data-cy="admin-edit-product"
              />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2Icon
                  width={35}
                  height={35}
                  className="cursor-pointer"
                  data-cy="admin-remove-product"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to remove the product?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can not be reverted
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, keep it</AlertDialogCancel>
                  <AlertDialogAction
                    data-cy="confirm-delete-button"
                    onClick={() => deleteProduct(product)}
                  >
                    Yes, remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </main>
  );
}
