import { QuantityArrows } from "@/components/QuantityArrows";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart } = useCart();

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Img</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((cartItem) => (
          <TableRow key={cartItem.id} data-cy="cart-item">
            <TableCell className="font-medium">
              <Image
                src={cartItem.image}
                alt="product image"
                width={80}
                height={80}
              />
            </TableCell>
            <TableCell data-cy="product-title">{cartItem.title}</TableCell>
            <TableCell data-cy="product-price">
              $ {cartItem.price * cartItem.quantity}
            </TableCell>

            <TableCell className="text-center">
              <div className="flex gap-2 items-center justify-center">
                <QuantityArrows cart={cartItem}>
                  {<span data-cy="product-quantity">{cartItem.quantity}</span>}
                </QuantityArrows>
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex  items-center justify-center">
                <Trash2Icon />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right" data-cy="total-price">
            $ {totalPrice}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
