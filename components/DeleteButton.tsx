"use client";

import {deleteProduct} from "@/app/actions/product";
import {Button} from "./ui/button";

interface Props {
  id: number;
}

function DeleteProduct(props: Props) {
  function handleRemoval() {
    deleteProduct(props.id);
  }

  return <Button onClick={handleRemoval}>Ta bort</Button>;
}

export default DeleteProduct;
