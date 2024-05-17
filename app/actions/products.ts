'use server';
import { ProductCreate } from '@/app/zodSchemas/product';
import { db } from '@/prisma/db';

export const SaveProduct = async (formData: ProductCreate) => {
  try {
    const product = await db.product.create({
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
      },
    });
    return product;
  } catch (error) {
    console.error('Error saving product:', error);
    throw new Error('Error saving product');
  }
};
