import React from "react";
import themeData from "../utils";
const CustomHtml = ({ item }) => {
  return (
    <div
      // className="custom__item--collection"
      className={`custom__item--html  ${
        themeData.container_width[
          item.data["CustomContent.customHTML.container_width"]
        ]
      }`}>
      <div className="custom__item__inner ">
        <div
          dangerouslySetInnerHTML={{
            __html: item.data["CustomContent.customHTML.html"],
          }}></div>
      </div>
    </div>
  );
};

export default CustomHtml;
