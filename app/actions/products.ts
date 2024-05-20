'use server';
import { db } from '@/prisma/db';
import { ProductCreate } from '../zodSchemas/product';

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
