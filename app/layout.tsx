import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import CartProvider from "./contexts/CartContext";

import {SessionProvider} from "next-auth/react";
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
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 mt-20">{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
