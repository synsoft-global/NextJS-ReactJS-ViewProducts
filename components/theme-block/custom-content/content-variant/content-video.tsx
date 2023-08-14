import React from "react";
import themeData from "../utils";
import ReactPlayer from "react-player";
import IcPlays from "assets/icons/IcPlays";
import ButtonCustom from "components/shared/button-custom";
const ContentVideo = ({ item }) => {
  const config = {
    file: {
      attributes: {
        controlsList: "nodownload",
      },
    },
  };
  return (
    <div
      className={`custom__item--video ${
        themeData.container_width[
          item.data["CustomContent.video.container_width"]
        ]
      } ${
        themeData.vertical_alignment[
          item.data["CustomContent.video.vertical_alignment"]
        ]
      }`}
    >
      <div className="custom__item__inner">
        {item?.data["CustomContent.video.video_link"] ? (
          <ReactPlayer
            url={
              item?.data["CustomContent.video.video_link"]
                ? item.data["CustomContent.video.video_link"]
                : ""
            }
            controls
            playing
            config={config}
            className="react-player"
            playIcon={
              <ButtonCustom variant="white">
                <IcPlays />
              </ButtonCustom>
            }
            light={
              item.data["CustomContent.video.cover_image"]
                ? item.data["CustomContent.video.cover_image"]
                : "/images/rectangle-gray.svg"
            }
          />
        ) : (
          <p className="text-center">
            This section doesn’t currently include any content. Add content to
            this section using the sidebar.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentVideo;
