'use client';

import { authenticateUser } from '@/app/actions/authenticate';
import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartIcon from './CartIcon';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import GuestHeader from './header/GuestHeader';
import { AuthUser } from './header/Header';
import Logo from './ui/logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      const userAuthenticated = await authenticateUser();
      setUser(userAuthenticated);
      setIsLoading(false);
    }
    fetchAuth();
  }, []);

  console.log('Navbar user:', user?.admin);

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
          <GuestHeader />
          {/* <CategoriesDropdown /> */}
          <Link href='/' className='text-white hover:text-gray-300'>
            Best Sellers
          </Link>
          <Link href='/' className='text-white hover:text-gray-300'>
            Join Our Club
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          {/* <DropdownMenu /> */}
          {isLoading ? (
            <div className='bg-black p-4 '></div>
          ) : (
            <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-4'>
              {user ? (
                <DropdownMenu user={user} />
              ) : (
                <Link
                  href='/login'
                  className=' flex justify-between items-center bg-[#DA2222] gap-4  font-normal leading-6 text-white transition-all text-md hover:text-gray-300  px-3 py-1 rounded-lg'
                >
                  Login
                  <ArrowRightIcon className=' size-5 hover:translate-x-1 transition-all' />
                </Link>
              )}
            </div>
          )}
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
          <GuestHeader />
          {/* <CategoriesDropdown /> */}
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
