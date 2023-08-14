import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";
SwiperCore.use([EffectFade, Navigation, Pagination]);
// DON't DETELE it will be use letter
const TextColumnsImages = ({ data }: any) => {
  return (
    <section className="columns-images columns-images--variant-6">
      <div className="pp-container">
        <h2>More ways our shoes can help out.</h2>
        <div className="columns-images__content desktop">
          {data
            ? data["items"] &&
              data["items"].map((item, index) => {
                return (
                  <div className="columns-images__product" key={index}>
                    <div className="product__image">
                      <Link href={"#"}>
                        {item.data["tagline.show_image"] && (
                          <Image
                            src={
                              item.data["tagline.image"]
                                ? item.data["tagline.image"]
                                : "images/rectangle-gray.svg"
                            }
                            alt="ImageBg"
                            className="imageWithTaxt"
                            width={100}
                            height={100}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="product__description">
                      <h3>{item.data["tagline.heading"]}</h3>
                      <p>{item.data["tagline.text"]}</p>
                      <Link href="#" className="button button-red--underline">
                        LEARN MORE
                      </Link>
                    </div>
                  </div>
                );
              })
            : [1, 2, 3].map((item, index) => {
                return (
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
                      <Link href="#" className="button button-red--underline">
                        LEARN MORE
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="columns-images__content mobile">
          <Swiper pagination slidesPerView={"auto"} spaceBetween={20}>
            {data
              ? data["items"] &&
                data["items"].map((item, index) => {
                  return (
                    <SwiperSlide key={item}>
                      <div className="columns-images__product" key={index}>
                        <div className="product__image">
                          <Link href={"#"}>
                            {item.data["tagline.show_image"] && (
                              <Image
                                src={
                                  item.data["tagline.image"]
                                    ? item.data["tagline.image"]
                                    : "images/rectangle-gray.svg"
                                }
                                alt="ImageBg"
                                className="imageWithTaxt"
                                width={100}
                                height={100}
                              />
                            )}
                          </Link>
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
              : [1, 2, 3, 4, 5, 6].map((item, index) => {
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

export default TextColumnsImages;
