import { auth, signIn } from '@/auth';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './cartIcon';
import GuestHeader from './header/GuestHeader';
import Logo from './ui/logo';

export default async function Navbar() {
  const session = await auth();

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

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
            <div className='lg:flex lg:flex-1 lg:justify-end gap-4'>
              {session?.user ? (
                'I am logged in!'
              ) : (
                <form action='submit'>
                  <button onClick={() => signIn()}>Sign in</button>
                </form>
              )}
              {/* {user ? (
                <DropdownMenu user={user} />
              ) : (
                <Link
                  href='/login'
                  className=' flex justify-between items-center bg-black border border-white gap-4  font-normal leading-6 text-white transition-all text-md hover:text-gray-300  px-3 py-1 rounded-lg'
                >
                  Login
                  <ArrowRightIcon className=' size-5 hover:translate-x-1 transition-all' />
                </Link>
               
              )} */}
            </div>
          )}
          <Link data-cy='cart-link' href={'/checkout'}>
            <CartIcon />
          </Link>
          <div className='md:hidden'>
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='focus:outline-none'
            >
              {isMenuOpen ? (
                <XIcon data-cy='menu-close-icon' width={24} height={24} />
              ) : (
                <MenuIcon data-cy='menu-open-icon' width={24} height={24} />
              )}
            </button> */}
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
