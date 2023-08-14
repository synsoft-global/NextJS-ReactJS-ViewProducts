import React, { useEffect, useState } from "react";
import productsService from "services/product.service";
import Default from "./default";
const FeaturedProduct = ({ data, variant = "default" }: any) => {
  const [productDetail, setProductDetail] = useState(data);
  useEffect(() => {
    if (data.data["featured_product.product"]) {
      productsService
        .getProductByID(data.data["featured_product.product"])
        .then((result) => {
          if (result.Product_Options && result.Product_Options.length > 0) {
            result.Product_Options = result.Product_Options.map((options) => {
              options.values =
                typeof options.values == "string"
                  ? JSON.parse(options.values)
                  : options.values;
              return options;
            });
          }
          result["images"] = result.Product_Images.map((p) => p.src);
          result["Product_Images"] = result.Product_Images.map((p) => {
            return { src: p.src, product_id: p.id };
          });

          if (result.Product_Variants.length > 0) {
            result.Product_Variants.map((p) => {
              p.image_url &&
                result["Product_Images"].push({
                  src: p.image_url,
                  variant_id: p.id,
                  product_id: p.product_id,
                });
            });
          }
          console.log("dsds",result["Product_Images"])
          setProductDetail({ ...data, product: result });
        })
        .catch((err) => {
          console.log("err", err);
          //setLoading(false);
        });
    }
  }, []);
  return variant === "default" ? (
    // <Default productDetail={productDetail} data={data} />
    <Default data={productDetail} />
  ) : null;
};

export default FeaturedProduct;
