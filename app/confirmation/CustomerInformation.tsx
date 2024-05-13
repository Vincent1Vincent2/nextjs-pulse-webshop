"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useOrderConfirm } from "../contexts/ConfirmContext";

function CustomerInformation() {
   const { order } = useOrderConfirm();
   return (
      <div className="mx-auto mb-6">
         <Table className="max-w-400">
            <TableBody>
               <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell className="text-right">{order?.Name}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell className="text-right">{order?.Adress}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">City</TableCell>
                  <TableCell className="text-right">{order?.City}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">Zipcode</TableCell>
                  <TableCell className="text-right">{order?.Zipcode}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">City</TableCell>
                  <TableCell className="text-right">{order?.City}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell className="text-right">{order?.email}</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell className="text-right">{order?.Phone}</TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </div>
   );
}

export default CustomerInformation;
