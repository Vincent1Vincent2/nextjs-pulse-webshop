"use client";

import {deleteProduct} from "@/app/actions/product";
import {Button} from "./ui/button";
import {toast} from "./ui/use-toast";

interface Props {
  id: number;
}

function DeleteProduct(props: Props) {
  function handleRemoval() {
    deleteProduct(props.id);
    toast({
      title: "Product marked as deleted",
      description: "The product has been removed from the store.",
    });
  }

  return <Button onClick={handleRemoval}>Remove</Button>;
}

export default DeleteProduct;
