import ProductCard from "components/shared/product-card/";
import IllustNotFound from "assets/images/IllustNotFound";

const ProductsList = ({ data, collectionVendor = true }) => {
  return (
    <>
      {data && data.length > 0 ? (
        <section className={`products-list `}>
          {data.map((item, index) => (
            <ProductCard
              id={item.id}
              title={item.title}
              handle={item.handle || "test-product-namwe"}
              discount={item.item?.discount || null}
              priceHtml={item.item?.priceHtml || 0.0}
              specialPriceHtml={item.item?.specialPriceHtml || 0.0}
              key={`products-list-${item.id}-${index}`}
              images={item.images[0] || ""}
              quantity={item?.totalQuantity || 0}
              vendor={item?.vendor || null}
              collectionVendor={collectionVendor}
              trackQuantity={item.item.track_qty}
            />
          ))}
        </section>
      ) : (
        <section className="products-list products-list--not-found">
          <IllustNotFound />
          <p>No products here</p>
        </section>
      )}
    </>
  );
};

export default ProductsList;
