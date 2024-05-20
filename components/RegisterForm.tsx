'use client';
import { registerUser } from '@/app/actions/user';
import { UserCreate, UserCreateSchema } from '@/app/zodSchemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const form = useForm<UserCreate>({
    resolver: zodResolver(UserCreateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserCreate) => {
    await registerUser(data);
    form.reset();
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
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2'>
          <div className='col-span-1 sm:col-span-2'>
            <input
              {...form.register('email')}
              type='email'
              placeholder='Email'
              className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='col-span-1 sm:col-span-2'>
            <input
              {...form.register('password')}
              type='password'
              placeholder='Password'
              className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {errors.password && (
              <span className='text-red-500 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...form.register('firstName')}
              type='text'
              placeholder='First Name'
              className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {errors.firstName && (
              <span className='text-red-500 text-sm'>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...form.register('lastName')}
              type='text'
              placeholder='Last Name'
              className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {errors.lastName && (
              <span className='text-red-500 text-sm'>
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className='col-span-1 sm:col-span-2'>
            <input
              {...form.register('phoneNumber')}
              type='text'
              placeholder='Phone Number'
              className='block w-full rounded-md bg-gray-800 text-white border border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {errors.phoneNumber && (
              <span className='text-red-500 text-sm'>
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>
        <button className='mt-6 block w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
          Register
        </button>
      </form>
      <div className='text-gray-200 mt-5 flex justify-center'>
        Already have an account?
        <Link
          href='/login'
          className='text-indigo-600 hover:text-indigo-500 font-semibold hover:underline ml-4'
        >
          Login now
        </Link>
      </div>
    </div>
  );
}
