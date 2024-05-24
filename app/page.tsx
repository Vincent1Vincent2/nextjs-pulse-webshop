import ListProducts from "@/components/ListProducts";

export default function Home() {
  return (
    <div className=" p-2 shadow rounded-lg container flex flex-col flex-1 mt-96">
      <ListProducts />
    </div>
  );
}
