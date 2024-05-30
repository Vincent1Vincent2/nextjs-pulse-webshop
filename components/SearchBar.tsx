import {SearchIcon, XIcon} from "lucide-react";
import {useState} from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {};

  return (
    <div className="relative">
      <SearchIcon
        onClick={() => setOpen(!open)}
        className="w-6 h-6 text-gray-300 hover:text-gray-100 cursor-pointer transition-all"
      />

      {open && (
        <div className="absolute top-10 sm:-top-2 -right-20 sm:right-0 w-72">
          <div className="flex items-center justify-between bg-black border border-orange-400 rounded-md shadow-md">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full px-4 py-2 bg-black rounded-md text-white text-sm focus:outline-none"
              placeholder="Search for products..."
            />
            <button
              onClick={() => setOpen(false)}
              className="px-2 py-2 text-gray-300 hover:text-gray-100"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
