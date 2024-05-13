"use client";
import {
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { CartItem } from "@/data";
import Image from "next/image";
import { useOrderConfirm } from "../contexts/ConfirmContext";

const OrderSummaryTable = () => {
   const { purchasedItems } = useOrderConfirm();
   const totalPrice = purchasedItems?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
   );
   return (
      <Table className="max-w-650 ">
         <TableHeader>
            <TableRow>
               <TableHead>Image</TableHead>
               <TableHead>Product</TableHead>
               <TableHead>Quantity</TableHead>
               <TableHead>Price</TableHead>
               <TableHead className="flex-grow text-right">Total</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {purchasedItems?.map((product: CartItem) => (
               <TableRow key={product.id}>
                  <TableCell className="font-medium">
                     <Image
                        src={product.image}
                        alt="product image"
                        width={50}
                        height={50}
                     />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="text-right">
                     $ {product.price * product.quantity}
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
         <TableFooter>
            <TableRow>
               <TableCell colSpan={4}>Total</TableCell>
               <TableCell className="text-right"> $ {totalPrice} </TableCell>
            </TableRow>
         </TableFooter>
      </Table>
   );
};

export default OrderSummaryTable;
