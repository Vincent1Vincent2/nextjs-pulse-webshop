import ProductCard from "@/components/ProductCard";
import {getBestSellingProducts} from "../actions/order";

export default async function Sales() {
  const products = await getBestSellingProducts();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="py-20 text-center text-white text-4xl font-semibold rounded-md">
          Best seller
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl lg:mx-auto mx-5 mt-5">
        {products.map(({id, name, image, price, ...rest}) => (
          <ProductCard
            key={id}
            product={{
              id,
              name,
              image,
              price,
              ...rest,
            }}
          />
        ))}
      </div>
    </>
  );
}
