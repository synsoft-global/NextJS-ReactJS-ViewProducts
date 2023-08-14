import React from "react";
import IcChevronUpLineBlack from "assets/icons/IcChevronUpLineBlack";
import IcChevronDownLineBlack from "assets/icons/IcChevronDownLineBlack";
import Lottie from "lottie-react";
import SpinningAnimation from "../../../../assets/json/Spinning.json";
import ButtonCustom from "components/shared/button-custom";

const Checkout = ({
  productItem,
  product,
  count,
  setCount,
  loading,
  setLoading,
  addToCart,
  selectedOption,
  buyNow,
  handleWhatsappRedirect,
  handleWhatsappFrom,
  checkoutType,
}) => {
  return (productItem.quantity > 0 && productItem.track_qty) ||
    productItem?.sell_out_of_stock ||
    !productItem.track_qty ? (
    <>
      {
        //productItem.quantity > 0 || productItem?.sell_out_of_stock
        //product?.Product_Extra?.checkout_type == "standard_checkout"
        checkoutType == "standard_checkout" ? (
          <div className="product-content__form">
            <h5>Quantity:</h5>
            <div className="product-content__form__container">
              <div className="product-content__form__quantity">
                <input placeholder="0" type="number" value={count} readOnly />
                <div className="quantity__action">
                  <IcChevronUpLineBlack
                    className="quantity__increase"
                    onClick={() => {
                      if (
                        productItem.quantity > 0 &&
                        productItem.track_qty &&
                        !productItem.sell_out_of_stock
                      ) {
                        const Q =
                          count + 1 > productItem.quantity
                            ? productItem.quantity
                            : count + 1;
                        setCount(Q);
                      } else {
                        setCount(count + 1);
                      }
                    }}
                  />
                  <IcChevronDownLineBlack
                    className="quantity__deacrease"
                    onClick={() => {
                      const count_quantity = count > 1 ? count - 1 : 1;
                      setCount(count_quantity);
                    }}
                  />
                </div>
              </div>
              <ButtonCustom
                variant="black--border"
                type="submit"
                onClick={() => addToCart()}
                disabled={
                  product.Product_Options.length > 0 &&
                  selectedOption.length != product.Product_Options.length
                }
              >
                Add to cart
              </ButtonCustom>
              <ButtonCustom
                variant="black"
                disabled={
                  product.Product_Options.length > 0 &&
                  selectedOption.length != product.Product_Options.length
                }
                type="submit"
                onClick={() => buyNow()}
              >
                BUY IT NOW
              </ButtonCustom>
            </div>
          </div>
        ) : //product?.Product_Extra?.checkout_type == "whatsapp_redirect"
        checkoutType == "whatsapp_redirect" ? (
          <div className="product-content__form">
            <ButtonCustom
              onClick={() => handleWhatsappRedirect("redirect")}
              type="submit"
              variant="black"
              loading={loading}
              fullwidth
            >
              Whatsapp Redirect
            </ButtonCustom>
          </div>
        ) : checkoutType == "whatsapp_form" ? (
          <div className="product-content__form">
            <ButtonCustom
              onClick={() => handleWhatsappFrom("form")}
              type="submit"
              variant="black"
            >
              Whatsapp Form
            </ButtonCustom>
          </div>
        ) : null
      }
    </>
  ) : null;
};

export default Checkout;
