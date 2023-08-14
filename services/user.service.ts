import Client from "./client";
import { setCookie, deleteCookie, getCookie, getCookies } from "cookies-next";
import StorageApi from "services/storage.service";

const LOGIN_PATH = "/user/login";
const VERIFY_EMAIL = "/user/verifyEmail";
const SIGNUP_PATH = "/user/register";
const FORGOT_PASSWORD_PATH = "/user/forgotPassword";
const VERIFY_FORGOT_PASSWORD_PATH = "/user/verifyForgotPassword";
const GET_PROFILE_PATH = "/user/profile";
const LOG_OUT_PATH = "/user/logout";
const GET_PROFILE_DETAIL = "/user/profile";
const UPDATE_PROFILE = "/user/updateProfile";
const UPDATE_PASSWORD = "/user/updatePassword";
const ADD_ADDRESS = "/user/address/";
const GET_ADDRESS_LIST = "/user/address/";
const UPDATE_ADDRESS = "/user/address/";
const DELETE_ADDRESS = "/user/address/";
const SEARCH_ADDRESS = "/admin/shipping-address/search";
const SET_DEFAULT_ADDRESS = "/user/setdefault/";
const GET_ORDER_LIST = "/user/order";
const GET_ORDER_DETAILS = "/user/order/";
const GET_STORE_DETAILS = "/home/storeDetail";
const CONTACT_US_PATH = "/home/contact";
const SEETING_PATH = "/home/settings/get_setting";
const PASSWORD_PROTECTION_CHECK_PATH = "/home/password-protection";
const ENTER_FRONTEND_PASSWORD_PATH = "/home/enter-storefront-password";
const STORE_EMAIL_PASSWORD_PROTECTION_PATH =
  "/home/store-email-password-protection";
const VERIFIED_CUSTOMER_TOKEN_API_URL = "/admin/verifyCustomer";
const CUSTOMER_ACCEPT_INVIATION_API_URL = "/admin/acceptCustomer";
const CUSTOMER_INVIATION_DECLINE_API_URL = "/admin/declineCustomer";

class User extends Client {
  getSettings(code) {
    return this.GET(`${SEETING_PATH}/${code}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }
  checkToken(token) {
    return this.GET(
      GET_PROFILE_PATH,
      {},
      {
        token,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.user) {
          StorageApi.setItem("user_details", JSON.stringify(json.user));
          return json.user;
        }
        return json;
      });
  }
  checkPasswordProtection(subDomain, frontPass) {
    return this.GET(PASSWORD_PROTECTION_CHECK_PATH, {
      subDomain,
      frontPass,
    }).then(async (response) => {
      if (response.status === 200) {
        return false;
      }
      const json = await response.json();
      setCookie("passwordProtectionNotification", json.userNotification);
      return true;
    });
  }
  enterFrontendPassword(data) {
    return this.POST(ENTER_FRONTEND_PASSWORD_PATH, data).then(
      async (response) => {
        if (response.status === 200) {
          const decoded = await response.json();
          setCookie("frontPass", decoded.frontPass);
          deleteCookie("passwordProtectionNotification");
          return true;
        }
        return false;
      }
    );
  }
  storeEmailPasswordProtection(data) {
    return this.POST(STORE_EMAIL_PASSWORD_PROTECTION_PATH, data).then(
      async (response) => {
        if (response.status === 200) {
          const decoded = await response.json();
          setCookie("frontPass", decoded.frontPass);
          return true;
        }
        return false;
      }
    );
  }
  logIn({ email, password, token, remember_me }) {
    return this.POST(LOGIN_PATH, {
      email,
      password,
      token,
      remember_me,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success" && json.data.user_info) {
          setCookie("token", json.data.user_info.token);
          if (remember_me) {
            localStorage.setItem("remember_me", remember_me);
          } else {
            localStorage.removeItem("remember_me");
          }

          StorageApi.setItem("token", `${json.data.user_info.token}`);
          StorageApi.setItem(
            "user_details",
            JSON.stringify(json.data.user_info)
          );
          return json;
        } else if (json.data && json.data.message) {
          throw new Error(json.data.message);
        } else {
          throw new Error(json.message);
        }
      });
  }

  logout() {
    deleteCookie("token");
    return this.POST(LOG_OUT_PATH, {}).then((response) => response.json());
  }

  forgotPassword(email) {
    return this.POST(FORGOT_PASSWORD_PATH, email)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json;
        } else {
          throw new Error(json.message);
        }
      });
  }
  resetPassword(data) {
    return this.POST(VERIFY_FORGOT_PASSWORD_PATH, data)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  verifyEmail(email) {
    return this.POST(VERIFY_EMAIL, {
      email,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  signUp(data) {
    return this.POST(SIGNUP_PATH, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success" && json.data.user_info) {
          StorageApi.setItem("token", `${json.data.user_info.token}`);
          StorageApi.setItem(
            "user_details",
            JSON.stringify(json.data.user_info)
          );
          setCookie("token", json.data.user_info.token);
          return json;
        }
        throw new Error(json.message);
      });
  }

  getProfileDetail({ token }) {
    return this.GET(GET_PROFILE_DETAIL)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  updateProfileDetail({ first_name, last_name }) {
    return this.POST(UPDATE_PROFILE, {
      first_name,
      last_name,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  updatePassword({ password, newPassword }) {
    return this.POST(UPDATE_PASSWORD, {
      password,
      newPassword,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  addAddress(data, customerId) {
    return this.POST(ADD_ADDRESS + customerId, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success" && json.data) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  getAddressList({ customerId,params}) {
    return this.GET(GET_ADDRESS_LIST + customerId,params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json;
        } else {
          throw new Error(json.message);
        }
      });
  }
  deleteAddress({ addressId }) {
    return this.DELETE(DELETE_ADDRESS + addressId, "")
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getSearchAddress({ params }) {
    return this.GET(SEARCH_ADDRESS, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  updateAddress(data, addressId) {
    return this.PUT(UPDATE_ADDRESS + addressId, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success" && json.data) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  setDefaultAddress(data, addressId) {
    return this.POST(SET_DEFAULT_ADDRESS + addressId, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success" && json.data) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  getOrderList(params) {
    return this.GET(GET_ORDER_LIST, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

  getOrderDetailsList({ orderId }) {
    return this.GET(GET_ORDER_DETAILS + orderId)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      });
  }

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

  contactUs(data) {
    return this.POST(CONTACT_US_PATH, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return json;
        }
        throw new Error(json.message);
      });
  }
  verifiedCustomerToken(token) {
    return this.POST(VERIFIED_CUSTOMER_TOKEN_API_URL, token)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  customerAcceptInvitation(data) {
    return this.POST(CUSTOMER_ACCEPT_INVIATION_API_URL, data)
      .then((response) => response.json())
      .then((json) => {
        if (json.statuscode == 1) {
          return json;
        }
        throw new Error(json.message);
      });
  }

  invitationDeclined(token) {
    return this.POST(CUSTOMER_INVIATION_DECLINE_API_URL, token)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }
}
const userService = new User();

export default userService;
