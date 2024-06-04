import {getProductsByCategoryAndSort} from "@/app/actions/product";
import {getCategoryBySlug, getCategories} from "@/app/actions/category";
import ProductList from "@/components/ProductList";

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
