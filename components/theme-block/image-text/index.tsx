import ImageTextGrid from "./image-text-grid";
import ImageTextBackground from "./image-text-background";
import Default from "./default";
const ImageText = ({ variant = "variant1", data }) => {
  // const listImageTextGrid = ["default", "variant6", "variant1", "variant7"];

  // const listImageTextBackround = [
  //   "variant2",
  //   "variant3",
  //   "variant4",
  //   "variant5",
  // ];

  // const getComponentByVariant = () => {
  //   if (listImageTextGrid.includes(variant))
  //     return <ImageTextGrid variant={variant} data={data} />;

  //   if (listImageTextBackround.includes(variant))
  //     return <ImageTextBackground variant={variant} data={data} />;

  //   return null;
  // };

  return <Default data={data} />;
};

export default ImageText;
