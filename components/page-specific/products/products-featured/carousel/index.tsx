import { ProductTypeList } from "types";
import ProductCard from "components/shared/product-card/";

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
SwiperCore.use([EffectFade, Navigation]);

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 20;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 30;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 3;
    spaceBetween = 30;
    centeredSlides = false;
  }
}

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop={true}
        centeredSlides={false}
        watchOverflow={true}
        slidesPerView={"auto"}
        className="swiper-wrapper"
        navigation
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard
              id={item.id}
              title={item.title}
              handle={item.handle || "test-product-namwe"}
              discount={item.item?.discount || null}
              priceHtml={item.item?.priceHtml || 0.0}
              specialPriceHtml={item.item?.specialPriceHtml || 0.0}
              key={item.id}
              images={item.images[0] || ""}
              quantity={item?.totalQuantity || 0}
              vendor={item?.vendor || null}
              trackQuantity={item.item.track_qty}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
