import Layout from "layouts/Main";

import CustomContent from "components/theme-block/custom-content";
import FeaturedProduct from "components/theme-block/featured-product";
import ImageText from "components/theme-block/image-text";
import ImageTextOverlay from "components/theme-block/image-text-overlay";
import TextColumnsImages from "components/theme-block/text-columns-images";

import { useEffect, useState } from "react";
import { productsService, themeServices } from "services";
import { RootState } from "store";
import { setHomeDetails, setStoreDetails } from "store/reducers/store";
import { useDispatch, useSelector } from "react-redux";
import Meta from "components/meta/index";

export async function getServerSideProps(ctx) {
  let sub;
  if (ctx?.req) {
    if (ctx.req?.headers?.host) {
      let host = ctx.req?.headers?.host; // will give you localhost:3000
      const subDomain = host?.split(".");
      if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
        sub = subDomain[0];
      }
    }
  }
  try {
    const preferences = await productsService.getSettings({
      code: "preferences",
      sub,
    });
    const themeDataS = await productsService.getThemeData({
      params: "home",
      sub,
    });
    if (preferences.value) {
      const newObject = {
        title: preferences.value.title,
        description: preferences.value.description,
        url: preferences?.value.sharing_image,
        store_name: preferences.store_detail.name,
      };
      return { props: { metaData: newObject, themeDataS } };
    } else {
      return { props: { metaData: {}, themeDataS: {} } };
    }
  } catch (err) {
    return { props: { metaData: {}, themeDataS: {} } };
  }
}

const arrayComponentHeaderColorWhite = ["Slideshow", "ImageTextOverlay"];

const IndexPage = ({ metaData, themeDataS }) => {
  const [themeData, setThemeData] = useState<any>(themeDataS);
  const { home } = useSelector((state: RootState) => state.store);

  const [headerColor, setHeaderColor] = useState<any>("black");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHomeDetails({ home: themeDataS }));
  }, []);

  const components: any = {
    CustomContent: CustomContent, 
    ImageText: ImageText,
    ImageTextOverlay: ImageTextOverlay,  
    featured_product: FeaturedProduct, 
    TextColumnsImages: TextColumnsImages,    
    Map: Map,
  };

  const [views, setViews] = useState<any>([]);
  const mainPage = "";

  useEffect(() => {
    const themeSetting = themeData?.ThemeLayouts.find((x) => x.slug === "home");
    const tags: any = [];
    themeSetting &&
      themeSetting.setting &&
      themeSetting.setting.map((section: any) => {
        if (section.isVisibile && components[section.id]) {
          tags.push({
            section: section,
            Component: components[section.id],
          });
        }
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
  }, [themeData]);

  return (
    <Layout
      customClassnameMain={`main-page--home 
      ${headerColor === "white" ? "main-page--pt-0" : ""} `}
      headerColor={headerColor}
    >
      <Meta
        data={[
          {
            type: "title",
            content: metaData.title
              ? metaData.title + " - " + metaData.store_name
              : metaData.store_name,
          },
          { type: "description", content: metaData.description },
          { type: "og:site_name", content: metaData.store_name },
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
          { type: "twitter:card", content: "summary_large_image" },
          { type: "twitter:description", content: metaData.description },
        ]}
      />
      {views &&
        views.map((Item: any, i: any) => {
          return <Item.Component key={i} data={Item.section} />;
        })}
    </Layout>
  );
};

export default IndexPage;
