import React from "react";
import Head from "next/head";

interface IMetaProps {
  data: IMetaTag[];
}

interface IMetaTag {
  type:
    | "og:site_name"
    | "og:url"
    | "og:title"
    | "og:type"
    | "og:image:secure_url"
    | "og:image:width"
    | "og:image:height"
    | "og:image"
    | "og:description"
    | "description"
    | "twitter:card"
    | "twitter:title"
    | "twitter:description"
    | "title";
  content: string;
}

const Meta = ({ data }: IMetaProps) => {
  return (
    <Head>
      {data
        .filter((x) => x.type != "title")
        .map((tag, index) => (
          <meta
            key={`meta-${index}`}
            property={tag.type}
            content={tag.content}
          />
        ))}
      {data
        .filter((x) => x.type == "title")
        .map((tag, index) => (
          <title key={`title-${index}`}>{tag.content}</title>
        ))}
    </Head>
  );
};

export default Meta;
