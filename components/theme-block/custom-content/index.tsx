import { useEffect, useState } from "react";
import productsService from "services/product.service";

import ContentVariant from "./content-variant";

const CustomContent = ({ data }) => {
  const [customContentData, setCustomContentData] = useState({ ...data });

  useEffect(() => {
    let collections: any = [],
      products: any = [],
      menus: any = [];

    data.items.map((item) => {
      if (item.name == "Collection") {
        collections.push(item.data["CustomContent.collection.collection"]);
      } else if (item.name == "Product") {
        products.push(item.data["CustomContent.product.product"]);
      } else if (item.name == "Menu") {
        menus.push(item.data["CustomContent.menu.menu"]);
      }
    });

    collections = collections.filter((item) => !!item);
    collections = collections.filter((n, i) => collections.indexOf(n) === i);

    products = products.filter((item) => !!item);
    products = products.filter((n, i) => products.indexOf(n) === i);

    menus = menus.filter((item) => !!item);
    menus = menus.filter((n, i) => menus.indexOf(n) === i);

    if (collections && collections.length > 0) {
      const param = {
        ids: collections.join(","),
      };
      productsService
        .getCollections(param)
        .then((data) => {
          customContentData.items = customContentData.items.map((item) => {
            if (
              item.name == "Collection" &&
              item.data["CustomContent.collection.collection"]
            ) {
              const collection = data.collections.find(
                (x) => x.id == item.data["CustomContent.collection.collection"]
              );

              return { ...item, collection };
            }
            return item;
          });
          setCustomContentData({ ...customContentData });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    if (products && products.length > 0) {
      const param = {
        ids: products.join(","),
      };
      productsService
        .getProducts(param)
        .then((data) => {
          customContentData.items = customContentData.items.map((item) => {
            if (
              item.name == "Product" &&
              item.data["CustomContent.product.product"]
            ) {
              const product = data.products.find(
                (x) => x.id == item.data["CustomContent.product.product"]
              );

              return { ...item, product };
            }
            return item;
          });
          setCustomContentData({ ...customContentData });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    if (menus && menus.length > 0) {
      const param = {
        ids: menus.join(","),
      };
      productsService
        .getMenus(param)
        .then((data) => {
          customContentData.items = customContentData.items.map((item) => {
            if (item.name == "Menu" && item.data["CustomContent.menu.menu"]) {
              const menu = data.menus.find(
                (x) => x.id == item.data["CustomContent.menu.menu"]
              );

              return { ...item, menu };
            }
            return item;
          });
          setCustomContentData({ ...customContentData });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  return (
    <section className="custom-content">
      <div className="pp-container">
        {data?.data["CustomContent.heading"] ? (
          <header className="section_heading">
            <h1>{data?.data["CustomContent.heading"]}</h1>
          </header>
        ) : null}

        <div className="custom-content__main">
          {customContentData.items.map((item, index) => {
            return <ContentVariant item={item} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomContent;
