"use client";
import React, { FC } from "react";
import VideoJS from "@/components/videojsPlayer/VideoJs";

interface Props {
  src: string;
}

const VideoJsPlayer: FC<Props> = ({ src }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: src,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    player.hlsQualitySelector({
      displayCurrentQuality: true,
    });

    // You can handle player events here, for example:
    // player.on("waiting", () => {
    //   VideoJS.log("player is waiting");
    // });
    //
    // player.on("dispose", () => {
    //   VideoJS.log("player will dispose");
    // });
  };

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default VideoJsPlayer;
