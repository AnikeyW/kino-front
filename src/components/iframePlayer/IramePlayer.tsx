"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import Image from "next/image";

interface Props {
  episode: IEpisode;
}

const IframePlayer: FC<Props> = ({ episode }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls} or ${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcDash}`;

    let subtitlesSrc = "";

    if (episode.subtitles.length > 0) {
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
    }

    const url = `/player/playerjs.html?file=${videoSrc}${episode.subtitles.length > 0 && `&subtitle=${subtitlesSrc}`}&poster=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`;
    const formatUrl = url.replace(/\\/g, "/");
    setUrl(formatUrl);
  }, []);

  return (
    <div className={styles.root}>
      {url && !episode.isProcessing && (
        <iframe src={url} width="100%" height="100%" allowFullScreen></iframe>
      )}
      {episode.isProcessing && (
        <div className={styles.processing}>
          <div className={styles.poster}>
            <Image
              src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}
              alt={"video-poster"}
              fill={true}
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              priority={true}
            />
          </div>
          <div className={styles.text}>
            <p>Видео обрабатывается...</p>
            <p>Попробуйте через несколько минут</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IframePlayer;
