import { getSizedImageUrl } from "helpers/imageBucketHelper";
import Link from "next/link";
import { useEffect, useState } from "react";
import useBetterMediaQuery from "hocs/useBetterMediaQuery";
import { useMediaQuery } from "react-responsive";
import ButtonCustom from "components/shared/button-custom";
import useHeaderHeight from "hocs/useHeaderHeight";
const ImageTextOverlay = ({ data = null }: any) => {
  const headerHeight = useHeaderHeight();

  // condition for iamge-text-overlay in first-child section block
  const isPhone = useMediaQuery({
    query: "(min-width: 767px)",
  });
  const getPaddingTop = () => {
    if (isPhone) return `calc(${headerHeight}px + 75px)`;
    return `calc(${headerHeight}px + 55px)`;
  };

  return (
    <section
      className={`image-text-overlay`}
      style={{
        backgroundImage: `url(${
          data && data["data"]["ImageTextOverlay.image"]
            ? getSizedImageUrl(
                data["data"]["ImageTextOverlay.image"],
                "fullView"
              )
            : "/images/rectangle-gray.svg"
        })`,
        paddingTop: getPaddingTop(),
      }}
    >
      <div className="container">
        <div className="image-text-overlay__content">
          <div className="image-text-overlay__content__text">
            <h1>
              {data ? data["data"]["ImageTextOverlay.heading"] : "Heading"}
            </h1>

            {data ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: data["data"]["ImageTextOverlay.text"] || "",
                }}
              ></div>
            ) : null}
          </div>

          {data &&
          data["data"]["ImageTextOverlay.button_label"] &&
          data["data"]["ImageTextOverlay.button_link"] &&
          data["data"]["ImageTextOverlay.button_link"]["value"] ? (
            <ButtonCustom
              variant="white"
              href={`${
                data["data"] &&
                data["data"]["ImageTextOverlay.button_link"] &&
                data["data"]["ImageTextOverlay.button_link"]["value"] ==
                  "Collections"
                  ? "collection/" +
                    data["data"]["ImageTextOverlay.button_link"]["slug"]
                  : data["data"] &&
                    data["data"]["ImageTextOverlay.button_link"] &&
                    data["data"]["ImageTextOverlay.button_link"]["value"] ==
                      "Products"
                  ? "product/" +
                    data["data"]["ImageTextOverlay.button_link"]["slug"]
                  : data["data"] &&
                    data["data"]["ImageTextOverlay.button_link"] &&
                    data["data"]["ImageTextOverlay.button_link"]["slug"]
              }`}
            >
              {data["data"]["ImageTextOverlay.button_label"]}
            </ButtonCustom>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ImageTextOverlay;
