import Link from "next/link";
import Image from "next/image";
import StarRate from "components/shared/star-rate";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
import { ProductTypeList } from "types";
const ProductCard = ({
  id,
  discount,
  images,
  title,
  priceHtml,
  specialPriceHtml,
  handle,
  quantity,
  vendor,
  listType = "Grid",
  collectionVendor,
  trackQuantity,
}: ProductTypeList) => {
  return (
    <>
      <Link href={`/product/${handle}`}>
        <div className="product-card " data-id={id}>
          <div className="product__thumbnail">
            {discount ? (
              <span className="product__label-sale">sale</span>
            ) : null}
            {quantity < 1 && trackQuantity ? (
              <span className="product__label-soldout">soldout</span>
            ) : null}
            <Image
              src={
                images.length > 0
                  ? getSizedImageUrl(images, "fullView")
                  : "/images/no-image-available.jpg"
              }
              width={100}
              height={100}
              alt="shoes"
            />
          </div>

          <div className="product__info">
            <div className="product__info__main">
              <h2>{title}</h2>
              <div className="product__info__list">
                <div
                  className={`product__info__price ${
                    discount ? "product__info__price--sale" : ""
                  }`}
                >
                  <span>{priceHtml}</span>
                  {discount ? <span>{specialPriceHtml}</span> : null}
                </div>

                {vendor && collectionVendor ? (
                  <p className="product__info__vendor">{vendor}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
