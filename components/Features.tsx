import {BadgeCheckIcon, StarIcon, TruckIcon} from "lucide-react";

export default function Features() {
  return (
    <div className=" hidden sm:block sm:sticky top-24 w-full left-0 bg-gradient-to-r from-orange-500 to-black-500 py-2 z-40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around items-center text-white">
        <FeatureItem
          icon={<TruckIcon className="h-6 w-6" />}
          text="Free delivery on multi-Buys"
        />
        <FeatureItem
          icon={<BadgeCheckIcon className="h-6 w-6" />}
          text="Money Back Guarantee"
        />
        <FeatureItem
          icon={<StarIcon className="h-6 w-6" />}
          text="Five Star Independent Reviews"
        />
      </div>
    </div>
  );
}

function FeatureItem({icon, text}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}
