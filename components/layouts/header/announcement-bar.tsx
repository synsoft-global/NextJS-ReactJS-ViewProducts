import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AnnouncementBar = ({ announcementData }) => {
  const router = useRouter();
  const { show_announcement, home_page, barColor, textColor, text } =
    announcementData;

  const [hrefLink, setHrefLink] = useState("");
  useEffect(() => {
    if (announcementData.link.value == "Products") {
      setHrefLink(`/product/${announcementData.link.slug}`);
    } else if (announcementData.link.value == "Collections") {
      setHrefLink(`/collection/${announcementData.link.slug}`);
    } else if (announcementData.link.value == "Pages") {
      setHrefLink(`/${announcementData.link.slug}`);
    } else {
      setHrefLink(`#`);
    }
  }, []);

  const AnnouncementBarContent = () => {
    return (
      <div
        className="announcement"
        style={{
          backgroundColor: barColor,
        }}
      >
        <Link
          href={`${hrefLink}`}
          style={{
            color: textColor,
          }}
        >
          {text}
        </Link>
      </div>
    );
  };
  const showAnnouncement = () => {
    if (show_announcement === true && home_page === false)
      return <AnnouncementBarContent />;
    if (show_announcement && home_page && router.pathname === "/")
      return <AnnouncementBarContent />;
    return null;
  };
  return showAnnouncement();
};

export default AnnouncementBar;
