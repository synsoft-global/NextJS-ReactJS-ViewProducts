import Layout from "../layouts/Main";
// import { useDispatch } from "react-redux";
import NotFoundPage from "../layouts/404";

import Breadcrumb from "components/shared/breadcrumb";
import { useEffect, useState } from "react";
import productsService from "services/product.service";

import CustomContent from "components/theme-block/custom-content";

import FeaturedProduct from "components/theme-block/featured-product";

import ImageText from "components/theme-block/image-text";
import ImageTextOverlay from "components/theme-block/image-text-overlay";
import Image from "next/image";
import TextColumnsImages from "components/theme-block/text-columns-images";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { useMediaQuery } from "react-responsive";
import Meta from "components/meta/index";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { getSizedImageUrl } from "helpers/imageBucketHelper";
SwiperCore.use([EffectFade, Navigation]);
// get page slug

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;
  let sub;
  if (context?.req) {
    if (context.req?.headers?.host) {
      let host = context.req?.headers?.host; // will give you localhost:3000
      const subDomain = host?.split(".");
      if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
        sub = subDomain[0];
      }
    }
  }
  return productsService
    .getPageDataBySlug({ params: query["page-slug"], sub })
    .then((data) => {
      const newObject = {
        title: data?.seoTitle,
        description: data.seoDescription,
        url: data?.urlHandle,
      };
      return { props: { pageData: data, metaData: newObject } };
    })

    .catch((err) => {
      return { props: { pageData: { Page_Images: [] }, metaData: {} } };
      //setLoading(false);
    });
}

const DynamicPage = ({ pageData, metaData }) => {
  // const [themeData, setThemeData] = useState<any>(pageData);
  const { storeData } = useSelector((state: RootState) => state.store);

  const [views, setViews] = useState<any>([]);
  const mainPage = "";
  const isDesktopXL = useMediaQuery({
    query: "(min-width: 1441px)",
  });
  const components: any = {
    CustomContent: CustomContent,
    ImageText: ImageText,
    ImageTextOverlay: ImageTextOverlay,   
    featured_product: FeaturedProduct,    
    TextColumnsImages: TextColumnsImages,
    Map: Map,
  };

  const arrayComponentHeaderColorWhite = ["Slideshow", "ImageTextOverlay"];
  const [headerColor, setHeaderColor] = useState<any>("black");

  useEffect(() => {
    const themeSetting: any = pageData && pageData.ThemeLayout;
    const tags: any = [];
    themeSetting &&
      themeSetting.setting &&
      themeSetting.setting.map((section: any) => {
        section.isVisibile &&
          components[section.id] &&
          tags.push({
            section: section,
            Component: components[section.id],
          });
      });
    mainPage &&
      components[mainPage] &&
      tags.push({
        Component: components[mainPage],
        section: themeSetting,
      });

    if (tags.length) {
      if (arrayComponentHeaderColorWhite.includes(tags[0].section.id)) {
        setHeaderColor("white");
      }
    }
    setViews(tags);
  }, [pageData]);

  return (
    <Layout
      customClassnameMain={`main-page--home ${
        headerColor === "white" ? "main-page--pt-0" : ""
      }`}
      headerColor={headerColor}
    >
      <Meta
        data={[
          {
            type: "title",
            content: metaData.title
              ? metaData.title + " - " + storeData?.store_detail?.name
              : pageData &&
                pageData?.title + " - " + storeData?.store_detail?.name,
          },
          { type: "description", content: metaData.description },
          { type: "og:site_name", content: storeData?.store_detail?.name },
          {
            type: "og:url",
            content: "",
          },
          {
            type: "og:title",
            content: metaData.title,
          },
          {
            type: "og:type",
            content: "website",
          },
          {
            type: "og:description",
            content: metaData.description,
          },
          {
            type: "og:image",
            content: "",
          },
          {
            type: "og:image:secure_url",
            content: "",
          },
          {
            type: "og:image:width",
            content: "1200",
          },
          {
            type: "og:image",
            content: "628",
          },

          { type: "twitter:title", content: metaData.title },
          { type: "twitter:card", content: metaData.title },
          { type: "twitter:description", content: metaData.title },
        ]}
      />
      <Breadcrumb />
      {views &&
        views.map((Item: any, i: any) => {
          return <Item.Component key={i} data={Item.section} />;
        })}

      {pageData && !pageData.themeLayoutId && (
        <>
          <div className="custom-pages-heading">
            <h1> {pageData && pageData.title}</h1>
          </div>

          <section className="custom-page">
            <div className="pp-container">
              <section className="page-gallery page-gallery--variant-two">
                {pageData && pageData?.Page_Images.length == 1 ? (
                  <div className="page-gallery__preview">
                    <Image
                      //src={pageData.Page_Images[0].src}
                      src={getSizedImageUrl(
                        pageData.Page_Images[0].src,
                        "medium"
                      )}
                      width={500}
                      height={300}
                      alt="shoes"
                    />
                  </div>
                ) : (
                  <Swiper
                    navigation
                    slidesPerView={isDesktopXL ? 1 : "auto"}
                    spaceBetween={20}
                  >
                    {pageData &&
                      pageData.Page_Images.map((item) => (
                        <SwiperSlide key={item}>
                          <div className="page-gallery__preview">
                            <Image
                              //src={item.src}
                              src={getSizedImageUrl(item.src, "medium")}
                              width={500}
                              height={200}
                              alt="shoes"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </section>
              <section className="page-single__content">
                <div className="custom-pages">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData && pageData.content,
                    }}
                  ></span>
                </div>
              </section>
            </div>
          </section>
        </>
      )}

      {!pageData && (
        <>
          <h2>All</h2>
          <NotFoundPage>This page could not be found.</NotFoundPage>
        </>
      )}
    </Layout>
  );
};

export default DynamicPage;
