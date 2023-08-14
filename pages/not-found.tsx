import Layout from "../layouts/Main";
// import { useDispatch } from "react-redux";
import themeServices from "services/theme.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Head from "next/head";
import Header from "components/layouts/header";
import Link from "next/link";
import IllustNotFound from "../assets/images/IllustNotFound";
const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

type NotFoundType = {
  title?: string;
  metaData?: any;
  homeHeaderColor?: any;
};

export default ({ metaData, homeHeaderColor = null }: NotFoundType) => {
  const { storeData } = useSelector((state: RootState) => state.store);
  const [title, setTitle] = useState<any>(
    metaData?.store_name || storeData?.store_detail?.name || "Test Store"
  );

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
      <Header headerColor={homeHeaderColor} withMenu={false} />
      <div className="not-found-page">
        <IllustNotFound />
        <h3>Sorry, this shop is currently unavailable.</h3>
        <Link
          href={`${BackendUrl}/signup`}
          className="button button-black "
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

// export default NotFound;
