import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import IcFacebook from "assets/icons/components/footer/IcFacebook";
import IcFacebookBlack from "assets/icons/components/footer/IcFacebookBlack";
import IcTwitter from "assets/icons/components/footer/IcTwitter";
import IcTwitterBlack from "assets/icons/components/footer/IcTwitterBlack";
import IcLinkdin from "assets/icons/components/footer/IcLinkdin";
import IcLinkdinBlack from "assets/icons/components/footer/IcLinkdinBlack";
import IcYoutube from "assets/icons/components/footer/IcYoutube";
import IcYoutubeBlack from "assets/icons/components/footer/IcYoutubeBlack";
import IcInstagram from "assets/icons/components/footer/IcInstagram";
import IcInstagramBlack from "assets/icons/components/footer/IcInstagramBlack";
import IcPinterest from "assets/icons/components/footer/IcPinterest";
import IcPinterestBlack from "assets/icons/components/footer/IcPinterestBlack";
import IcVimeo from "assets/icons/components/footer/IcVimeo";
import IcVimeoBlack from "assets/icons/components/footer/IcVimeoBlack";
import IcTumblr from "assets/icons/components/footer/IcTumblr";
import IcTumblrBlack from "assets/icons/components/footer/IcTumblrBlack";

import IcVisa from "assets/icons/components/footer/IcVisa";
import IcMasterCard from "assets/icons/components/footer/IcMasterCard";
import IcAmex from "assets/icons/components/footer/IcAmex";
import IcPaypal from "assets/icons/components/footer/IcPaypal";
import IcDinersClub from "assets/icons/components/footer/IcDinersClub";
import IcDiscover from "assets/icons/components/footer/IcDiscover";

import IcSearchArrowRight from "assets/icons/IcSearchArrowRight";

import { Fragment } from "react";
import store from "store/reducers/store";
import React from "react";

const Footer = () => {
  const isPhone = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const { home } = useSelector((state: RootState) => state.store);
  const { storeData } = useSelector((state: RootState) => state.store);
  const [vissibleItem, setVissibleItem] = useState<any>();
  const IconList = {
    facebook: IcFacebook,
    twitter: IcTwitter,
    linkdin: IcLinkdin,
    youtube: IcYoutube,
    instagram: IcInstagram,
    pinterest: IcPinterest,
    tumblr: IcTumblr,
    vimeo: IcVimeo,
    snapchat: IcVimeo,
  };
  const IconListBlack = {
    facebook: IcFacebookBlack,
    twitter: IcTwitterBlack,
    linkdin: IcLinkdinBlack,
    youtube: IcYoutubeBlack,
    instagram: IcInstagramBlack,
    pinterest: IcPinterestBlack,
    tumblr: IcTumblrBlack,
    vimeo: IcVimeoBlack,
    snapchat: IcVimeoBlack,
  };

  useEffect(() => {
    setVissibleItem(
      storeData?.footerSection?.filter((x) => x.isVisibile).length
    );
  }, [JSON.stringify(storeData?.footerSection)]);

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: storeData.footerSetting
          ? storeData.footerSetting.color["background"]
          : "#413F3F",
        color: storeData.footerSetting
          ? storeData.footerSetting.color["text"]
          : "#FFFFFF",
      }}
    >
      {/*
      Use condition to check light and drak background
      {storeData?.footerSetting?.color?.background_type} */}
      <div className="pp-container">
        <div
          className={`site-footer__top site-footer__top--grid-${vissibleItem}`}
        >
          {storeData.footerSection &&
            storeData.footerSection.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item.id.indexOf("text") > -1 && item.isVisibile ? (
                    <div className="site-footer__about">
                      <h6>{item.data["footer.text.heading"]}</h6>
                      <p>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.data["footer.text.text"],
                          }}
                        ></span>
                      </p>
                    </div>
                  ) : null}
                  {item.id.indexOf("menu") > -1 &&
                  item.isVisibile &&
                  item.navigationMenu ? (
                    <div className="site-footer__links">
                      <div className="site-footer__links__item">
                        <h6>{item.data["footer.menu.heading"]}</h6>

                        {item.navigationMenu?.NavigationMenuItems.map(
                          (item, index) => {
                            return (
                              <Link key={index} href={`/${item.link}`}>
                                {item.name}
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : null}
                  {item.id.indexOf("newslater") > -1 && item.isVisibile ? (
                    <div className="site-footer__offers">
                      <h6>Let’s stay in touch</h6>
                      <p>
                        Sign up for exclusive offers, original stories, events
                        and more.
                      </p>
                      <div className="site-footer__offers__input">
                        <input
                          type="email"
                          name="signup"
                          placeholder="Enter Email"
                        />
                        <IcSearchArrowRight
                          className="search-form__submit"
                          strokeColor={storeData.footerSetting.color["text"]}
                        />
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
        </div>
        <hr
          className={
            storeData?.footerSetting?.color?.background_type === "light"
              ? "border-color-white"
              : "border-color-black"
          }
        />
        <div className="site-footer__bottom">
          <div className="site-footer__bottom__row site-footer__bottom__row--left-side">
            {storeData.themeSetting?.social_media ? (
              <>
                <div className="site-footer__bottom__social-networks">
                  {storeData.themeSetting?.social_media.social_accounts &&
                    Object.keys(
                      storeData.themeSetting?.social_media.social_accounts
                    ).map((x, index) => {
                      return (
                        <Link
                          href={
                            storeData.themeSetting.social_media.social_accounts[
                              x
                            ]
                          }
                          target="blank"
                          key={`social-networks-${index}`}
                        >
                          {React.createElement(
                            storeData?.footerSetting?.color?.background_type ===
                              "light"
                              ? IconList[x]
                              : IconListBlack[x],
                            {}
                          )}
                        </Link>
                      );
                    })}
                </div>
              </>
            ) : null}

            <p className="site-footer__bottom__powered">
              © 2022, {home?.store_detail?.name} Powered by Mengantar
            </p>
          </div>
          <div className="site-footer__bottom__row site-footer__bottom__row--right-side">
            {storeData.footerSetting?.payment_methods?.show_payment_icon ? (
              <div className="site-footer__bottom__cards">
                <Link href="#">
                  <IcVisa />
                </Link>
                <Link href="#">
                  <IcMasterCard />
                </Link>
                <Link href="#">
                  <IcAmex />
                </Link>
                <Link href="#">
                  <IcPaypal />
                </Link>
                <Link href="#">
                  <IcDinersClub />
                </Link>
                <Link href="#">
                  <IcDiscover />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
