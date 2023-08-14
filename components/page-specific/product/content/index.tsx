import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCartProduct,
  getCartCount,
  removeAllCartItem,
} from "store/reducers/cart";
import ViewCart from "components/shared/view-cart";
import WhatsappFormPopup from "components/shared/whatsapp-form-popup";
import Checkout from "./checkout";
import _ from "lodash";
import { ProductType, ProductStoreType } from "types";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { toast } from "react-nextjs-toast";
import OtherInfo from "./other-info";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import IcDurable from "assets/icons/sections/product/IcDurable";
import IcVegan from "assets/icons/sections/product/IcVegan";
import IcWaterResistant from "assets/icons/sections/product/IcWaterResistant";
import IcCrueltyFree from "assets/icons/sections/product/IcCrueltyFree";
import productsService from "services/product.service";
import { useRouter } from "next/router";
import userService from "services/user.service";

type ProductContent = {
  product: ProductType;
  setActiveSlideIndex: any;
};

const Content = ({ product, setActiveSlideIndex }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<any>([]);
  const [finalItem, setFinalItem] = useState<any>({});
  const [productItem, setProductItem] = useState<any>({});
  const [whatsappTextTemplate, setWhatsappTextTemplate] = useState<string>("");
  const [whatsappSetting, setWhatsappSetting] = useState<any>();
  const { storeData } = useSelector((state: RootState) => state.store);
  const [staffDetail, setStaffDetail] = useState<any>();
  const [checkoutType, setCheckoutType] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (product.Product_Variants.length == 0) {
      setProductItem(product.item);
    } else {
      setProductItem(product.Product_Variants[0].item);
    }
  }, [product.id]);

  useEffect(() => {
    const assign_to: any = product?.Product_Meta?.find(
      (x: any) => x.key == "assign_to"
    );

    let assign_to_v: any = "";
    if (assign_to) {
      assign_to_v = JSON.parse(assign_to.value);
    }

    const code = "whatsapp_settings";
    userService
      .getSettings(code)
      .then((data) => {
        if (data && data.value) {
          if (assign_to_v.whatsappFormType === "default") {
            setWhatsappSetting(data.value);
          } else {
            setWhatsappSetting(assign_to_v.whatsappSetting);
          }

          if (assign_to_v.leadDistribution == "default") {
            setCheckoutType(data.value.assign_to.checkoutType);
          } else {
            setCheckoutType(product?.Product_Extra?.checkout_type);
          }
          setWhatsappTextTemplate(data.value.whatsappTextTemplate);
        }
      })
      .catch((err) => {
        toast.notify(err.message, {
          type: "error",
          autoDismiss: true,
        });
      });
  }, [product.id]);

  const onSelectOptions = (e: any, option: any) => {
    //uniqueId
    //option_ids get final item id
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

  const setFinalItemFn = () => {
    if (selectedOption.length == product.Product_Options.length) {
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

      const variant = product.Product_Variants.find((variant) => {
        variant.option_ids =
          typeof variant.option_ids == "string"
            ? JSON.parse(variant.option_ids)
            : variant.option_ids;
        return _.difference([...variant.option_ids], [...madeWith]).length == 0;
      });

      if (variant) {
        setFinalItem(variant);
        setProductItem(variant.item);
        const findImageIndex = product?.images.findIndex(
          (x: any) => x.src == variant.image_url
        );
        if (findImageIndex > -1) {
          setActiveSlideIndex(findImageIndex);
        }
      }
    }
  };

  const addToCart = () => {
    const productToSave: ProductStoreType = {
      product_id: product.id,
      variant_id: finalItem.id,
      item_id: productItem.id,
      product_name: product.title,
      variant_name: productItem?.variation_title || "",
      //thumb: product.images ? product.images[0] : "",
      thumb:
        finalItem && finalItem.image_url
          ? finalItem.image_url
          : product.thumb
          ? product?.thumb[0]
          : "",
      price: productItem.price,
      quantity: count,
      handle: product.handle,
      weight: productItem.weight,
      priceHtml: productItem.priceHtml,
    };
    setCount(1);
    dispatch(addCartProduct(productToSave));
    dispatch(getCartCount());

    if (storeData?.themeSetting?.cart_notification?.cart_notification) {
      setShowCart(true);
    } else {
      router.push(`/cart`);
    }
  };

  const buyNow = () => {
    dispatch(removeAllCartItem());
    const productToSave: ProductStoreType = {
      product_id: product.id,
      variant_id: finalItem.id,
      item_id: productItem.id,
      product_name: product.title,
      variant_name: productItem?.variation_title || "",
      //thumb: product.images ? product.images[0] : "",
      thumb:
        finalItem && finalItem.image_url
          ? finalItem.image_url
          : product.thumb
          ? product?.thumb[0]
          : "",
      price: productItem.price,
      quantity: count,
      handle: product.handle,
      weight: productItem.weight,
      //specialPriceHtml: productItem.specialPriceHtml,
      // special_price: productItem.special_price,
      //  discount: productItem.discount,
      priceHtml: productItem.priceHtml,
    };
    dispatch(addCartProduct(productToSave));
    dispatch(getCartCount());
    router.push(`/checkouts`);
  };

  const [showCart, setShowCart] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleWhatsappRedirect = (type) => {
    const id = product.id;
    const params = {
      type: type,
      variant_id: finalItem?.id,
      item_id: finalItem?.item?.id || product?.item?.id,
      product_name: product.title,
      variant_name: finalItem?.title,
    };
    setLoading(true);
    productsService
      .getStaffDetails(id, params)
      .then((data) => {
        if (data) {
          let whatsappTextTemplateI = whatsappTextTemplate;
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{product_name}}/g,
            product.title
          );
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{variant_name}}/g,
            finalItem?.title ? finalItem?.title + " " : ""
          );
          whatsappTextTemplateI = String(whatsappTextTemplateI).replace(
            /{{store_name}}/g,
            storeData?.store_detail?.name + " "
          );
          const RECEIVER_PHONE = data.phone
            ? data.phone
            : storeData?.store_detail.phone;

          const uuidv4 = data.uuidv4;
          whatsappTextTemplateI = whatsappTextTemplateI + " " + uuidv4;
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
    const id = product.id;
    const params = {
      type: type,
      variant_id: finalItem?.id,
      item_id: finalItem?.item?.id || product?.item?.id,
      product_name: product.title,
      variant_name: finalItem?.title,
    };
    productsService
      .getStaffDetails(id, params)
      .then((data) => {
        if (data) {
          setStaffDetail({ phone: data.phone, uuidv4: data.uuidv4 });
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
    <section className="product-content">
      <ViewCart data={{ showCart, setShowCart }} />
      <WhatsappFormPopup
        data={{
          showPopup,
          setShowPopup,
          product,
          finalItem,
          staffDetail,
          whatsappTextTemplate,
          whatsappSetting,
        }}
      />
      {/* Product Info */}
      <div className="product-content__info">
        <p>{product.product_type}</p>
        <h2 className="product__name">{product.title}</h2>
        <div
          className={`product__price  ${
            productItem.discount ? "product__price--discount" : ""
          }`}
        >
          <p>{productItem.priceHtml}</p>
          {productItem.discount ? (
            <p className="prices__sales">{productItem.specialPriceHtml}</p>
          ) : null}

          {productItem.discount ? (
            <span className="product__label--sale">SALE</span>
          ) : productItem.quantity === 0 && productItem.track_qty ? (
            <span className="product__label--soldout">SOLD OUT</span>
          ) : null}
        </div>

        {/* OPTIONS*/}
        {product.Product_Options.length ? (
          <div className="product__options">
            {product.Product_Options.map((option) => {
              return (
                <div className="product__variant">
                  <h5>{option.name}</h5>
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

        {/* TRACK QUANTITY */}
        {productItem.quantity > 0 && productItem.track_qty ? (
          <>
            <div className="product__stock">
              <div className="product__stock__in-stock">
                <h5>{productItem.quantity} in stock</h5>
                <ProgressBar now={productItem.quantity} />
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Checkout */}

      <Checkout
        productItem={productItem}
        product={product}
        count={count}
        setCount={setCount}
        loading={loading}
        setLoading={setLoading}
        addToCart={addToCart}
        selectedOption={selectedOption}
        buyNow={buyNow}
        handleWhatsappRedirect={handleWhatsappRedirect}
        handleWhatsappFrom={handleWhatsappFrom}
        checkoutType={checkoutType}
      />

      {/* AVAILABALITIY */}
      {/* <div className="product__availability">
        <div className="product__availability__info">
          <IcCheck />
          <div>
            <p>
              Pickup available at Ottawa Warehouse Usually ready in 24 hours
            </p>
            <button type="button" className="button  button-red--underline">
              Check availability at other stores
            </button>
          </div>
        </div>
      </div> */}

      {/* Specification */}
      <div className="product__specification">
        <div className="product__specification__item">
          <IcDurable />
          <p>Durable</p>
        </div>
        <div className="product__specification__item">
          <IcVegan />
          <p>100% Vegan</p>
        </div>
        <div className="product__specification__item">
          <IcWaterResistant />
          <p>Water Resistant</p>
        </div>
        <div className="product__specification__item">
          <IcCrueltyFree />
          <p>Cruelty Free</p>
        </div>
      </div>

      {/* Other Info */}
      <OtherInfo product={product} />
    </section>
  );
};

export default Content;
