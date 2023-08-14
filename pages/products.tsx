import ImageTextOverlay from "components/theme-block/image-text-overlay";
import ProductsMain from "components/page-specific/products";
import { useEffect, useState } from "react";
import { productsService } from "services";
import Layout from "../layouts/Main";

const pageSize = 12;
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;
  const search = query?.search || "";
  let sub;
  if (context?.req) {
    if (context.req?.headers?.host) {
      let host = context.req?.headers?.host; // will give you localhost:3000
      const subDomain = host?.split(".");
      if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
        sub = subDomain[0];
      }
    }
  }
  const data = await productsService.getProducts({
    page: 1,
    pageSize,
    search,
    subDomain: sub,
    availability: query.availability,
    min_price: query.min_price,
    product_type: query.productType,
    vendor: query.productVendor,
    max_price: query.max_price,
    order: query.sortBy,
  });

  const newProduct = data.products.map((item) => {
    item["images"] = item.Product_Images.map((p) => p.src);
    return item;
  });

  const themeDataS = await productsService.getThemeData({
    params: "products",
    sub,
  });
  return {
    props: {
      data: newProduct,
      totalCount: data.total,
      search: search,
      themeDataS: themeDataS?.ThemeLayouts[0]?.setting[0] || {},
    },
  };
}

const Products = ({ data, totalCount, search, themeDataS }) => {
  const [productSetting, setProductSetting] = useState<any>(themeDataS);
  const arrayComponentHeaderColorWhite = ["Slideshow", "ImageTextOverlay"];
  const [headerColor, setHeaderColor] = useState<any>("white");
  const tags: any = [];

  useEffect(() => {
    if (tags.length) {
      if (arrayComponentHeaderColorWhite.includes(tags[0].section.id)) {
        setHeaderColor("white");
      }
    }
  }, []);

  return (
    <Layout
      metaData={{ store_name: "Product Store" }}
      customClassnameMain={`products-page ${
        headerColor === "white" ? "main-page--pt-0" : ""
      }`}
      headerColor={headerColor}
    >
      <ImageTextOverlay data={productSetting} />
      <ProductsMain data={data} totalCount={totalCount} search={search} />
    </Layout>
  );
};

export default Products;
