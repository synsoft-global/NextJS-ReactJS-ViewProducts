import { Fragment } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import { GA_TRACKING_ID } from "../utils/gtag";

interface DocumentProps extends DocumentInitialProps {
  isProduction: boolean;
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // Check if in production
    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;
    const data = this.props.__NEXT_DATA__.props.pageProps;
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            rel="icon"
            type="image/svg+xml"
            href={data?.themeSetting?.favicon?.favicon_image}
          />

          {/* We only want to add the scripts if in production */}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* {isProduction && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              {data?.marketingSetting?.gaId &&
              data?.marketingSetting?.gaId.length > 0 ? (
                <>
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${data.marketingSetting.gaId}', {
                      page_path: window.location.pathname,
                    });
                  `,
                    }}
                  />
                </>
              ) : (
                ""
              )}

              {data?.marketingSetting?.fbPixelId &&
              data?.marketingSetting?.fbPixelId.length > 0 ? (
                <>
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${data.marketingSetting.fbPixelId}');
              fbq('track', 'PageView');
            `,
                    }}
                  />
                </>
              ) : (
                ""
              )}

              {data?.marketingSetting?.ttPixelId &&
              data?.marketingSetting?.ttPixelId.length > 0 ? (
                <>
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                !function(w,d,t){var s=d.createElement(t);s.src='https://trk.tiktok.com.cn/act/js/tag.js';s.async=true;var e=d.getElementsByTagName(t)[0];e.parentNode.insertBefore(s,e);}
                (window, document, 'script');
                ttq.init({
                  pixelId: '${data?.marketingSetting?.ttPixelId}',
                });
                ttq.track('PageView');
              `,
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </Fragment>
          )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
