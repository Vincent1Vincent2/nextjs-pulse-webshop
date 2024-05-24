import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  return (
    <div className=" w-full">
      <div className="relative h-screen">
        <video
          className="absolute md:-top-10 left-0 w-full h-full object-cover "
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2017/01/12/7251-199191069_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col items-start text-left w-full text-white px-8 md:px-40 mt-44 md:mt-0 py-20 md:py-56">
            <h1 className="text-3xl md:text-6xl font-bold max-w-md md:max-w-4xl leading-loose">
              Elevate Your Performance with Pulse
            </h1>
            <button className="mt-8 md:mt-16 bg-orange-500 text-white px-4 py-2 w-48">
              Shop now
            </button>
          </div>
        </div>
      </div>
      <PromoBanner />
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            More Content Section / Categories
          </h2>
        </div>
      </div>
    </div>
  );
}
