'use client';

import { SaveProduct } from '@/app/actions/products';
import { ProductCreate, ProductCreateSchema } from '@/app/zodSchemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ProductCreate) => {
    await SaveProduct(data);
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex flex-col gap-2'
    >
      <input {...register('name')} placeholder='Name' />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register('description')} placeholder='Description' />
      {errors.description && <span>{errors.description.message}</span>}
      <input {...register('price')} placeholder='Price' />
      {errors.price && <span>{errors.price.message}</span>}
      <input {...register('image')} placeholder='Image URL' />
      {errors.image && <span>{errors.image.message}</span>}
      <button type='submit'>Save</button>
    </form>
  );
}
