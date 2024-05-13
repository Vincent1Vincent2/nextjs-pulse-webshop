import CustomerInformation from "./CustomerInformation";
import OrderSummaryTable from "./OrderSummary";

export default function OrderTable() {
   return (
      <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container">
         <div className="bg-stone-100 pt-2 pb-6 mt-4 mb-4">
            <h1 className="text-xl font-semibold flex justify-center mt-2 mb-2">
               Order Confirmation
            </h1>
            <p className="flex justify-center">
               Thank you for your purchase!
            </p>
            <p className="flex justify-center">
               Please see your order information below
            </p>
         </div>

         <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-4 sm:mb-0">
               <OrderSummaryTable />
            </div>
            <div className="w-full md:w-1/2">
               <CustomerInformation />
            </div>
         </div>
      </main>
   );
}
