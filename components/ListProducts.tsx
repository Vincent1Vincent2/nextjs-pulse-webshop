'use client';
import { useProducts } from '@/app/contexts/ProductContext';
import { Product } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

function ListProducts() {
  const { products: isProducts } = useProducts(); //
  return (
    <div className=' md:grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {isProducts.map((product: Product) => (
        <Card key={product.id} className='flex flex-col' data-cy='product'>
          <CardHeader>
            <CardTitle className='flex justify-center' data-cy='product-title'>
              {product.title}
            </CardTitle>
          </CardHeader>
          <div className='flex-1'></div>
          <Link href={`/product/${product.id}`}>
            <CardContent className='flex justify-center'>
              <Image
                src={product.image}
                alt='product image'
                width={150}
                height={150}
              />
            </CardContent>
          </Link>
          <div className='flex-1'></div>
          <CardFooter className='flex justify-between items-center'>
            <CardDescription data-cy='product-price'>
              $ {product.price}
            </CardDescription>

            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ListProducts;
