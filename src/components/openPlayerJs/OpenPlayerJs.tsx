"use client";
import React, { FC, useEffect } from "react";
import OpenPlayerJS from "openplayerjs";
import "openplayerjs/dist/openplayer.css";

interface Props {
  src: string;
}

const OpenPlayerJs: FC<Props> = ({ src }) => {
  useEffect(() => {
    const player = new OpenPlayerJS("player", {
      controls: {
        alwaysVisible: false,
        layers: {
          left: ["play", "time", "volume"],
          middle: ["progress"],
          right: ["captions", "settings", "fullscreen", "levels"],
        },
      },
    });
    player.init();
  }, []);

  return (
    <div>
      <video id="player" className="op-player__media" controls playsInline>
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

export default OpenPlayerJs;
