import Header from '@/components/Header';
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
      <body className={inter.className}>
        <CartProvider>
          <ProductProvider>
            <ConfirmProvider>
              <Header />
              {children}
              <footer className='bg-black pt-2 pb-2 flex justify-center'>
                <span className='text-sm text-gray-500 sm:text-center'>
                  © Pulse {new Date().getFullYear()}. All Rights Reserved.
                </span>
              </footer>
              <Toaster />
            </ConfirmProvider>
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
