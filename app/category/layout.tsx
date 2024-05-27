import CategoryForm from "@/components/CategoryForm";

export default function CategoryLayout(props: PropsWithChildren) {
  return (
    <div className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col flex-1">
      <div className="flex flex-col gap-4 p-4 ">
        <CategoryForm />
      </div>

      {props.children}
    </div>
  );
}
