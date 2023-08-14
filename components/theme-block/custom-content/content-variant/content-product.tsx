import React from "react";
import themeData from "../utils";

import Link from "next/link";

import Image from "next/image";
import StarRate from "components/shared/star-rate";
import { getSizedImageUrl } from "helpers/imageBucketHelper";

const ContentProduct = ({ item }) => {
  return (
    <div
      className={`custom__item custom__item--product  ${
        themeData.container_width[
          item.data["CustomContent.product.container_width"]
        ]
      } ${
        themeData.vertical_alignment[
          item.data["CustomContent.product.vertical_alignment"]
        ]
      }`}
    >
      <div className="custom__item__inner ">
        <Link href={`/product/${item.product?.handle}`}>
          <div className="product-item-card " data-id={item.product?.id}>
            <div className="product__thumbnail">
              {item.product?.discount ? (
                <span className="product__label-sale">sale</span>
              ) : null}
              {item.product?.totalQuantity === 0 ? (
                <span className="product__label-soldout">soldout</span>
              ) : null}
              <Image
                src={
                  item.product &&
                  item.product?.Product_Images &&
                  item.product?.Product_Images.length > 0
                    ? // ? item.product?.Product_Images[0].src
                      getSizedImageUrl(
                        item.product?.Product_Images[0].src,
                        "fullView"
                      )
                    : "/images/rectangle-gray.svg"
                }
                width={200}
                height={200}
                alt="shoes"
              />
            </div>

            <div className="product__info">
              <h2> {item.product?.title || "Your product(s) name"}</h2>
              <div
                className={`product__info__price ${
                  item.product?.item.discount
                    ? "product__info__price--sale"
                    : ""
                }`}
              >
                <span className="prices__orginal">
                  {item.product?.item?.priceHtml || "Rp 0"}
                </span>
                {item.product?.item.discount ? (
                  <span className="prices__sales">
                    {item.product?.item.specialPriceHtml}
                  </span>
                ) : null}
              </div>
              <div className="product__info__reviews">
                <StarRate rating={0} interactive={false} />
                <p>
                  0 <span>Reviews</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ContentProduct;
