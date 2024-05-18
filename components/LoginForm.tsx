'use client';
import { loginUser } from '@/app/actions/user';
import { UserLogin, UserLoginSchema } from '@/app/zodSchemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const form = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserLogin) => {
    await loginUser(data);
    form.reset();
    location.reload();
  };

  return (
    <div className='isolate bg-black px-6 py-2 sm:py-32 lg:px-8 my-28 sm:my-0'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-xl font-normal tracking-tight text-white sm:text-4xl'>
          Welcome to Pulse
        </h2>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='mx-auto mt-14 max-w-xl sm:w-96'
      >
        <div className='mt-2.5'>
          <input
            {...form.register('email')}
            type='text'
            placeholder='Email'
            className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4'
          />
          {errors.email && (
            <span className='text-red-500 text-sm mt-1 block'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='relative mt-2.5'>
          <input
            {...form.register('password')}
            type='password'
            placeholder='Password'
            className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4'
          />
          {errors.password && (
            <span className='text-red-500 text-sm mt-1 block'>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className='mt-10'>
          <button className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            Sign in
          </button>
          <div className='text-gray-200 mt-5 flex justify-center'>
            Don&apos;t have an account?
            <Link
              href='/register'
              className='text-indigo-600 hover:text-indigo-500 font-semibold hover:underline ml-2'
            >
              Sign up now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
