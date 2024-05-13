import CartIcon from "@/components/cartIcon";
import Logo from "@/components/ui/logo";
import { Toaster } from "@/components/ui/toaster";
import { UserCog2Icon } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import CartProvider from "./contexts/CartContext";
import ConfirmProvider from "./contexts/ConfirmContext";
import ProductProvider from "./contexts/ProductContext";
import "./globals.css";
import { LayoutProps } from "./types";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webshop",
  description: "Your favorite products online for a good price...",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ProductProvider>
            <ConfirmProvider>
              <header className="bg-black flex justify-between text-white items-center p-4">
                <div className="flex gap-4 items-center">
                  <Link href={"/"}>
                    <Logo />
                  </Link>
                  <h1 className="text-2xl">Premium Drinks</h1>
                </div>
                <div className="flex-1"></div>
                <Link href={"/admin"}>
                  <UserCog2Icon data-cy="admin-link" width={33} height={33} />
                </Link>
                <Link data-cy="cart-link" href={"/checkout"}>
                  <CartIcon />
                </Link>
              </header>
              {children}
              <footer className="bg-black text-white pt-2 pb-2 flex justify-center">
                <p>Backtick © 2024</p>
              </footer>
              <Toaster />
            </ConfirmProvider>
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
