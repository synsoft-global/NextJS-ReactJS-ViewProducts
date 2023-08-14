import React, { useEffect, useState } from "react";
import RichText from "../../../theme-block/rich-text";
import CustomContent from "../../../theme-block/custom-content";
import ImageTextOverlay from "../../../theme-block/image-text-overlay";

const ProductInformation = ({ productSetting }) => {
  const [views, setViews] = useState<any>([]);
  const mainPage = "";

  const components: any = {
    CustomContent: CustomContent,
    ImageTextOverlay: ImageTextOverlay,
    RichText: RichText,
  };

  useEffect(() => {
    const tags: any = [];
    productSetting &&
      productSetting &&
      productSetting.map((section: any) => {
        section.isVisibile &&
          components[section.id] &&
          tags.push({
            section: section,
            Component: components[section.id],
          });
      });
    mainPage &&
      components[mainPage] &&
      tags.push({
        Component: components[mainPage],
        section: productSetting,
      });
    setViews(tags);
  }, [productSetting]);

  return (
    <section className="product-information product-information--default">
      {views &&
        views.map((Item: any, i: any) => {
          return <Item.Component key={i} data={Item.section} />;
        })}
    </section>
  );
};

export default ProductInformation;
