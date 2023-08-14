import React from "react";
import Link from "next/link";
import themeData from "../utils";

const ContentMenu = ({ item }) => {
  return (
    <div
      className={`custom__item custom__item--menu  ${
        themeData.container_width[
          item.data["CustomContent.menu.container_width"]
        ]
      } ${
        themeData.vertical_alignment[
          item.data["CustomContent.menu.vertical_alignment"]
        ]
      }`}>
      <span className="custom__item__inner">
        <div className="custom__item--menu__wrapper">
          {item.menu &&
            item.menu.NavigationMenuItems.map((item: any, index) => {
              return (
                <Link href={`/${item.link}`} key={index}>
                  {" "}
                  {item.name}
                </Link>
              );
            })}
        </div>
      </span>
    </div>
  );
};

export default ContentMenu;
