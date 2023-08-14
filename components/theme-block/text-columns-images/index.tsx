// import Link from "next/link";
import React from "react";
import TextColumnsImagesNavigation from "./text-columns-images-navigation";
import TextColumnsImagesGrid from "./text-columns-Images-grid";
import Default from "./default";

const TextColumnsImages = ({ data, variant = "default" }: any) => {
  // const listNavigation = ["variant4"];
  // const listGrid = ["default", "variant2", "variant5", "variant6"];

  // return listNavigation.includes(variant) ? (
  //   <TextColumnsImagesNavigation data={data} />
  // ) : listGrid.includes(variant) ? (
  //   <TextColumnsImagesGrid data={data} variant={variant} />
  // ) : null;\

  return <Default data={data} />;
};

export default TextColumnsImages;
