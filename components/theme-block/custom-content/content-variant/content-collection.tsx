import React from "react";
import themeData from "../utils";
import Link from "next/link";
import { getSizedImageUrl } from "helpers/imageBucketHelper";

const ContentCollection = ({ item }) => {
  return (
    <div
      className={`custom__item--collection  ${
        themeData.container_width[
          item.data["CustomContent.collection.container_width"]
        ]
      }`}
    >
      <div className="custom__item__inner">
        <div
          className={`collection-card ${
            item.collection?.image_url ? "" : "collection-card--without-overlay"
          }`}
          style={{
            backgroundImage: `url(${
              item.collection?.image_url
                ? // ? item.collection.image_url
                  getSizedImageUrl(item.collection.image_url, "fullView")
                : "/images/rectangle-gray.svg"
            })`,
          }}
        >
          {/* {JSON.stringify(collectionItem.collection)} */}
          <div className="collection-card__content">
            {item.collection?.title ? <h2>{item.collection?.title}</h2> : ""}

            {/* <p>19 PRODUCTS</p> */}
            {item?.collection?.handle ? (
              <Link
                href={`collection/${item.collection.handle}`}
                className="button  button-white"
              >
                SHOP NOW
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCollection;
