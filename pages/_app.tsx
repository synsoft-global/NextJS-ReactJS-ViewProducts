import React, { Fragment, useEffect } from "react";
import Router, { useRouter } from "next/router";
import App from "next/app";
// types
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

// global styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "react-rater/lib/react-rater.css";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.css";
// import "rc-slider/assets/index.css";
// import "react-rater/lib/react-rater.css";

// layout styles
import "../assets/styles/layouts/main.scss";
import "../assets/styles/layouts/header.scss";
import "../assets/styles/layouts/footer.scss";

// shared styles
import "../assets/styles/shared/checkbox-custom.scss";
import "../assets/styles/shared/radio-custom.scss";
import "../assets/styles/shared/star-rate.scss";
import "../assets/styles/shared/whatsapp-form-popup.scss";
import "../assets/styles/shared/view-cart.scss";
import "../assets/styles/shared/breadcrumb.scss";
import "../assets/styles/shared/product-card.scss";
import "../assets/styles/shared/product-collections-slider.scss";
import "../assets/styles/shared/input-custom.scss";
import "../assets/styles/shared/async-select-custom.scss";
import "../assets/styles/shared/dropdown-custom.scss";

// theme-block styles
import "../assets/styles/theme-block/theme-block.scss";
import "../assets/styles/theme-block/background-video.scss";
import "../assets/styles/theme-block/blog-posts.scss";
import "../assets/styles/theme-block/collection-list.scss";
import "../assets/styles/theme-block/custom-content.scss";
import "../assets/styles/theme-block/expandable-content.scss";
import "../assets/styles/theme-block/featured-collection.scss";
import "../assets/styles/theme-block/featured-product.scss";
import "../assets/styles/theme-block/gallery.scss";
import "../assets/styles/theme-block/image-text-overlay.scss";
import "../assets/styles/theme-block/image-text.scss";
import "../assets/styles/theme-block/newsletter.scss";
import "../assets/styles/theme-block/rich-text.scss";
import "../assets/styles/theme-block/slideshow.scss";
import "../assets/styles/theme-block/logo-list.scss";
import "../assets/styles/theme-block/map.scss";
import "../assets/styles/theme-block/testimonial.scss";
import "../assets/styles/theme-block/text-columns-images.scss";
import "../assets/styles/theme-block/video.scss";

// page-specific styles
import "../assets/styles/page-specific/aboutus.scss";
import "../assets/styles/page-specific/faq.scss";
import "../assets/styles/page-specific/collections.scss";
import "../assets/styles/page-specific/checkouts/index.scss";
import "../assets/styles/page-specific/checkouts/thank_you.scss";
import "../assets/styles/page-specific/password.scss";
import "../assets/styles/page-specific/chat/pre-landing.scss";
import "../assets/styles/page-specific/auth.scss";
import "../assets/styles/page-specific/our-story.scss";
import "../assets/styles/page-specific/product.scss";
import "../assets/styles/page-specific/products/index.scss";
import "../assets/styles/page-specific/products/products-featured.scss";
import "../assets/styles/page-specific/products/products-filter.scss";
import "../assets/styles/page-specific/account/profile.scss";
import "../assets/styles/page-specific/account/addresses.scss";
import "../assets/styles/page-specific/account/edit-account.scss";
import "../assets/styles/page-specific/account/shared/account-header.scss";
import "../assets/styles/page-specific/search.scss";

import { PersistGate } from "redux-persist/integration/react";

import { productsService, userService } from "services";
import * as gtag from "./../utils/gtag";
import Head from "next/head";
import { ToastContainer } from "react-nextjs-toast";
const isProduction = process.env.NODE_ENV === "production";
import { getCookie } from "cookies-next";
import * as fbq from "../lib/fbq";
import * as ttq from "../lib/ttq";
import store from "../store";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps, ...rest }: AppProps) => {
  const router = useRouter();
  let persistor = persistStore(store);
  useEffect(() => {
    if (pageProps.redirect) {
      router.push(pageProps.redirect);
    }
  }, []);

  useEffect(() => {
    // Only trigger the Pixel event for production builds
    if (process.env.NODE_ENV === "production") {
      // fbq.pageview();
      // ttq.pageview();
    }
  }, [router.events]);

  // useEffect(() => {
  //   // Store the data in a global variable
  //   window.__DATA__ = {
  //     marketingSetting: pageProps.marketingSetting,
  //   };
  // }, []);

  if (
    typeof window !== "undefined" &&
    window.location.pathname !== "/password"
  ) {
    const host = window.location.host;
    const subdomain = host.split(".")[0];

    const frontPass = getCookie("frontPass");
    const passwordProtection = userService
      .checkPasswordProtection(subdomain, frontPass)
      .then((res) => {
        if (res) {
          router.push("/password");
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  let sub, redirect;
  const appProps = { showActions: false };
  if (ctx.req) {
    const proto =
      ctx.req.headers["x-forwarded-proto"] || ctx.req.connection.encrypted
        ? "https"
        : "http";

    if (ctx.req?.headers?.host) {
      let host = ctx.req?.headers?.host; // will give you localhost:3000
      const subDomain = host?.split(".");
      if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
        sub = subDomain[0];
      }

      const frontPass = getCookie("frontPass", { req: ctx.req, res: ctx.res });
      const passwordProtection = await userService
        .checkPasswordProtection(sub, frontPass)
        .catch((err) => {
          console.log("ERR", err);
        });

      if (passwordProtection) {
        redirect = `/password`;
        return {
          pageProps: {
            redirect,
          },
        };
      }

      if (sub) {
        const StoreData = await productsService
          .getStoreDetails({ subDomain: sub })
          .catch((err) => {
            if (sub) {
              redirect = `${proto}://${host.replace(sub + ".", "")}/not-found`;
            }
          });
        if (StoreData?.marketingSetting?.value) {
          appProps["marketingSetting"] = StoreData.marketingSetting.value;
        }
        if (StoreData?.themeSetting) {
          appProps["themeSetting"] = StoreData.themeSetting;
        }
      }
    }
  }

  return {
    pageProps: {
      ...appProps,
      redirect,
    },
  };
};

export default MyApp;
