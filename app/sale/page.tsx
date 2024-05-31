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
          textDecoration: "underline",
          color: "white",
          fontFamily: "Times New Roman",
          padding: "10px",
        }}
      >
        <h2 className="text-white font-xl mt-5">Best Sellers</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl lg:mx-auto mx-5 mt-5">
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
