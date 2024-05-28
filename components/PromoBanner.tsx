export default function PromoBanner() {
  return (
    <div className="absolute -bottom-5 sm:bottom-0 w-full bg-gray-900/90 py-2 sm:py-10 text-white">
      <div className=" sm:max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row justify-around items-center text-center space-x-8">
          <div className="flex-1 ml-8">
            <h2 className=" text-sm sm:text-xl font-bold text-teal-300">
              Buy 2, Get 1 Free!
            </h2>
            <p className="mt-2 text-gray-300 text-sm sm:text-lg">
              Plus free shipping on orders over 400 SEK
            </p>
          </div>
          <div className=" sm:border-l border-gray-300 h-8 sm:h-16"></div>
          <div className="flex-1">
            <h2 className=" text-sm sm:text-xl font-bold text-orange-400">
              Pick Up In-Store and Save!
            </h2>
            <p className="mt-2 text-gray-300 text-sm sm:text-lg">
              Save 10% When You Choose In-Store Pick Up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
