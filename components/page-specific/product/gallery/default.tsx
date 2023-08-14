import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { getSizedImageUrl } from "helpers/imageBucketHelper";

SwiperCore.use([EffectFade, Navigation]);

const Default = ({ images, activeSlideIndex }) => {
  const sliderRef: any = useRef();

  useEffect(() => {
    sliderRef?.current?.swiper?.slideTo(activeSlideIndex);
  }, [activeSlideIndex]);

  return (
    <section className="product-gallery product-gallery--variant-two">
      {images && images.length > 0 ? (
        <Swiper
          ref={sliderRef}
          navigation
          slidesPerView={images.length > 1 ? "auto" : 1}
          spaceBetween={images.length > 1 ? 20 : 0}
        >
          {activeSlideIndex}
          {images.map((item, index) => (
            <SwiperSlide key={`product-gallery${index}`}>
              <div className="product-gallery__preview">
                <Image
                  src={
                    item.src
                      ? getSizedImageUrl(item.src, "fullView")
                      : `/images/no-image-available.jpg`
                  }
                  width={200}
                  height={200}
                  alt="shoes"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="product-gallery__preview--empty">
          <Image
            src={`/images/no-image-available.jpg`}
            width={200}
            height={200}
            alt="shoes"
          />
        </div>
      )}
    </section>
  );
};

export default Default;
