import {Facebook, Instagram, LinkedinIcon, MapPinned} from "lucide-react";
import Image from "next/image";

const links = [
  {
    title: "OUR PRODUCTS",
    items: [
      {name: "Acai Detox", href: "#"},
      {name: "Ultra Joint", href: "#"},
      {name: "Probiotic", href: "#"},
      {name: "Omega 3", href: "#"},
      {name: "Moringa", href: "#"},
      {name: "See All", href: "#"},
    ],
  },
  {
    title: "FACTS",
    items: [
      {name: "Products", href: "#"},
      {name: "Guarantee", href: "#"},
      {name: "Safety", href: "#"},
      {name: "FAQ", href: "#"},
      {name: "About", href: "#"},
      {name: "Support", href: "#"},
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 text-white py-12">
      <div className=" max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="text-center lg:text-left">
            <div className="mb-10">
              <Image
                width={70}
                height={70}
                src="/logo-1.svg"
                alt="Pulse Logo"
                className="h-12 mx-auto lg:mx-0"
              />
            </div>
            <p className="mb-4">Lorem ipsum dolor sit amet</p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <Facebook />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <Instagram />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <LinkedinIcon size={24} />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <MapPinned />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start space-x-12">
            {links.map(link => (
              <div key={link.title} className="mb-8 lg:mb-0">
                <h3 className="text-lg font-bold mb-4">{link.title}</h3>
                <ul className="space-y-2">
                  {link.items.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-400 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pulse. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
