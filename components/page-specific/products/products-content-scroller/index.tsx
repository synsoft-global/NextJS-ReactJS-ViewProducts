import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductsList from "../products-list";

const ProductsContentScroller = ({ products, fetchMoreData, hasMoreData }) => {
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      style={{ overflow: "hidden" }}
      hasMore={hasMoreData()}
      loader={
        hasMoreData() && (
          <div className="text-center mt-40">
            <h3>Loading...</h3>
          </div>
        )
      }
      endMessage={
        <div className="text-center mt-40">
          {/* <h4>Nothing more to show</h4> */}
        </div>
      }
    >
      <section className="products-content" style={{ overflow: "hidden" }}>
        <ProductsList data={products} />
      </section>
    </InfiniteScroll>
  );
};

export default ProductsContentScroller;
