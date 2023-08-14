import Client from "./client";
const THEME_DATA_PATH = "/home/themeData";
const FAQLIST_DATA_PATH = "/home/faqs";

class Theme extends Client {
  getThemeData(params?) {
    return this.GET(`${THEME_DATA_PATH}/${params}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  getFAQListData() {
    return this.GET(FAQLIST_DATA_PATH)
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
const themeServices = new Theme();
export default themeServices;
