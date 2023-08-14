import ProductsCarousel from "./carousel";
import { productsService } from "services";
import { useEffect, useState } from "react";
import Link from "next/link";
import IcLongArrowRight from "assets/icons/IcLongArrowRight";

const ProductsFeatured = () => {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    //setLoading(true);
    productsService
      .getProducts({})
      .then((data) => {
        data.products = data.products.map((item) => {
          item["images"] = item.Product_Images.map((p) => p.src);
          return item;
        });
        setProducts(data.products);
        //setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        //setLoading(false);
      });
  }, []);
  return (
    <>
      {products && products.length > 0 ? (
        <section className="products-featured">
          <div className="pp-container">
            <header className="products-featured__header">
              <h3>You may also like</h3>
              <Link href="/products" className="button btn-view-all">
                View All <IcLongArrowRight />
              </Link>
            </header>

            <ProductsCarousel products={products} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ProductsFeatured;
