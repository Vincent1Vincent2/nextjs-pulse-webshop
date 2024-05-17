// import CartIcon from '@/components/cartIcon';
// import Logo from '@/components/ui/logo';
// import { Toaster } from '@/components/ui/toaster';
// import { UserCog2Icon } from 'lucide-react';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Link from 'next/link';
// import CartProvider from './contexts/CartContext';
// import ConfirmProvider from './contexts/ConfirmContext';
// import ProductProvider from './contexts/ProductContext';
// import './globals.css';
// import { LayoutProps } from './types';

// const inter = Inter({ subsets: ['latin'] });

// /* Beskriv din hemsida för sökmotorerna */
// export const metadata: Metadata = {
//   title: 'Webshop',
//   description: 'Your favorite products online for a good price...',
// };

// export default function RootLayout({ children }: LayoutProps) {
//   return (
//     <html lang='en'>
//       <body className={inter.className}>
//         <CartProvider>
//           <ProductProvider>
//             <ConfirmProvider>
//               <header className='bg-black flex justify-between text-white items-center p-4'>
//                 <div className='flex gap-4 items-center'>
//                   <Link href={'/'}>
//                     <Logo />
//                   </Link>
//                   <Link href={'/'} className='text-3xl font-bold'>
//                     Pulse
//                   </Link>
//                 </div>
//                 <div className=' text-center space-x-14 p-4'>
//                   <Link href={'/'} className=' text-white'>
//                     Shop
//                   </Link>
//                   <Link href={'/'} className=' text-white'>
//                     Categories
//                   </Link>
//                   <Link href={'/'} className=' text-white'>
//                     Best Sellers
//                   </Link>
//                   <Link href={'/'} className=' text-white'>
//                     Join Our Club
//                   </Link>
//                 </div>
//                 <div className='flex justify-center items-center gap-5'>
//                   <Link href={'/admin'}>
//                     <UserCog2Icon data-cy='admin-link' width={33} height={33} />
//                   </Link>
//                   <Link data-cy='cart-link' href={'/checkout'}>
//                     <CartIcon />
//                   </Link>
//                 </div>
//               </header>
//               {children}
//               <footer className='bg-black pt-2 pb-2 flex justify-center'>
//                 <span className='text-sm text-gray-500 sm:text-center'>
//                   © Pulse {new Date().getFullYear()}. All Rights Reserved.
//                 </span>
//               </footer>
//               <Toaster />
//             </ConfirmProvider>
//           </ProductProvider>
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

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
