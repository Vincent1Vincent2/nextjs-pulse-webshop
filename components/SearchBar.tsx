import {searchProducts} from "@/app/actions/product";
import {Product} from "@prisma/client";
import {SearchIcon, XIcon} from "lucide-react";
import {useState} from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const data: Product[] = await searchProducts(query);
      setResults(data);

      console.log("Search results:", data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
    setQuery("");
  };

  return (
    <div className="relative">
      <SearchIcon
        onClick={() => setOpen(!open)}
        className="w-6 h-6 text-gray-300 hover:text-gray-100 cursor-pointer transition-all"
      />

      {open && (
        <form
          onSubmit={handleSearch}
          className="absolute top-10 sm:-top-2 -right-40 sm:right-0 w-72"
        >
          <div className="flex items-center justify-between bg-black border border-orange-400 rounded-md shadow-md">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full px-4 py-2 bg-black rounded-md text-white text-sm focus:outline-none"
              placeholder="Search for products..."
            />
            <button
              type="submit"
              className="px-2 py-2 text-gray-300 hover:text-gray-100"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-2 py-2 text-gray-300 hover:text-gray-100"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
