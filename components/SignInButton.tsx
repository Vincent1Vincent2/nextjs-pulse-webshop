'use client';
import { ArrowRightIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SingInButton() {
  return (
    <button
      onClick={() => signIn()}
      className=' flex justify-between items-center bg-black border border-white gap-4  font-normal leading-6 text-white transition-all md:text-md hover:text-gray-300 px-2 py-1  md:px-3 md:py-2 rounded-lg'
    >
      <p>Sign In</p>
      <ArrowRightIcon className=' size-5 hover:translate-x-1 transition-all' />
    </button>
  );
}
