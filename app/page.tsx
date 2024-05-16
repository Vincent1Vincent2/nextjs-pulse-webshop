import CategoryForm from "@/components/CategoryForm";
import LoginForm from "@/components/LoginForm";
import OrderForm from "@/components/OrderForm";
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <Header />
      <div className="flex flex-col gap-4 p-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <CategoryForm />
        <RegisterForm />
        <LoginForm />
      </div>

      <OrderForm />
    </main>
  );
}
