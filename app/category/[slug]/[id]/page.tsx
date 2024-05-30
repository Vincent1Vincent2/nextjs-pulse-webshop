import {getProductsByCategoryAndSort} from "@/app/actions/product";
import ProductList from "@/components/ProductList";

interface PageProps {
  params: {slug: string};
}

export default async function CategoryPage({params}: PageProps) {
  const products = await getProductsByCategoryAndSort(params.slug, "asc");
  return <ProductList products={products} />;
}
