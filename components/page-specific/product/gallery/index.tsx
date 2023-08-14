import React from "react";
import Default from "./default";
// import Image from "next/image";
// type GalleryProductType = {
//   images: string[];
// };

const Gallery = ({ variant = "variant-two", images,activeSlideIndex }: any) => {
  const getComponentByVariant = () => {
    if (variant === "variant-two") return <Default images={images} activeSlideIndex={activeSlideIndex} />;
    return null;
  };
  return getComponentByVariant();
};

export default Gallery;
