import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
import { useSelector } from "react-redux";
import { RootState } from "store";
import IcChevronDownLineBlack from "assets/icons/IcChevronDownLineBlack";
import IcChevronUpLineBlack from "assets/icons/IcChevronUpLineBlack";
import IcPinterestBlack from "assets/icons/components/footer/IcPinterestBlack";
import IcFacebookBlack from "assets/icons/components/footer/IcFacebookBlack";
import IcTwitterBlack from "assets/icons/components/footer/IcTwitterBlack";
import Form from "react-bootstrap/Form";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  addCartProduct,
  getCartCount,
  removeAllCartItem,
} from "store/reducers/cart";
import { useRouter } from "next/router";
import Router from "next/router";
import { ProductStoreType } from "types/index";
import ViewCart from "components/shared/view-cart";
import WhatsappFormPopup from "components/shared/whatsapp-form-popup";
import userService from "services/user.service";
import { toast } from "react-nextjs-toast";
import productsService from "services/product.service";
import ButtonCustom from "components/shared/button-custom";

SwiperCore.use([EffectFade, Navigation, Pagination]);
const Default = ({ data }: any) => {
  const [selectedOption, setSelectedOption] = useState<any>([]);
  const [finalItem, setFinalItem] = useState<any>({});
  const [productItem, setProductItem] = useState<any>({});
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const { Order_Items } = useSelector((state: RootState) => state.cart);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [whatsappTextTemplate, setWhatsappTextTemplate] = useState<string>("");
  const [whatsappSetting, setWhatsappSetting] = useState<any>();
  const { storeData } = useSelector((state: RootState) => state.store);
  const [staffDetail, setStaffDetail] = useState<any>();
  const [checkoutType, setCheckoutType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isButtonAddChartLoading, setisButtonAddChartLoading] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sliderRef: any = useRef();
  useEffect(() => {
    sliderRef?.current?.swiper?.slideTo(activeSlideIndex);
  }, [activeSlideIndex]);
  // check if product has varinats or not
  useEffect(() => {
    if (data?.product?.Product_Variants.length == 0) {
      setProductItem(data.product.item);
    } else {
      setProductItem(data?.product?.Product_Variants[0].item);
    }

    const assign_to: any = data?.product?.Product_Meta?.find(
      (x: any) => x.key == "assign_to"
    );

    let assign_to_v: any = "";
    if (assign_to) {
      assign_to_v = JSON.parse(assign_to.value);
    }

    const code = "whatsapp_settings";
    userService
      .getSettings(code)
      .then((setting) => {
        if (setting && setting.value) {
          if (assign_to_v.whatsappFormType === "default") {
            setWhatsappSetting(setting.value);
          } else {
            setWhatsappSetting(assign_to_v.whatsappSetting);
          }

          if (assign_to_v.leadDistribution == "default") {
            setCheckoutType(setting.value.assign_to.checkoutType);
          } else {
            setCheckoutType(data.product?.Product_Extra?.checkout_type);
          }
          setWhatsappTextTemplate(setting.value.whatsappTextTemplate);
        }
      })
      .catch((err) => {
        toast.notify(err.message, {
          type: "error",
          autoDismiss: true,
        });
      });
  }, [data.product]);

  // useEffect(() => {

  // }, [data.product]);

  // check if product has varinats select options for order
  const onSelectOptions = (e: any, option: any) => {
    const optionI = selectedOption.findIndex((o) => o.id == option.id);
    if (optionI > -1) {
      option["selectedValue"] = e.target.value;
      selectedOption[optionI] = option;
      setSelectedOption([...selectedOption]);
    } else {
      option["selectedValue"] = e.target.value;
      setSelectedOption([...selectedOption, option]);
    }
  };
  useEffect(() => {
    setFinalItemFn();
  }, [JSON.stringify(selectedOption)]);

  // get final product item for order update product item on the basis of product has options or if single product
  const setFinalItemFn = () => {
    if (selectedOption.length == data?.product?.Product_Options?.length) {
      const madeWith: any = [];
      selectedOption.map((option) => {
        if (option && option.values) {
          const optionI: any = option.values
            .filter((x) => !!x)
            .find((v) => v.id == option.selectedValue);
          if (optionI) {
            madeWith.push(optionI.uniqueId);
          }
        }
      });

      const variant = data.product.Product_Variants.find((variant) => {
        variant.option_ids =
          typeof variant.option_ids == "string"
            ? JSON.parse(variant.option_ids)
            : variant.option_ids;
        return _.difference([...variant.option_ids], [...madeWith]).length == 0;
      });

      if (variant) {
        setFinalItem(variant);
        setProductItem(variant.item);
        const findImageIndex = data?.product?.Product_Images?.findIndex(
          (x: any) => x.src == variant.image_url
        );
        if (findImageIndex > -1) {
          setActiveSlideIndex(findImageIndex);
        }
      }
    }
  };
  const { user } = useSelector((state: RootState) => state.user);
  // go to checkout page
  const buyNow = () => {
    dispatch(removeAllCartItem());
    const productToSave: ProductStoreType = {
      product_id: data.product.id,
      variant_id: finalItem.id,
      item_id: productItem.id,
      product_name: data.product.title,
      variant_name: productItem?.variation_title || "",
      //thumb: data.product.images ? data.product.images[0] : "",
      thumb:
        finalItem && finalItem.image_url
          ? finalItem.image_url
          : data.product?.images
          ? data.product.images[0]
          : "",
      price: productItem.price,
      quantity: count,
      handle: data.product.handle,
      weight: productItem.weight,
      priceHtml: productItem.priceHtml,
    };

    dispatch(addCartProduct(productToSave));
    dispatch(getCartCount());

    router.push(`/checkouts`);
  };

  // update cart item
  const addToCart = () => {
    setisButtonAddChartLoading(true);
    const productToSave: ProductStoreType = {
      product_id: data.product.id,
      variant_id: finalItem.id,
      item_id: productItem.id,
      product_name: data.product.title,
      variant_name: productItem?.variation_title || "",
      //thumb: data.product.images ? data.product.images[0] : "",
      thumb:
        finalItem && finalItem.image_url
          ? finalItem.image_url
          : data.product.images
          ? data.product.images[0]
          : "",
      price: productItem.price,
      quantity: count,
      handle: data.product.handle,
      weight: productItem.weight,
      priceHtml: productItem.priceHtml,
    };

    dispatch(addCartProduct(productToSave));
    dispatch(getCartCount());

    setCount(1);
    if (storeData?.themeSetting?.cart_notification?.cart_notification) {
      setShowCart(true);
    } else {
      router.push(`/cart`);
    }
    setisButtonAddChartLoading(false);
  };

  const handleWhatsappRedirect = (type) => {
    const id = data.product.id;
    const params = {
      type: type,
      variant_id: finalItem?.id,
      item_id: finalItem?.item?.id || data.product?.item?.id,
      product_name: data.product.title,
      variant_name: finalItem?.title,
    };
    setLoading(true);
    productsService
      .getStaffDetails(id, params)
      .then((dataI) => {
        if (dataI) {
          let whatsappTextTemplateI = whatsappTextTemplate;
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{product_name}}/g,
            data.product.title
          );
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{variant_name}}/g,
            finalItem?.title ? finalItem?.title + " " : ""
          );
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{store_name}}/g,
            storeData?.store_detail?.name + " "
          );
          const RECEIVER_PHONE = dataI.phone
            ? dataI.phone
            : storeData?.store_detail.phone;

          const uuidv4 = dataI.uuidv4;
          whatsappTextTemplateI = whatsappTextTemplateI + " " + uuidv4;

          // let url = `https://wa.me/${RECEIVER_PHONE}?text=${encodeURIComponent(
          //   whatsappTextTemplateI
          // )}`;
          // window.open(url, "_blank");
          router.push({
            pathname: "/chat/pre-landing/",
            query: { phone: RECEIVER_PHONE, text: whatsappTextTemplateI },
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.notify(err.message, {
          type: "error",
          autoDismiss: true,
        });
      });
  };

  const handleWhatsappFrom = (type) => {
    const id = data.product.id;
    const params = {
      type: type,
      variant_id: finalItem?.id,
      item_id: finalItem?.item?.id || data.product?.item?.id,
      product_name: data.product.title,
      variant_name: finalItem?.title,
    };
    productsService
      .getStaffDetails(id, params)
      .then((dataI) => {
        if (dataI) {
          setStaffDetail({ phone: dataI.phone, uuidv4: dataI.uuidv4 });
          setShowPopup(true);
        }
      })
      .catch((err) => {
        toast.notify(err.message, {
          type: "error",
          autoDismiss: true,
        });
      });
  };
  return (
    <section className="featured-product featured-product--default ">
      {/* this is cart popup */}
      <ViewCart data={{ showCart, setShowCart }} />

      {/* this is WhatsApp checkout  popup */}
      <WhatsappFormPopup
        data={{
          showPopup,
          setShowPopup,
          product: data.product,
          finalItem,
          staffDetail,
          whatsappTextTemplate,
          whatsappSetting,
        }}
      />
      <div className="pp-container pp-container--full-mobile">
        <div className="featured-product__grid">
          <section className="featured-product__gallery">
            <Swiper
              ref={sliderRef}
              navigation={true}
              effect="fade"
              className="product__gallery__swiper"
            >
              {data.product &&
              data.product.Product_Images &&
              data.product.Product_Images.length > 0 ? (
                data.product.Product_Images.map((item) => (
                  <SwiperSlide key={item}>
                    <div
                      className={`gallery__swiper__item`}
                      style={{
                        backgroundImage: `url(${
                          item.src
                            ? getSizedImageUrl(item.src, "fullView")
                            : "/images/rectangle-gray.svg"
                        })`,
                      }}
                    ></div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div
                    className={`gallery__swiper__item`}
                    style={{
                      backgroundImage: `url( "/images/rectangle-gray.svg")`,
                    }}
                  ></div>
                </SwiperSlide>
              )}
            </Swiper>
          </section>
          <section className="featured-product__content product-content">
            <div className="product__intro">
              {data?.product?.product_type ? (
                <h5 className="product__intro__category">
                  {data?.product?.product_type || ""}
                </h5>
              ) : null}

              <h2 className="product__intro__title">
                {data?.product?.title || "Your products name"}
              </h2>
              {data.data["featured_product.show_vendor"] &&
              data?.product?.vendor ? (
                <h5 className="product__intro__vendor">
                  {data?.product?.vendor || ""}
                </h5>
              ) : null}
            </div>

            {/* PRICES */}
            <div
              className={`product__prices ${
                data?.product?.item.discount ? "product__prices--sales" : ""
              } ${
                data?.product?.item.discount ? "product__prices--sales" : ""
              }`}
            >
              <h3 className="prices__orginal">
                {data?.product?.item.specialPriceHtml ||
                  data?.product?.item.priceHtml}
              </h3>
              {/* SHOW ON DISOUCNT */}
              {data?.product?.item.discount ? (
                <>
                  <h3 className="prices__sales">
                    {data?.product?.item.priceHtml}
                  </h3>
                  <span className="product__label--sale">SALE</span>
                </>
              ) : null}

              {/* SHOW ON SOLD OUT */}
              {data?.product?.item?.quantity === 0 ? (
                <span className="product__label--soldout">SOLD OUT</span>
              ) : null}
            </div>

            {/* OPTIONS*/}
            {data?.product?.Product_Options.length ? (
              <div className="product__options">
                {data?.product?.Product_Options.map((option) => {
                  return (
                    <div className="product__variant">
                      <h5 className="product__variant__label">{option.name}</h5>
                      <div className="product__variant__item">
                        <Form
                          onChange={(e) => {
                            onSelectOptions(e, option);
                          }}
                        >
                          {option.values.map((type) => {
                            return type ? (
                              <>
                                <Form.Check
                                  name={option.name}
                                  key={type.id}
                                  value={type.id}
                                  type={"radio"}
                                  id={`${option.name}-${type.id}`}
                                  label={type.name}
                                />
                              </>
                            ) : null;
                          })}
                        </Form>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* PRODUCT FORM ACTIONN */}

            {data?.product?.Product_Extra &&
            data?.product?.Product_Extra?.checkout_type ? (
              <>
                {" "}
                <div className="product__form">
                  {data?.product?.Product_Extra.checkout_type ===
                  "standard_checkout" ? (
                    <div
                      className={
                        data.data["featured_product.show_quantity_selector"]
                          ? "product__form__container--show-quantity"
                          : "product__form__container"
                      }
                    >
                      {data.data["featured_product.show_quantity_selector"] ? (
                        <div className="product__form__quantity">
                          <input placeholder="0" type="number" value={count} />
                          <div className="quantity__action">
                            <IcChevronUpLineBlack
                              className="quantity__increase"
                              onClick={() => setCount(count + 1)}
                            />
                            <IcChevronDownLineBlack
                              className="quantity__deacrease"
                              onClick={() => {
                                const count_quantity =
                                  count > 1 ? count - 1 : 1;
                                setCount(count_quantity);
                              }}
                            />
                          </div>
                        </div>
                      ) : null}

                      <ButtonCustom
                        type="submit"
                        variant="black--border"
                        className="product__button-addtocart"
                        onClick={() => addToCart()}
                        disabled={
                          (data?.product?.Product_Options.length > 0 &&
                            selectedOption.length !=
                              data?.product?.Product_Options.length) ||
                          data?.product?.item?.quantity === 0
                        }
                        loading={isButtonAddChartLoading}
                      >
                        Add to cart
                      </ButtonCustom>

                      {data.data["featured_product.dynamic_checkout"] ? (
                        <ButtonCustom
                          type="submit"
                          className="product__button-buyit"
                          onClick={() => buyNow()}
                          disabled={
                            (data?.product?.Product_Options?.length > 0 &&
                              selectedOption.length !=
                                data.product.Product_Options.length) ||
                            data?.product?.item?.quantity === 0
                          }
                        >
                          Buy it now
                        </ButtonCustom>
                      ) : null}
                    </div>
                  ) : checkoutType == "whatsapp_redirect" ? (
                    <div className="product__form__container">
                      <ButtonCustom
                        disabled={data?.product?.item?.quantity === 0}
                        onClick={() => handleWhatsappRedirect("redirect")}
                        type="submit"
                        className={`product__button-buyit`}
                      >
                        Whatsapp Redirect
                      </ButtonCustom>
                    </div>
                  ) : checkoutType == "whatsapp_form" ? (
                    <div className="product__form__container">
                      <ButtonCustom
                        disabled={data?.product?.item?.quantity === 0}
                        className={`product__button-buyit`}
                      >
                        Whatsapp Form
                      </ButtonCustom>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className="product__form">
                  <div className="product__form__container">
                    <ButtonCustom
                      disabled={data?.product?.item?.quantity === 0}
                      className="product__button-buyit"
                    >
                      Buy it now
                    </ButtonCustom>
                  </div>
                </div>
              </>
            )}

            {/* SOCIAL SHARING */}
            {data.data["featured_product.social_sharing"] ? (
              <div className="product__sharing">
                {storeData?.themeSetting?.social_media?.sharing_options
                  ?.facebook && (
                  <ButtonCustom variant="icon">
                    <IcFacebookBlack />
                  </ButtonCustom>
                )}
                {storeData?.themeSetting?.social_media?.sharing_options
                  ?.twitter && (
                  <ButtonCustom variant="icon">
                    <IcTwitterBlack />
                  </ButtonCustom>
                )}
                {storeData?.themeSetting?.social_media?.sharing_options
                  ?.pintrest && (
                  <ButtonCustom variant="icon">
                    <IcPinterestBlack />
                  </ButtonCustom>
                )}
              </div>
            ) : null}

            {/* BUTTON VIEW PRODUCT DETAIL */}
            {data?.product?.handle && (
              <ButtonCustom
                href={data?.product ? `product/${data?.product.handle}` : "#"}
                variant="red--underline"
              >
                view product detail
              </ButtonCustom>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Default;
