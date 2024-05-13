"use client";
import { useProducts } from "@/app/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/data";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { uid } from "uid";

interface Props {
  product?: Product;
}

function NewProductForm(props: Props) {
  const isEdit = Boolean(props.product);
  const { saveNewProduct, saveEditedProduct } = useProducts();
  const route = useRouter();
  const randomID = uid();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: props.product || { id: randomID, slug: randomID },
  });
  const onSubmit: SubmitHandler<Product> = (data) => {
    if (isEdit) {
      saveEditedProduct(data);
    } else {
      saveNewProduct(data);
    }
    route.push("/admin");
  };
  return (
    <form
      className="flex-1"
      data-cy="product-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>Title</label>
        <Input
          data-cy="product-title"
          type="text"
          {...register("title", {
            required: "Title required",
          })}
        />
        {errors.title && (
          <p className="text-red-400" data-cy="product-title-error">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label>Price</label>
        <Input
          data-cy="product-price"
          type="text"
          {...register("price", {
            required: "Price required",
            pattern: {
              value: /^(?!0+$)\d{1,}$/,
              message: "Only numbers 0-9 allowed",
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
        <label>Image</label>
        <Input
          data-cy="product-image"
          type="text"
          {...register("image", {
            required: "Image URL required",
            pattern: {
              value:
                /^(ftp|http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(:[0-9]+)?(\/.*)?$/,
              message: "valid URL required (https://google.com",
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
        <label>Description</label>
        <Input
          data-cy="product-description"
          type="text"
          {...register("description", {
            required: "Description required",
            pattern: {
              value: /.{2,}/,
              message: "Minimum length: 20 characters",
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
        <Button type="submit">Create product</Button>
      </div>
    </form>
  );
}

export default NewProductForm;
