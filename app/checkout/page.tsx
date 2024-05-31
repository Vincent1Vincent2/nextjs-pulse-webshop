import OrderForm from "@/components/OrderForm";
import {redirect} from "next/navigation";
import {authenticateUser} from "../actions/authenticate";
export default async function Checkout() {
  const user = await authenticateUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className=" m-5 rounded-xl p-5">
      <OrderForm />
    </main>
  );
}
