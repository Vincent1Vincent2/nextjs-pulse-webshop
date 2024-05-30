"use client";
import {ArrowRightIcon} from "lucide-react";
import {signIn} from "next-auth/react";
import {usePathname} from "next/navigation";

export default function SingInButton() {
  const pathname = usePathname();
  return (
    <button
      onClick={() => signIn(undefined, {callbackUrl: pathname})}
      className=" flex justify-between items-center bg-black border border-orange-400 gap-4  font-normal leading-6 text-orange-400 transition-all md:text-md hover:text-orange-300  hover:bg-slate-900/65 px-2 py-1  md:px-3 md:py-2 rounded-lg"
    >
      <p>Sign In</p>
      <ArrowRightIcon className=" size-5 hover:translate-x-1 transition-all" />
    </button>
  );
}
