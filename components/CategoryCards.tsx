export default function CategoryCards() {
    const categories = [
        { id: 1, name: "Supplaments" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Equipments" },
        { id: 4, name: "Pre-Workout" },
        { id: 5, name: "Post-Workout" },
        { id: 6, name: "Muscle Support" },
      ];
    return (
        //text-3xl md:text-5xl font-bold max-w-md md:max-w-2xl leading-loose
        <div className="bg-black h-[350px] py-10">
        <div className="text-white flex justify-center text-2xl font-bold">Shop By Category</div>
        <div className="flex justify-evenly items-center gap-50 px-8 py-10">
          {categories.map((category) => (
            <button
              key={category.id}
              className="border border-orange-400 text-orange-400 rounded-md px-4 py-2 w-48  transform h-40 w-40   transition duration-500 hover:scale-125 flex justify-center items-center rounded-md"
            >
              <span className="text-lg font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  