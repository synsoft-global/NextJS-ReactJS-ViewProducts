import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import IcShoppintBag from "assets/icons/IcShoppingBag";
import IcSearch from "assets/icons/IcSearch";
import { useMediaQuery } from "react-responsive";
import { setHomeDetails, setStoreDetails } from "store/reducers/store";
import userService from "services/user.service";
import { useDispatch } from "react-redux";
import themeServices from "services/theme.service";
import { setUserData } from "store/reducers/user";
import NavMenu from "./nav-menu";
import SearchForm from "./search-form";
import { deleteCookie } from "cookies-next";
import Url from "url-parse";
import AnnouncementBar from "./announcement-bar";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
import StorageApi from "services/storage.service";
import useBetterMediaQuery from "hocs/useBetterMediaQuery";

type HeaderType = {
  isErrorPage?: Boolean;
  headerColor?: "black" | "white";
  withMenu?: Boolean;
  siteHeaderRef?: any;
  siteHeaderHeight?: number;
};

export async function getInitialProps(context) {
  // Fetch data from external API
  const { req, query, res, asPath, pathname } = context;
  if (req) {
    let host = req.headers.host; // will give you localhost:3000
    alert(host);
  }
  // Pass data to the page via props
}

const Header = ({
  isErrorPage,
  headerColor = "black",
  withMenu = true,
  siteHeaderRef,
  siteHeaderHeight,
}: HeaderType) => {
  const router = useRouter();
  const isMobileAndTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  // const isMobileAndTablet = useBetterMediaQuery({
  //   query: "(max-width: 1023px)",
  // });

  // const { Order_Items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  const { countries, home, storeData } = useSelector(
    (state: RootState) => state.store
  );
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const { href } = window.location;
    const subDomain = href
      .replace("https://", "")
      .replace("http://", "")
      .split(".");
    let sub;
    if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
      sub = subDomain[0];
    }
    if (countries && countries.length == 0) {
      userService
        .getStoreDetails({ subDomain: sub })
        .then((data) => {
          StorageApi.removeItem("x-mengantar-id");
          if (sub) {
            StorageApi.setItem("x-mengantar-id", data.store_detail.id);
          }
          dispatch(
            setStoreDetails({
              countries: data.countries,
              states: data.states,
              storeData: data,
              subDomain: sub,
              headerRefHeight: siteHeaderHeight,
            })
          );
        })
        .catch((err) => {
          if (sub) {
            var url = new Url(href);
            window.location.href = `${url.protocol}//${url.host.replace(
              sub + ".",
              ""
            )}/not-found`;
          }
        });
    }
  }, []);

  useEffect(() => {
    if (user.token) {
      userService
        .getProfileDetail({
          token: user.token,
        })
        .catch((err) => {
          dispatch(setUserData({ user: {} }));
          StorageApi.removeItem("token");
          StorageApi.removeItem("user_details");
          deleteCookie("token");
        });
    }
  }, [user.token]);

  const [onTop, setOnTop] = useState(isErrorPage ? false : true);
  const navRef = useRef(null);

  const headerClassOnScroll = ({ siteHeader, colorType = "black" }) => {
    if (window.pageYOffset === 0) {
      siteHeader?.classList.remove("site-header--on-scroll");

      if (colorType === "black")
        siteHeader?.classList.add("site-header--color-black");

      if (colorType === "white")
        siteHeader?.classList.remove("site-header--color-black");

      setOnTop(true);
    } else {
      siteHeader?.classList.remove("site-header--color-black");
      siteHeader?.classList.add("site-header--on-scroll");
      setOnTop(false);
    }
  };

  // START HANDLE HEADER STICKY
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const siteHeader = document.querySelector("#site-header");
    // Check variant color black or white
    if (headerColor === "white") {
      headerClassOnScroll({ siteHeader, colorType: "white" });
      window.onscroll = function () {
        headerClassOnScroll({ siteHeader, colorType: "white" });
      };
    }

    if (headerColor === "black") {
      headerClassOnScroll({ siteHeader });
      window.onscroll = function () {
        headerClassOnScroll({ siteHeader });
      };
    }
  }, [headerColor]);

  // START HANDLE SIDEBAR ON MOBILE
  const openNavbar = () => {
    if (searchOpen) {
      closeSearch();
    }
    const siteHeader = document.querySelector("#site-header");
    siteHeader?.classList.remove("site-header--on-scroll");
    siteHeader?.classList.remove("site-header--color-black");

    const getHtmlTag = document.querySelector("html");
    getHtmlTag?.classList.add("overflow-hidden");

    setMenuOpen(true);
  };

  const closeNavbar = () => {
    const siteHeader = document.querySelector("#site-header");

    if (!onTop) {
      siteHeader?.classList.add("site-header--on-scroll");
    }

    if (onTop && headerColor === "black") {
      siteHeader?.classList.add("site-header--color-black");
    }

    const getHtmlTag = document.querySelector("html");
    getHtmlTag?.classList.remove("overflow-hidden");

    setMenuOpen(false);
  };
  // END HANDLE SIDEBAR ON MOBILE

  // START Handle Search
  const searchRef = useRef(null);
  const openSearch = () => {
    if (menuOpen) {
      closeNavbar();
    }
    const siteHeader = document.querySelector("#site-header");
    siteHeader?.classList.remove("site-header--on-scroll");
    siteHeader?.classList.remove("site-header--color-black");

    const getHtmlTag = document.querySelector("html");
    getHtmlTag?.classList.add("overflow-hidden");
    setSearchOpen(true);
  };

  const closeSearch = () => {
    const siteHeader = document.querySelector("#site-header");

    if (!onTop) {
      siteHeader?.classList.add("site-header--on-scroll");
    }

    if (onTop && headerColor === "black") {
      siteHeader?.classList.add("site-header--color-black");
    }

    const getHtmlTag = document.querySelector("html");
    getHtmlTag?.classList.remove("overflow-hidden");

    setSearchOpen(false);
  };

  // close on click outside search
  useOnClickOutside(searchRef, closeSearch);
  // END Handle Search
  // END HANDLE HEADER STICKY

  const isShowAnnouncement = () => {
    const showAnnouncement =
      storeData?.headerSetting?.announcement?.show_announcement;
    const showAnnouncementHomePageOnly =
      storeData?.headerSetting?.announcement?.home_page;

    if (showAnnouncement && showAnnouncementHomePageOnly === false) return true;
    if (
      showAnnouncement &&
      showAnnouncementHomePageOnly &&
      router.pathname === "/"
    )
      return true;
    return false;
  };

  return (
    <div
      className={`header-main ${
        isShowAnnouncement() ? "header-main--announcement" : ""
      } `}
    >
      <header id="site-header" ref={siteHeaderRef} className={`site-header`}>
        {/* ANNOUNCEMENT BAR*/}
        {withMenu &&
        storeData?.headerSetting?.announcement?.show_announcement ? (
          <AnnouncementBar
            announcementData={storeData?.headerSetting?.announcement}
          />
        ) : null}

        <div className="pp-container">
          <div
            className={
              withMenu ? "site-header__inner" : "site-header__inner not-menu"
            }
          >
            {storeData?.headerSetting?.logo_alignment.toLowerCase() ===
            "centered" ? (
              <>
                {withMenu && isMobileAndTablet && (
                  <button
                    onClick={menuOpen ? closeNavbar : openNavbar}
                    className="site-header__btn-menu site-header__btn-menu--left"
                  >
                    <i
                      className={`btn-hamburger ${menuOpen ? "is-active" : ""}`}
                    >
                      <span></span>
                    </i>
                  </button>
                )}
                {isMobileAndTablet ? null : !withMenu ? null : (
                  <NavMenu
                    isMobileAndTablet={isMobileAndTablet}
                    user={user}
                    storeData={storeData}
                    navRef={navRef}
                    menuOpen={menuOpen}
                    siteHeaderHeight={siteHeaderHeight}
                  />
                )}
                <div className="site-logo ">
                  <Link href="/">
                    {storeData?.headerSetting?.logo_image ? (
                      <img
                        src={getSizedImageUrl(
                          storeData?.headerSetting.logo_image,
                          "thumbnail"
                        )}
                        style={{
                          maxWidth: storeData?.headerSetting.custom_logo_width,
                        }}
                      />
                    ) : (
                      storeData?.store_detail?.name
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="site-logo site-logo--left">
                  <Link href="/">
                    {storeData?.headerSetting?.logo_image ? (
                      <img
                        src={getSizedImageUrl(
                          storeData?.headerSetting.logo_image,
                          "thumbnail"
                        )}
                        style={{
                          maxWidth: storeData?.headerSetting.custom_logo_width,
                        }}
                      />
                    ) : (
                      storeData?.store_detail?.name
                    )}
                  </Link>
                </div>
                {withMenu && isMobileAndTablet && (
                  <button
                    onClick={menuOpen ? closeNavbar : openNavbar}
                    className="site-header__btn-menu"
                  >
                    <i
                      className={`btn-hamburger ${menuOpen ? "is-active" : ""}`}
                    >
                      <span></span>
                    </i>
                  </button>
                )}

                {isMobileAndTablet ? null : !withMenu ? null : (
                  <NavMenu
                    isMobileAndTablet={isMobileAndTablet}
                    user={user}
                    storeData={storeData}
                    navRef={navRef}
                    menuOpen={menuOpen}
                    siteHeaderHeight={siteHeaderHeight}
                  />
                )}
              </>
            )}

            {withMenu && (
              <div className="site-header__actions">
                {isMobileAndTablet ? null : (
                  <Link
                    className="site-nav__link"
                    href={user.id ? "/account/profile" : "/login"}
                  >
                    Account
                  </Link>
                )}

                <button onClick={searchOpen ? closeSearch : openSearch}>
                  <IcSearch />
                </button>

                <Link href="/cart" className="btn-cart">
                  <>
                    <IcShoppintBag />
                    {cart.Order_Items.length > 0 ? (
                      <div className="btn-cart__count">
                        <span>
                          {cart.Order_Items.reduce((sum, object) => {
                            return sum + object.quantity;
                          }, 0)}
                        </span>
                      </div>
                    ) : null}
                  </>
                </Link>
              </div>
            )}

            {!withMenu && (
              <Link href="/register" className="button button-black ">
                SIGN UP
              </Link>
            )}
          </div>
        </div>
      </header>

      {isMobileAndTablet ? (
        !withMenu ? null : (
          <NavMenu
            isMobileAndTablet={isMobileAndTablet}
            user={user}
            storeData={storeData}
            navRef={navRef}
            menuOpen={menuOpen}
            siteHeaderHeight={siteHeaderHeight}
          />
        )
      ) : null}

      {withMenu && (
        <SearchForm
          searchOpen={searchOpen}
          closeSearch={closeSearch}
          isMobileAndTablet={isMobileAndTablet}
          siteHeaderHeight={siteHeaderHeight}
        />
      )}
    </div>
  );
};

export default Header;
