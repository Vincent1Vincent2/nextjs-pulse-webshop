import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CartProvider from './contexts/CartContext';
import ConfirmProvider from './contexts/ConfirmContext';
import ProductProvider from './contexts/ProductContext';
import './globals.css';
import { LayoutProps } from './types';

const inter = Inter({ subsets: ['latin'] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: 'Webshop',
  description: 'Your favorite products online for a good price...',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <CartProvider>
          <ProductProvider>
            <ConfirmProvider>
              <main className=' flex-1'>
                <Navbar />
                {children}
              </main>
              <Footer />
              <Toaster />
            </ConfirmProvider>
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
