import ReviewsList from "./reviews-list";
import Punctuation from "./punctuation";
import { ProductType } from "types";

type ReviewsProductType = {
  product: ProductType;
};

const Reviews = ({ product }: ReviewsProductType) => {
  return (
    <section className="product-page__reviews">
      {/* <Punctuation
        punctuation={product.punctuation.punctuation}
        countOpinions={product.punctuation.countOpinions}
        votes={product.punctuation.votes}
      />
      <ReviewsList reviews={product.reviews} /> */}
    </section>
  );
};

export default Reviews;
