import {MailIcon, PhoneIcon} from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/athletic-person-exercising-working-out_23-2150989827.jpg?t=st=1716672902~exp=1716676502~hmac=9e2ab1d401edae9b96557b40694a127864dcdf866de93fc3265d32bd8f3db39a&w=1380')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between space-y-20 ">
        <div className="text-white px-8">
          <h1 className="text-4xl font-extrabold mb-4">GET THE DEALS</h1>
          <p className="mb-8">
            Sign up for Special Offers, Workout & Recipe Ideas
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-2 bg-white rounded-sm ">
            <div className="flex items-center space-x-2 px-4 py-4 sm:py-0">
              <MailIcon className="size-4 md:size-6 text-gray-500" />
              <input
                type="email"
                placeholder="Email address"
                className="focus:outline-none text-black"
              />
            </div>
            <div className="flex items-center space-x-2 px-4 sm:py-0">
              <PhoneIcon className="size-4 md:size-6 text-gray-500" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="focus:outline-none text-black "
              />
            </div>
            <button className=" bg-orange-500 text-white md:px-6 py-2 md:py-3 rounded-b-sm sm:rounded-l-none sm:rounded-r-sm">
              Sign Up
            </button>
          </div>
        </div>

        <div className="size-56">
          <Image
            width={100}
            height={100}
            src="https://cdn.mmsports.se/resized/medium-2x/P/XLNT-Recovery-Passionfruit-3Pack-221216.jpg"
            alt="Product"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
