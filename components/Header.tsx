"use client";

import {MenuIcon, XIcon} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import DropdownMenu from "./DropdownMenu";
import SignInButton from "./SignInButton";
import CartIcon from "./cartIcon";
import GuestHeader from "./header/GuestHeader";
import Logo from "./ui/logo";

export default function Header({session}: {session: any}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`fixed z-50 w-full flex justify-between items-center p-4 text-white md:px-10 transition-all duration-300 ${
          isScrolled ? "bg-black/80" : "bg-transparent"
        }`}
      >
        <div className="flex gap-4 items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          <Link href={"/"} className="text-3xl font-bold">
            Pulse
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center space-x-14">
          <Link href="/" className="text-white hover:text-gray-300">
            Shop
          </Link>
          <GuestHeader />
          <Link href="/" className="text-white hover:text-gray-300">
            Best Sellers
          </Link>
          <Link href="/" className="text-white hover:text-gray-300">
            Join Our Club
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {session ? <DropdownMenu session={session} /> : <SignInButton />}
          <Link data-cy="cart-link" href={"/checkout"}>
            <CartIcon />
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon data-cy="menu-close-icon" width={24} height={24} />
              ) : (
                <MenuIcon data-cy="menu-open-icon" width={24} height={24} />
              )}
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <nav className=" md:hidden text-white p-4 flex flex-col space-y-8">
          <Link href="/" className="text-white mt-20">
            Shop
          </Link>
          <GuestHeader />
          <Link href="/" className="text-white">
            Best Sellers
          </Link>
          <Link href="/" className="text-white">
            Join Our Club
          </Link>
        </nav>
      )}
    </div>
  );
}
