"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode } from "@/components/series/Series.types";

interface Props {
  // src: string;
  episode: IEpisode;
}

const IframePlayer: FC<Props> = ({ episode }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls} or ${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcDash}`;

    let subtitlesSrc = "";

    episode.subtitles.forEach((sub, index) => {
      const subLabel = episode.subtitles[index].src
        .replace(/\\/g, "/")
        .split("/")
        .pop()
        ?.split(".")[0];
      if (index === episode.subtitles.length - 1) {
        subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src}`;
      } else {
        subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src},`;
      }
    });

    const url = `/player/playerjs.html?file=${videoSrc}&subtitle=${subtitlesSrc}&poster=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`;
    const formatUrl = url.replace(/\\/g, "/");
    setUrl(formatUrl);
  }, []);

  return (
    <div className={styles.root}>
      {url && (
        <iframe src={url} width="100%" height="100%" allowFullScreen></iframe>
      )}
      {/*<iframe src={src} width="100%" height="100%" allowFullScreen></iframe>*/}
    </div>
  );
};

export default IframePlayer;
