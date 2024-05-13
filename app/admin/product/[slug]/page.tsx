"use client";
import { useProducts } from "@/app/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type PageProps = { params: { slug: string } };
type Inputs = {
  title: string;
  price: number;
  image: string;
  description: string;
  slug: string;
  id: string;
};

function EditPage({ params }: PageProps) {
  const { products, saveEditedProduct } = useProducts();
  const product = getProductBySlug(params.slug);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      slug: product?.slug,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    saveEditedProduct(data);
    route.push("/admin");
  };

  function getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
  }

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <div className="flex flex-cl justify-between p-4 md:p-4 items-center">
        <Link href={"/admin"}>
          <ChevronLeft width={30} height={30} />
        </Link>
        <div>
          <span className="text-base md:text-2xl">
            Editerar produkt <b>{product?.title}</b>
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <div className="w-3/6 flex justify-center ">
          <Image
            src={product?.image!}
            alt="product image"
            width={300}
            height={300}
            className="object-contain self-center"
          />
        </div>
        <form
          className="flex-1 w-full px-2"
          data-cy="product-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Titel</label>
            <Input
              data-cy="product-title"
              // defaultValue={product?.title}
              type="text"
              {...register("title", {
                required: "Titel krävs",
              })}
            />
            {errors.title && (
              <p className="text-red-400" data-cy="product-title-error">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label>Pris</label>
            <Input
              data-cy="product-price"
              // defaultValue={product?.price}
              type="text"
              {...register("price", {
                required: "Pris krävs",
                pattern: {
                  value: /^(?!0+$)\d{1,}$/,
                  message: "Skriv in endast siffror (0-9)", //5 siffror inga mellanrum
                },
              })}
            />
            {errors.price && (
              <p className="text-red-400" data-cy="product-price-error">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label>Bild</label>
            <Input
              data-cy="product-image"
              // defaultValue={product?.image}
              type="text"
              {...register("image", {
                required: "Bild URL krävs",
                pattern: {
                  value:
                    /^(ftp|http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(:[0-9]+)?(\/.*)?$/,
                  message: "Måste vara en URL (https://google.com", //5 siffror inga mellanrum
                },
              })}
            />
            {errors.image && (
              <p className="text-red-400" data-cy="product-image-error">
                {errors.image.message}
              </p>
            )}
          </div>
          <div>
            {/*Hade velat ha textAre här för resize property... */}
            <label>Beskrivning</label>
            <Input
              data-cy="product-description"
              // defaultValue={product?.description}
              type="text"
              placeholder={product?.description}
              {...register("description", {
                required: "Beskrivning krävs",
                pattern: {
                  value: /.{3,}/,
                  message: "Måste vara minst 20 tecken",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-400" data-cy="product-description-error">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="py-4 text-right">
            <Button type="submit">Spara</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditPage;
