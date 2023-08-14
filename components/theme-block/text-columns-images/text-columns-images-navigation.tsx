import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
SwiperCore.use([EffectFade, Navigation]);

const TextColumnsImagesNavigation = ({ data }: any) => {
  return (
    <section className="text-columns-images columns-images--variant4">
      <div className="pp-container">
        <h2>More ways our shoes can help out.</h2>
        <div className="columns-images__content">
          <Swiper navigation slidesPerView={"auto"} spaceBetween={20}>
            {data
              ? data["items"] &&
                data["items"].map((item, index) => {
                  return (
                    <SwiperSlide key={item}>
                      <div className="columns-images__product" key={index}>
                        <div className="product__image">
                          <div className="product__image__wrapper">
                            {item.data["tagline.show_image"] && (
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
                            )}
                          </div>
                        </div>

                        <div className="product__description">
                          <h3>{item.data["tagline.heading"]}</h3>
                          <p>{item.data["tagline.text"]}</p>
                          <Link
                            href="#"
                            className="button button-red--underline"
                          >
                            LEARN MORE
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              : [1, 2, 3].map((item, index) => {
                  return (
                    <SwiperSlide key={item}>
                      <div className="columns-images__product" key={index}>
                        <div className="product__image">
                          <Link href={"#"}>
                            <img
                              src={"/images/rectangle-gray.svg"}
                              alt="ImageBg"
                              className="imageWithTaxt"
                            />
                          </Link>
                        </div>

                        <div className="product__description">
                          <h3>heading</h3>
                          <p>taglline</p>
                          <Link
                            href="#"
                            className="button button-red--underline"
                          >
                            LEARN MORE
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TextColumnsImagesNavigation;
