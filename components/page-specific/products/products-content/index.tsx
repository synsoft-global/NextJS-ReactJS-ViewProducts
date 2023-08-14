import ButtonCustom from "components/shared/button-custom";
import ProductsList from "../products-list";
import Pagination from "./pagination";
const ProductsContent = (props) => {
  const {
    products,
    total,
    page,
    setpage,
    fetchMoreData,
    paginationType,
    collectionVendor = true,
    isLoading,
  } = props;
  return (
    <section className="products-content">
      <ProductsList
        data={products}
        collectionVendor={collectionVendor}
      />

      {paginationType === "pagination" && total > 0 ? (
        <Pagination
          total={total}
          page={page}
          setpage={setpage}
          fetchMoreData={fetchMoreData}
        />
      ) : paginationType === "loadmore" && products.length != total ? (
        <div className="product-content__loadmore">
          <ButtonCustom onClick={fetchMoreData} loading={isLoading}>
            Load More
          </ButtonCustom>
        </div>
      ) : null}
    </section>
  );
};

export default ProductsContent;
