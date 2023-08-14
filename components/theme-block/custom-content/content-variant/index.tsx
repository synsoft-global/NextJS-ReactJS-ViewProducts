import React from "react";

import ContentText from "./content-text";
import ContentImage from "./content-image";
import ContentProduct from "./content-product";
import ContentCollection from "./content-collection";
import ContentVideo from "./content-video";
import ContentMenu from "./content-menu";
import CustomHtml from "./custom-html";

const ContentVariant = ({ item }) => {
  const GetComponentByVariant = () => {
    if (item.name == "Text") return <ContentText item={item} />;

    if (item.name == "Image") return <ContentImage item={item} />;

    if (item.name == "Product") return <ContentProduct item={item} />;

    if (item.name == "Collection") return <ContentCollection item={item} />;

    if (item.name == "Video") return <ContentVideo item={item} />;

    if (item.name == "Menu") return <ContentMenu item={item} />;

    if (item.name == "Custom HTML") return <CustomHtml item={item} />;

    return null;
  };

  return GetComponentByVariant();
};

export default ContentVariant;
