import React from "react";
import themeData from "../utils";

const ContentText = ({ item }) => {
  return (
    <div
      className={`custom__item custom__item--text  ${
        themeData.container_width[
          item.data["CustomContent.text.container_width"]
        ]
      }  ${
        themeData.vertical_alignment[
          item.data["CustomContent.text.vertical_alignment"]
        ]
      }`}>
      <div className="custom__item__inner">
        <div
          className={`medium-up--text-left ${
            themeData.horizontal_alignment[
              item.data["CustomContent.text.horizontal_alignment"]
            ]
          }`}>
          <h2>{item.data["CustomContent.text.heading"]}</h2>
          <div
            className="custom__item--text__description"
            dangerouslySetInnerHTML={{
              __html: item.data["CustomContent.text.decriptions"] || "",
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default ContentText;
