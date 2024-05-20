import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function CategoriesDropdown() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <MenuButton>Categories</MenuButton>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='absolute sm:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <MenuItem>
              <Link
                href='#'
                className='hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm'
              >
                Item 1
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href='#'
                className='hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm'
              >
                Item 2
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href='/admin'
                className='hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm'
              >
                Item 3
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href='#'
                className='hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm'
              >
                Item 4
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
