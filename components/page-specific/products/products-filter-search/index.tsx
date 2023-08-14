import React from "react";
import { useRouter } from "next/router";
import IcSearchArrowRight from "assets/icons/IcSearchArrowRight";

const ProductFilterSearch = ({
  search,
  productFilter,
  setProductFilter,
  searchproduct,
  setSearchProducts,
  total,
}) => {
  const router = useRouter();
  return (
    <div className="pp-container products-page__main__filter-search">
      <div className="filter-search__form-search">
        <input
          placeholder="Type to Search"
          type="text"
          name="search_product"
          value={searchproduct}
          onChange={(e) => {
            setSearchProducts(e.target.value);
          }}
        />
        <IcSearchArrowRight
          onClick={(e) => {
            search = searchproduct;
            setProductFilter({
              ...productFilter,
              search: searchproduct,
              page: 1,
            });
            router.push("/search?search=" + searchproduct, undefined, {
              shallow: true,
            });
          }}
          className="search-form__submit"
        />
      </div>
      <div className="filter-search__result-search">
        <h2>
          Showing {total} results for “{productFilter.search}”
        </h2>
      </div>
    </div>
  );
};

export default ProductFilterSearch;
