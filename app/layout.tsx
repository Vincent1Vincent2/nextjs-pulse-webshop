import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import CartProvider from "./contexts/CartContext";
import {CategoryProvider} from "./contexts/CategoryContext";

import "./globals.css";
import {LayoutProps} from "./types";

const inter = Inter({subsets: ["latin"]});

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webshop",
  description: "Your favorite products online for a good price...",
};

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col bg-gradient-to-r from-violet-900 to-slate-900 ${inter.className}`}
      >
        <CartProvider>
          <CategoryProvider>
            <main className=" flex-1 ">
              <Navbar />
              {children}
            </main>
          </CategoryProvider>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
