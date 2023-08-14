import React from "react";
import themeData from "../utils";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
const ContentImage = ({ item }) => {
  return (
    <div
      className={` custom__item--image  ${
        themeData.container_width[
          item.data["CustomContent.image.container_width"]
        ]
      } 
      ${
        themeData.vertical_alignment[
          item.data["CustomContent.image.vertical_alignment"]
        ]
      }`}
    >
      <img
        src={
          item.data["CustomContent.image.image"]
            ? getSizedImageUrl(
                item.data["CustomContent.image.image"],
                "fullView"
              )
            : "/images/rectangle-gray.svg"
        }
        className="w-100"
        alt=""
      />
    </div>
  );
};

export default ContentImage;
