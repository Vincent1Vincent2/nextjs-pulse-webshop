import ProductList from "@/components/ProductList";

interface PageProps {
  params: {slug: string};
}

export default async function CategoryPage({params}: PageProps) {
  return <ProductList slug={params.slug} />;
}
