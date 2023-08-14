import { Range } from "rc-slider";
import { useContext, useEffect, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import productsService from "services/product.service";
import { RootState } from "store";
import IcAcordionPlus from "assets/icons/IcAcordionPlus";
import IcAcordionStrip from "assets/icons/IcAcordionStrip";
import IcChevronBlack from "assets/icons/IcChevronBlack";
import ButtonCustom from "components/shared/button-custom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CheckboxCustom from "components/shared/checkbox-custom";
import RadioCustom from "components/shared/radio-custom";
import { event } from "utils/gtag";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import useHeaderHeight from "hocs/useHeaderHeight";
const FilterOptions = ({
  onChangeFilter,
  productFilter,
  setProductFilter,
  handleResetFilter,
  maxprice,
}) => {
  const [pageProductType, setPageProductType] = useState(1);
  const [pageProductVendor, setPageProductVendor] = useState(1);
  const [productTypeTotal, setProductTypeTotal] = useState(0);
  const [productVendorTotal, setProductVendorTotal] = useState(0);
  const router = useRouter();
  const [productTypeList, setProductTypeList] = useState<any[]>([]);
  const [productVendorList, setProductVendorList] = useState<any[]>([]);
  const { storeData } = useSelector((state: RootState) => state.store);
  const currency = storeData.store_detail && storeData.store_detail.currency;
  const { query }: any = router;

  useEffect(() => {
    productFilter.max_price = query.max_price || maxprice;
    // productFilter.min_price = query.min_price || 0;
    setProductFilter({ ...productFilter });
  }, [maxprice]);

  useEffect(() => {
    getProductType();
  }, [pageProductType]);

  useEffect(() => {
    getProductVendor();
  }, [pageProductVendor]);

  // get all product type
  const getProductType = () => {
    const param = { page: pageProductType, pageSize: 10 };
    productsService
      .getProductType(param)
      .then((data) => {
        if (data && data.product_types) {
          const newProduct = data.product_types;
          setProductTypeList([...productTypeList, ...newProduct]);
          setProductTypeTotal(data.totalCount);
        } else {
          setProductTypeList([]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // get all vendor type
  const getProductVendor = () => {
    const param = { page: pageProductVendor, pageSize: 10 };
    productsService
      .getProductVendor(param)
      .then((data) => {
        if (data && data.vendors) {
          const newVendor = data.vendors;
          setProductVendorList([...productVendorList, ...newVendor]);
          setProductVendorTotal(data.totalCount);
        } else {
          setProductVendorList([]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const ContextAwareToggle = ({ eventKey, title = "", callback }: any) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey?.includes(eventKey);

    return (
      <div onClick={decoratedOnClick} className="accordion__header">
        <h3>{title}</h3>
        {/* <span>
          {isCurrentEventKey ? <IcAcordionStrip /> : <IcAcordionPlus />}
        </span> */}
        <span className={isCurrentEventKey ? "rotated" : ""}>
          <IcChevronBlack />
        </span>
      </div>
    );
  };

  // load more product type

  const handleLoadMore = () => {
    setPageProductType(pageProductType + 1);
  };
  const handleLoadMoreVendor = () => {
    setPageProductVendor(pageProductVendor + 1);
  };

  // change filter for sort by
  const onProductSortByChange = (event) => {
    productFilter.sortBy = event.target.value;
    setProductFilter({ ...productFilter });
    onChangeFilter();
  };

  const onproductStockChange = (event) => {
    productFilter.availability = event.target.value;
    setProductFilter({ ...productFilter });
    onChangeFilter();
  };

  const onProductpriceChange = (event) => {
    productFilter.min_price = event[0];
    productFilter.max_price = event[1];
    setProductFilter({ ...productFilter });
    onChangeFilter();
  };

  // change filter by product vendor
  const onProductVendorChange = (item) => {
    const index = productFilter.productVendor.indexOf(item);
    if (index > -1) {
      productFilter.productVendor.splice(index, 1);
    } else {
      productFilter.productVendor.push(item);
    }
    setProductFilter({ ...productFilter });
    onChangeFilter();
  };

  // change filter for product type
  const onProductTypeChange = (item) => {
    const index = productFilter.productType.indexOf(item);
    if (index > -1) {
      productFilter.productType.splice(index, 1);
    } else {
      productFilter.productType.push(item);
    }
    setProductFilter({ ...productFilter });
    onChangeFilter();
  };

  // GET SITE HEADER HEIGHT
  const isTabletLG = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const headerHeight = useHeaderHeight();

  return (
    <div
      className={`products-filter__options`}
      style={{ top: isTabletLG ? `calc(${headerHeight}px + 20px)` : "unset" }}
    >
      <div className="products-filter__inner">
        <Accordion className="products-filter__accordion" alwaysOpen>
          <div className="accordion__item accordion__item--radio" key={1}>
            <ContextAwareToggle eventKey="0" title="AVAILABILITY" />
            <Accordion.Collapse eventKey="0">
              <div className="accordion__body ">
                <Form
                  onChange={onproductStockChange}
                  defaultValue={productFilter.availability}
                >
                  <RadioCustom
                    name="availability"
                    value="instock"
                    label="In stock"
                    reverse
                  />
                  <RadioCustom
                    name="availability"
                    value="outofstock"
                    label="Out of Stock"
                    reverse
                  />
                </Form>
              </div>
            </Accordion.Collapse>
          </div>
          <div className="accordion__item accordion__item--price" key={2}>
            <ContextAwareToggle eventKey="1" title="PRICE" />
            <Accordion.Collapse eventKey="1">
              <div className="accordion__body">
                {/* MIN MAX WITH INPUT ELEMENT */}
                {/* <div className="products-filter__input">
                  <NumericFormat
                    value={productFilter?.min_price}
                    displayType="input"
                    prefix={currency + " "}
                    disabled={true}
                  />
                  <NumericFormat
                    value={productFilter?.max_price}
                    displayType="input"
                    prefix={currency + " "}
                    disabled={true}
                  />
                </div> */}
                {/* MIN MAX WITH SPAN ELEMENT */}
                <div className="products-filter__labels">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                      <Tooltip id="button-tooltip" {...props}>
                        {`${currency} ${productFilter?.min_price}`}
                      </Tooltip>
                    )}
                  >
                    <span>{`${currency} ${productFilter?.min_price}`}</span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                      <Tooltip id="button-tooltip" {...props}>
                        {`${currency} ${productFilter?.max_price}`}
                      </Tooltip>
                    )}
                  >
                    <span>{`${currency} ${productFilter?.max_price}`}</span>
                  </OverlayTrigger>
                </div>
                <div className="products-filter__range">
                  <Range
                    defaultValue={[0, maxprice]}
                    value={[productFilter?.min_price, productFilter?.max_price]}
                    onChange={onProductpriceChange}
                    max={maxprice}
                  />
                </div>
              </div>
            </Accordion.Collapse>
          </div>
          {/* <div className="accordion__item accordion__item--radio" key={3}>
            <ContextAwareToggle eventKey="2" title="SIZE" />
            <Accordion.Collapse eventKey="2">
              <div className="accordion__body">
                <Form onChange={onAvailabilityChange}>
                  {[38, 39, 40].map((item, index) => (
                    <RadioCustom
                      value={item}
                      name="size"
                      label={item}
                      reverse
                    />
                  ))}
                </Form>
              </div>
            </Accordion.Collapse>
          </div> */}
          <div className="accordion__item accordion__item--checkbox" key={4}>
            <ContextAwareToggle eventKey="3" title="PRODUCT TYPE" />
            <Accordion.Collapse eventKey="3">
              <div className="accordion__body">
                <Form>
                  {productTypeList.map((item, index) => (
                    <CheckboxCustom
                      reverse
                      id={`product-type-${index}`}
                      key={`product-type-${index}`}
                      label={item}
                      checked={productFilter.productType.indexOf(item) > -1}
                      onChange={() => onProductTypeChange(item)}
                    />
                  ))}
                  {/* <RadioCustom
                      key={`productTypeList-${index}`}
                      value={item}
                      name="product-type"
                      label={item}
                      index={index}
                      defaultValue={productFilter.productType}
                      reverse
                    /> */}
                </Form>
                {productTypeTotal === productTypeList.length ? null : (
                  <button
                    onClick={handleLoadMore}
                    type="submit"
                    className="button  button-white button-submit"
                  >
                    Load more
                  </button>
                )}
              </div>
            </Accordion.Collapse>
          </div>
          <div className="accordion__item accordion__item--checkbox" key={5}>
            <ContextAwareToggle eventKey="4" title="PRODUCT VENDOR" />
            <Accordion.Collapse eventKey="4">
              <div className="accordion__body">
                <Form>
                  {productVendorList.map((item, index) => (
                    <>
                      <CheckboxCustom
                        reverse
                        id={`product-vendor-${index}`}
                        key={`product-vendor-${index}`}
                        label={item}
                        checked={productFilter.productVendor.indexOf(item) > -1}
                        onChange={() => onProductVendorChange(item)}
                      />
                      {/* <RadioCustom
                      key={`productVendorList-${index}`}
                      value={item}
                      name="product-type"
                      label={item}
                      index={index}
                      defaultValue={productFilter.productVendor}
                       reverse
                    /> */}
                    </>
                  ))}
                </Form>
                {productVendorTotal === productVendorList.length ? null : (
                  <ButtonCustom
                    onClick={handleLoadMoreVendor}
                    type="submit"
                    variant="white"
                    className="button-submit"
                  >
                    Load more
                  </ButtonCustom>
                )}
              </div>
            </Accordion.Collapse>
          </div>
          <div className="accordion__item accordion__item--radio" key={6}>
            <ContextAwareToggle eventKey="5" title="SORT BY" />
            <Accordion.Collapse eventKey="5">
              <div
                className="accordion__body"
                defaultValue={productFilter.sortBy}
              >
                <Form onChange={onProductSortByChange}>
                  {[
                    { label: "Best selling", value: "order_count%2Bdesc" },
                    { label: "Alphabetically, A-Z", value: "title%2Basc" },
                    { label: "Alphabetically, Z-A", value: "title%2Bdesc" },
                    { label: "Price, low to high", value: "price%2Basc" },
                    { label: "Price, high to low", value: "price%2Bdesc" },
                    { label: "Date, old to new", value: "createdAt%2Basc" },
                    { label: "Date, new to old", value: "createdAt%2Bdesc" },
                  ].map((item, index) => (
                    <RadioCustom
                      key={`sort-by-${index}`}
                      id={`sort-by-${index}`}
                      value={item.value}
                      name="sort-by"
                      label={item.label}
                      reverse
                    />
                  ))}
                </Form>
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion>
        <div className="products-filter__footer">
          <ButtonCustom
            onClick={handleResetFilter}
            type="submit"
            variant="black--underline"
            textTransform="capitalize"
          >
            Reset Filter
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
