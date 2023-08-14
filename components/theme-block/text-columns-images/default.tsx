import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getSizedImageUrl } from "helpers/imageBucketHelper";

const Default = ({ data }: any) => {
  const themeData = {
    text_alignment: {
      Left: "align-left",
      Centered: "align-center",
    },
  };
  // const gridCol2 = "variant2";
  // const imageHeighSmall = "variant5";
  // const imageHeighXtraSmall = "variant6";
  // const getImageHeight = () => {
  //   if (variant === imageHeighSmall) return "product__image--sm";
  //   if (variant === imageHeighXtraSmall) return "product__image--xs";
  //   return "";
  // };

  return (
    <section className={`text-columns-images text-columns-images--grid `}>
      <div className="pp-container">
        <h2>{data?.data?.heading || "More ways our shoes can help out."}</h2>
        <div
          //className="columns-images__content"
          className={`text-columns-images__content  ${
            themeData.text_alignment[data.data["alignment"]]
          }`}
        >
          {data &&
            data["items"] &&
            data["items"].map((item, index) => {
              return (
                <div className="text-columns-images__product" key={index}>
                  {item.data["tagline.show_image"] && (
                    <div className={`product__image `}>
                      <div className="product__image__wrapper">
                        <Image
                          src={
                            item.data["tagline.image"]
                              ? getSizedImageUrl(
                                  item.data["tagline.image"],
                                  "medium"
                                )
                              : "/images/rectangle-gray.svg"
                          }
                          alt="ImageBg"
                          className="imageWithTaxt"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  )}

                  <div className="product__description">
                    <h3>{item.data["tagline.heading"]}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.data["tagline.text"] || "",
                      }}
                    ></p>

                    {item.data &&
                      item.data["tagline.button_link"] &&
                      item.data["tagline.button_link"].value && (
                        <Link
                          href={
                            `${
                              item.data["tagline.button_link"].value ==
                              "Collections"
                                ? "/collection"
                                : item.data["tagline.button_link"].value ==
                                  "Products"
                                ? "product"
                                : "/"
                            }` +
                            "/" +
                            item.data["tagline.button_link"].slug
                          }
                          className="button button-red--underline"
                        >
                          {item.data["tagline.button_label"]}
                        </Link>
                      )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Default;
