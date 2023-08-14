import { getSizedImageUrl } from "helpers/imageBucketHelper";
import Image from "next/image";
import Link from "next/link";

const ImageTextGrid = ({ variant = "default", data }) => {
  const listReverseContent = ["default", "variant6"];
  const listContentTextCenter = ["variant6", "variant7"];

  return (
    <section
      className={`image-text image-text--grid  ${
        listReverseContent.includes(variant)
          ? "image-text-grid--reverse-content"
          : ""
      }`}
    >
      <div className="pp-container">
        <div className="image-text__inner">
          <div className="image-text__thumbnail">
            <Image
              src={
                data.data["ImageText.image"]
                  ? //? data.data["ImageText.image"]
                    getSizedImageUrl(data.data["ImageText.image"], "fullView")
                  : "/images/rectangle-gray.svg"
              }
              width={200}
              height={200}
              alt="shoes"
            />
          </div>

          <div
            className={`image-text__content ${
              listContentTextCenter.includes(variant)
                ? "image-text__content--center"
                : ""
            }`}
          >
            <h2>{data.data["ImageText.heading"]}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: data?.data["ImageText.text"] || "",
              }}
            ></p>
            {data.data["ImageText.button_label"] ? (
              <Link
                href={
                  `${
                    data.data["ImageText.button_link"]?.value == "Collections"
                      ? "/collection"
                      : data.data["ImageText.button_link"]?.value == "Products"
                      ? "product"
                      : "/"
                  }` +
                  "/" +
                  data.data["ImageText.button_link"]?.slug
                }
                className="button  button-black"
              >
                {data.data["ImageText.button_label"] || ""}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextGrid;
