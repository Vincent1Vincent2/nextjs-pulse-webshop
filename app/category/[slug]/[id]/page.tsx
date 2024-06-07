// Import necessary functions and components

import {getCategories} from "@/app/actions/category";
import {getProductsByCategoryAndSort} from "@/app/actions/product";
import {getCategoryBySlug, getCategories} from "@/app/actions/category";
import ProductList from "@/components/ProductList";

// Function to generate static parameters for dynamic routes
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(category => ({
    slug: category.slug, // Ensure 'slug' is the correct key for your category identifier
    id: category.id.toString(),
  }));
}

interface PageProps {
  params: {slug: string};
}

export default async function CategoryPage({params}: PageProps) {
  const {slug} = params;
  const [products, category, categories] = await Promise.all([
    getProductsByCategoryAndSort(slug, "asc"),
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <ProductList
      products={products}
      currentCategory={category}
      categories={categories}
    />
  );
}
