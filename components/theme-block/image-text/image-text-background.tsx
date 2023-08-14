import React from "react";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
import ButtonCustom from "components/shared/button-custom";

const ImageTextBackground = ({ variant = "variant2", data }) => {
  return (
    <section
      className={`image-text image-text--background image-text--${variant}`}
    >
      <div className="pp-container ">
        <div
          className="image-text__inner"
          style={{
            backgroundImage: `url('${
              data.data["ImageText.image"]
                ? //? data.data["ImageText.image"]
                  getSizedImageUrl(data.data["ImageText.image"], "medium")
                : "/images/rectangle-gray.svg"
            }')`,
          }}
        >
          <div className="image-text__content">
            <h2>{data.data["ImageText.heading"]}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: data?.data["ImageText.text"] || "",
              }}
            ></p>
            <ButtonCustom variant="black">
              {data.data["ImageText.button_label"] || ""}
            </ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextBackground;
