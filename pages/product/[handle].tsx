import Layout from "../../layouts/Main";
import Gallery from "components/page-specific/product/gallery";
import dynamic from "next/dynamic";
import { productsService } from "services";
import ProductInformation from "components/page-specific/product/product-information";
import { useEffect, useState } from "react";
import Meta from "components/meta";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
const Content = dynamic(
  () => import("components/page-specific/product/content"),
  { ssr: false }
);

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;

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

  return productsService
    .getProduct({ slug: query.handle, subDomain: sub })
    .then((data) => {
      data["thumb"]  = data.Product_Images.map((p)=>p.src)
      data["images"] = data.Product_Images.map((p) => {
        return { src: p.src, product_id: p.id };
      });
      if (data.Product_Variants.length > 0) {
        data.Product_Variants.map((p) => {
          p.image_url &&
            data["images"].push({
              src: p.image_url,
              variant_id: p.id,
              product_id: p.product_id,
            });
        });
      }

      if (data && data.ThemeLayout && data.ThemeLayout.setting) {
        data.ThemeLayout.setting =
          typeof data.ThemeLayout.setting == "string"
            ? JSON.parse(data.ThemeLayout.setting)
            : data.ThemeLayout.setting;
      }
      if (data.Product_Options && data.Product_Options.length > 0) {
        data.Product_Options = data.Product_Options.map((options) => {
          options.values =
            typeof options.values == "string"
              ? JSON.parse(options.values)
              : options.values;
          return options;
        });
      }
      const newObject = {
        title: data.Product_Extra?.meta_title,
        description: data.Product_Extra?.meta_description,
        url: data.Product_Extra?.meta_url,
      };
      return { props: { product: data, metaData: newObject } };
    })
    .catch((err) => {
      console.log("err", err);
      return { props: { product: null, metaData: null, error: err.message } };
    });
}

const Product = ({ product, metaData, error }) => {
  const router = useRouter();
  const { storeData } = useSelector((state: RootState) => state.store);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  useEffect(() => {
    if (error) {
      toast.notify(error, {
        type: "error",
        autoDismiss: true,
      });
      router.push("/products");
    }
  }, []);

  return (
    <Layout>
      {metaData ? (
        <Meta
          data={[
            {
              type: "title",
              content: metaData.title
                ? metaData.title + " - " + storeData?.store_detail?.name
                : product &&
                  product.title + " - " + storeData?.store_detail?.name,
            },
            { type: "description", content: metaData.description },
            { type: "og:site_name", content: storeData?.store_detail?.name },
            {
              type: "og:url",
              content: "",
            },
            {
              type: "og:title",
              content: metaData.title,
            },
            {
              type: "og:type",
              content: "website",
            },
            {
              type: "og:description",
              content: metaData.description,
            },
            {
              type: "og:image",
              content: "",
            },
            {
              type: "og:image:secure_url",
              content: "",
            },
            {
              type: "og:image:width",
              content: "1200",
            },
            {
              type: "og:image",
              content: "628",
            },

            { type: "twitter:title", content: metaData.title },
            { type: "twitter:card", content: metaData.title },
            { type: "twitter:description", content: metaData.title },
          ]}
        />
      ) : null}
      {product ? (
        <>
          <section className="product-page">
            <div className="pp-container">
              <div className="product-page__content">
                <Gallery
                  images={product?.images}
                  activeSlideIndex={activeSlideIndex}
                />
                <Content
                  product={product}
                  setActiveSlideIndex={setActiveSlideIndex}
                />
              </div>
              {product?.ThemeLayout && product.ThemeLayout.setting && (
                <ProductInformation
                  productSetting={product.ThemeLayout.setting}
                />
              )}
            </div>  
          </section>
        </>
      ) : null}
    </Layout>
  );
};

export default Product;
