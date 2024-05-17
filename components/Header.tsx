'use client';

import { MenuIcon, UserCog2Icon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './cartIcon';
import Logo from './ui/logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <header className='bg-black flex justify-between items-center p-4 text-white'>
        <div className='flex gap-4 items-center'>
          <Link href={'/'}>
            <Logo />
          </Link>
          <Link href={'/'} className='text-3xl font-bold'>
            Pulse
          </Link>
        </div>
        <div className='hidden md:flex flex-1 justify-center space-x-14'>
          <Link href='/' className='text-white hover:text-gray-300'>
            Shop
          </Link>
          <Link href='/' className='text-white hover:text-gray-300'>
            Categories
          </Link>
          <Link href='/' className='text-white hover:text-gray-300'>
            Best Sellers
          </Link>
          <Link href='/' className='text-white hover:text-gray-300'>
            Join Our Club
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          <Link href={'/admin'}>
            <UserCog2Icon data-cy='admin-link' width={33} height={33} />
          </Link>
          <Link data-cy='cart-link' href={'/checkout'}>
            <CartIcon />
          </Link>
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='focus:outline-none'
            >
              {isMenuOpen ? (
                <XIcon data-cy='menu-close-icon' width={24} height={24} />
              ) : (
                <MenuIcon data-cy='menu-open-icon' width={24} height={24} />
              )}
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <nav className='md:hidden bg-black text-white p-4 flex flex-col space-y-4'>
          <Link href='/' className='text-white'>
            Shop
          </Link>
          <Link href='/' className='text-white'>
            Categories
          </Link>
          <Link href='/' className='text-white'>
            Best Sellers
          </Link>
          <Link href='/' className='text-white'>
            Join Our Club
          </Link>
        </nav>
      )}
    </div>
  );
}
