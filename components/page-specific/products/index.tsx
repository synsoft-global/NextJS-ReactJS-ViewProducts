import ProductsContent from "./products-content";
import ProductsContentScroller from "./products-content-scroller";
import ProductsFilter from "./products-filter";
import ProductFilterSearch from "./products-filter-search";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { productsService } from "services";
import { RootState } from "store";
import { useRouter } from "next/router";
export type productFilterType = {
  availability: string;
  min_price: number;
  max_price: number;
  productType: string[];
  productVendor: string[];
  sortBy: string;
  search?: string;
  page: number;
};

const ProductsMain = ({ data, totalCount, search }) => {
  const [products, setProducts] = useState<any>([...data]);
  const [total, setTotal] = useState<number>(totalCount);
  const [firstTimeLoad, setFirstTimeLoad] = useState<boolean>(true);
  const router = useRouter();
  const { storeData, headerRefHeight } = useSelector(
    (state: RootState) => state.store
  );
  const { query }: any = router;
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setFirstTimeLoad(false);
  }, []);

  const paginationType =
    storeData && storeData.productSetting
      ? storeData.productSetting.value.paginationType
      : "scroller";

  const pageSize = 12;

  // START HANDLE FILTER
  const maxprice = storeData?.maxprice;
  const [productFilter, setProductFilter] = useState<productFilterType>({
    availability: query.availability || "",
    min_price: query.min_price || 0,
    max_price: query.max_price,
    productType: (query.productType && query.productType.split(",")) || [],
    productVendor:
      (query.productVendor && query.productVendor.split(",")) || [],
    sortBy: query.sortBy || "",
    search: search,
    page: query.page || 1,
  });
  const productsRef = useRef<any>(null);
  const executeScroll = () => {
    window.scrollTo({
      left: 0,
      top: productsRef.current.offsetTop - headerRefHeight * 3,
      behavior: "smooth",
    });
  };
  const onChangeFilter = () => {
    // window.scrollTo(0, 0);
    setProductFilter({ ...productFilter, page: 1 });
    debouncedFunctionFilter(handleQueryFilter);
  };

  const debouncedFunctionFilter = useCallback(
    debounce((callback) => {
      callback && typeof callback == "function" && callback();
    }, 500),
    []
  );

  const handleQueryFilter = () => {
    const queryString = Object.keys(productFilter)
      .filter(
        (key: any) =>
          productFilter[key] &&
          !(key === "min_price" && productFilter[key] === 0) &&
          !(key === "max_price" && productFilter[key] === maxprice) &&
          key !== "page" &&
          (typeof productFilter[key] !== "object" ||
            productFilter[key].length > 0)
      )
      .map((key) => {
        return `${encodeURIComponent(key)}=${
          typeof productFilter[key] == "object"
            ? encodeURIComponent(productFilter[key].join(","))
            : encodeURIComponent(productFilter[key])
        }`;
      })
      .join("&");
    router.replace(
      {
        pathname: router.pathname,
        search: `?${queryString}`,
      },
      undefined,
      { scroll: false }
    );
    executeScroll();
  };

  const handleResetFilter = () => {
    setProductFilter({
      availability: "",
      min_price: 0,
      max_price: maxprice,
      productType: [],
      productVendor: [],
      sortBy: "",
      page: 1,
    });
    router.replace({
      pathname: router.pathname,
      search: "",
    });
  };
  // END HANDLE FILTER

  // START HANDLE FILTER SEARCH
  const [searchproduct, setSearchProducts] = useState<any>("");
  useEffect(() => {
    setProducts([...data]);
    setTotal(totalCount);
    setSearchProducts(search);
    setProductFilter({ ...productFilter, search: search, page: 1 });
  }, [search]);
  // END HANDLE FILTER SEARCH

  // START HANDLE GET DATA PRODUCTS
  useEffect(() => {
    if (!firstTimeLoad) {
      debouncedFunction(getProducts);
    }
  }, [JSON.stringify(productFilter)]);

  const getProducts = () => {
    productsService
      .getProducts({
        page: productFilter.page,
        pageSize: pageSize,
        product_type: productFilter?.productType.join(",") || "",
        vendor: productFilter?.productVendor.join(",") || "",
        order: productFilter?.sortBy || undefined,
        availability: productFilter?.availability || undefined,
        min_price: productFilter?.min_price || undefined,
        max_price: productFilter?.max_price || undefined,
        search: productFilter.search || undefined,
        // min_price: 0,
        // max_price: 20,
      })
      .then((data) => {
        const newProduct = data.products.map((item) => {
          item["images"] = item.Product_Images.map((p) => p.src);
          return item;
        });
        if (paginationType === "pagination") {
          setProducts(newProduct);
        } else {
          if (productFilter.page > 1) {
            setTotal(data.total);
            setProducts([...products, ...newProduct]);
          } else {
            setTotal(data.total);
            setProducts([...newProduct]);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const fetchMoreData = () => {
    setisLoading(true);
    if (Math.ceil(total / 10) >= productFilter.page) {
      setProductFilter({ ...productFilter, page: productFilter.page + 1 });
    }
    setisLoading(false);
  };

  const hasMoreData = () => {
    if (products.length == 0 && total === 0) {
      return false;
    } else if (products.length === total) {
      return false;
    } else {
      return true;
    }
  };

  const debouncedFunction = useCallback(
    debounce((callback) => {
      callback && typeof callback == "function" && callback();
    }, 500),
    []
  );
  // END HANDLE GET DATA PRODUCTS

  return (
    <div className="products-page__main" ref={productsRef}>
      {router.pathname === "/search" ? (
        <ProductFilterSearch
          search={search}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
          searchproduct={searchproduct}
          setSearchProducts={setSearchProducts}
          total={total}
        />
      ) : null}

      <div className="pp-container products-page__main__wrapper">
        <ProductsFilter
          //onChangeFilter={debouncedFunction}
          onChangeFilter={onChangeFilter}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
          handleResetFilter={handleResetFilter}
          maxprice={maxprice}
        />

        {products ? (
          paginationType === "scroller" ? (
            <ProductsContentScroller
              products={products}
              fetchMoreData={fetchMoreData}
              hasMoreData={hasMoreData}
            />
          ) : (
            <ProductsContent
              products={products}
              total={total}
              page={productFilter.page}
              setpage={(page) => {
                setProductFilter({ ...productFilter, page });
              }}
              fetchMoreData={fetchMoreData}
              paginationType={paginationType}
              isLoading={isLoading}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default ProductsMain;
