import { useState, useEffect, useRef } from "react";

import Head from "next/head";
import Header from "components/layouts/header";
import Footer from "components/layouts/footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store";
import dynamic from "next/dynamic";
// const Header = dynamic(() => import("components/layouts/header"), {
//   ssr: false,
// });
type LayoutType = {
  title?: string;
  children?: React.ReactNode;
  metaData?: any;
  headerColor?: "black" | "white";
  customClassnameMain?: String;
};

export default ({
  children,
  metaData,
  headerColor = "black",
  customClassnameMain = "",
}: LayoutType) => {
  const router = useRouter();
  const { storeData } = useSelector((state: RootState) => state.store);
  const [title, setTitle] = useState<any>(
    metaData?.store_name || storeData?.store_detail?.name || "Test Store"
  );
  const [siteHeaderHeight, setsiteHeaderHeight] = useState(86);
  const siteHeaderRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      // entries is an array of observed elements
      if (entries && entries.length > 0) {
        const { height } = entries[0].contentRect;
        setsiteHeaderHeight(height);
      }
    });

    if (siteHeaderRef.current) {
      observer.observe(siteHeaderRef.current);
    }

    return () => {
      if (siteHeaderRef.current) {
        observer.unobserve(siteHeaderRef.current);
      }
    };
  }, []);

  // const [announcementData, setAnnouncementData] = useState<any>([]);
  // const { show_announcement, home_page, barColor, textColor, text } =
  // announcementData;

  useEffect(() => {
    metaData?.title && setTitle(`${metaData?.title} - ${metaData?.store_name}`);
    storeData?.store_detail && setTitle(`${storeData?.store_detail?.name}`);
    // const getSiteHeaderHeight =
    //   document.getElementById("site-header")?.clientHeight || 80;

    // setsiteHeaderHeight(getSiteHeaderHeight);
    // setAnnouncementData(storeData?.headerSetting?.announcement);
  }, []);

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content={metaData && metaData?.description} />

        <meta property="og:site_name" content={metaData?.store_name} />
        <meta property="og:url" content={metaData && metaData?.url} />
        <meta property="og:title" content={metaData && metaData?.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={metaData && metaData?.description}
        />
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="628"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={metaData && metaData?.title} />
        <meta
          name="twitter:description"
          content={metaData && metaData?.description}
        ></meta> */}
      </Head>
      <Header
        headerColor={headerColor}
        withMenu={true}
        siteHeaderRef={siteHeaderRef}
        siteHeaderHeight={siteHeaderHeight}
      />
      <main
        className={`main-page ${customClassnameMain} ${
          storeData?.headerSetting?.announcement.show_announcement === true &&
          storeData?.headerSetting?.announcement.home_page === false
            ? "main-page--spacing"
            : storeData?.headerSetting?.announcement.show_announcement &&
              storeData?.headerSetting?.announcement.home_page &&
              router.pathname === "/"
            ? "main-page--spacing-home"
            : ""
        }`}
        style={{ paddingTop: siteHeaderHeight }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
