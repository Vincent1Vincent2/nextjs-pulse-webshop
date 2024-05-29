import SignOutUser from "@/app/actions/user";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {Fragment} from "react";

export default function DropdownMenu({session}: {session: any}) {
  const isAdmin = session?.user.isAdmin;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>
        {/* <UserCog2Icon width={33} height={33} /> */}
        <div className="relative h-10 w-10">
          <Image
            className="h-full w-full rounded-full object-cover object-center m-1"
            src="/profile-img.jpg"
            alt="user-image"
            height={40}
            width={40}
          />
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute -right-20 z-10 mt-5 w-56 origin-top-right rounded-sm bg-stone-900/90  ">
          <div className="py-1">
            <MenuItem>
              <Link
                href="#"
                className="hover:bg-stone-800 text-white block px-4 py-2 text-sm"
              >
                Account settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={"/userOrders"}
                className="hover:bg-stone-800 text-white block px-4 py-2 text-sm"
              >
                Order History
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="#"
                className="hover:bg-stone-800 text-white block px-4 py-2 text-sm"
              >
                Wish List
              </Link>
            </MenuItem>
            {isAdmin && (
              <MenuItem>
                <Link
                  href="/admin"
                  className="hover:bg-stone-800 text-white block px-4 py-2 text-sm"
                >
                  Admin Dashboard
                </Link>
              </MenuItem>
            )}
            <MenuItem>
              <form action={SignOutUser}>
                <button className="bg-stone-800 hover:bg-stone-600 text-white block px-4 py-2 text-sm w-full text-left">
                  Sign Out
                </button>
              </form>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
