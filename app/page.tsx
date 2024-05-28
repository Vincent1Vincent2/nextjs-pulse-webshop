import Banner from "@/components/Banner";
import CategoryCards from "@/components/CategoryCards";
import Features from "@/components/Features";
import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  return (
    <div className=" w-full -mt-20">
      <div className="relative h-screen">
        <Features />
        <video
          className="absolute -top-20 md:-top-10 left-0 w-full h-full object-cover "
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
        >
          <source src="/homePage.mp4" type="video/mp4" />
        </video>

        <div className="absolute -top-28 sm:-top-20 md:top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col items-start text-center sm:text-left w-full text-white px-8 md:px-40 mt-44 md:mt-0 py-20 md:py-56">
            <h1 className=" text-2xl sm:text-3xl md:text-5xl font-bold max-w-md md:max-w-2xl">
              Elevate Your Performance with Pulse
            </h1>
            <button className="bg-black sm:bg-transparent mt-8 md:mt-16 border border-orange-400 text-orange-400 rounded-md px-4 py-2 w-48 hover:bg-slate-900/65 hover:text-orange-300 self-center sm:self-start">
              Shop now
            </button>
          </div>
        </div>
      </div>
      <PromoBanner />
      <CategoryCards />
      <Banner />
    </div>
  );
}
