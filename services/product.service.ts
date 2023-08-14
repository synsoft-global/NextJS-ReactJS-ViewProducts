import ClientSr from "./client-server";
const COLLECTIONS_PATH = "/home/collections";
const COLLECTION_PATH = "/home/collection";
const PRODUCTS_PATH = "/home/products";
const PRODUCT_PATH = "/home/product";
const PRODUCT_PATH_ID = "/home/productbyid";
const MENU_PATH_ID = "/home/menus";
const PAGE_DATA_PATH = "/home/pageBySlug";
const SEETING_PATH = "/home/settings/get_setting";
const PRODUCT_TYPE_PATH = "/home/product_type";
const PRODUCT_VENDOR_PATH = "/home/vendors";
const GET_ORDER_DETAILS = "/cart/order/";
const CREATE_WHATSAPP_ORDER_PATH = "/home/whatsapp_order";
const GET_STAFF_DETAILS = "/home/getHandleBy";
const GET_STORE_DETAILS = "/home/storeDetail";
const THEME_DATA_PATH = "/home/themeData";

class Products extends ClientSr {
  getStoreDetails(data) {
    return this.GET(GET_STORE_DETAILS, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getCollections(params) {
    return this.GET(COLLECTIONS_PATH, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getCollection({ handle, sub }) {
    return this.GET(`${COLLECTION_PATH}/${handle}`, { subDomain: sub })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getProducts(params) {
    return this.GET(PRODUCTS_PATH, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getProduct({ slug, subDomain }) {
    return this.GET(`${PRODUCT_PATH}/${slug}`, { subDomain })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getProductByID(id) {
    return this.GET(`${PRODUCT_PATH_ID}/${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getMenus(params) {
    return this.GET(`${MENU_PATH_ID}`, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getPageData(params) {
    return this.GET(`${PAGE_DATA_PATH}/${params}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getPageDataBySlug({ params, sub }) {
    return this.GET(`${PAGE_DATA_PATH}/${params}`, { subDomain: sub })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  async getSettings({ code, sub }) {
    return this.GET(`${SEETING_PATH}/${code}`, { subDomain: sub })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getProductType(params) {
    return this.GET(PRODUCT_TYPE_PATH, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getProductVendor(params) {
    return this.GET(PRODUCT_VENDOR_PATH, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getOrderDetailsList({ orderId, order_key, sub }) {
    return this.GET(GET_ORDER_DETAILS + orderId, { order_key, subDomain: sub })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  CREATE_WHATSAPP_ORDER(params) {
    return this.POST(CREATE_WHATSAPP_ORDER_PATH, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.message;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getStaffDetails(handle, params) {
    return this.POST(`${GET_STAFF_DETAILS}/${handle}`, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getThemeData({ params, sub }) {
    return this.GET(`${THEME_DATA_PATH}/${params}`, { subDomain: sub })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
}

const productsService = new Products();

export default productsService;
