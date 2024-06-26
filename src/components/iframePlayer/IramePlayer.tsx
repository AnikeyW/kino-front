"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  episode: IEpisode;
  seriesId: number;
  seasonOrder: number;
  episodesQuantity: number;
  seasonsQuantity: number;
}

const IframePlayer: FC<Props> = ({
  episode,
  episodesQuantity,
  seasonsQuantity,
  seasonOrder,
  seriesId,
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls} or ${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcDash}`;
    const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls}`;

    let subtitlesSrc = "";

    if (episode.subtitles.length > 0) {
      episode.subtitles.forEach((sub, index) => {
        const subLabel = episode.subtitles[index].src
          .replace(/\\/g, "/")
          .split("/")
          .pop()
          ?.split(".")[0]
          .replace("_", " ");
        if (index === episode.subtitles.length - 1) {
          subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src}`;
        } else {
          subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src},`;
        }
      });
    }

    const url = `/player/playerjs.html?file=${videoSrc}${episode.subtitles.length > 0 ? `&subtitle=${subtitlesSrc}` : ""}&poster=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`;
    const formatUrl = url.replace(/\\/g, "/");
    setUrl(formatUrl);
  }, [episode]);

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iFrameRef.current) {
        iFrameRef.current.contentWindow?.postMessage(
          {
            type: "MY_VARIABLES",
            value: {
              skipIntro: episode.skipIntro,
              skipIntroEnd: episode.skipIntroEnd,
              skipCredits: episode.skipCredits,
              skipRepeat: episode.skipRepeat,
              skipRepeatEnd: episode.skipRepeatEnd,
            },
          },
          process.env.NEXT_PUBLIC_CLIENT_URL!,
        );
      }
    };

    const handleWindowEvents = (event: any) => {
      if (event.data.event === "CLICK_BUTTON_NEXT_EPISODE") {
        if (
          episode.order === episodesQuantity &&
          seasonOrder === seasonsQuantity
        )
          return;

        const nextEpisodeLink = `/series/${seriesId}/season/${seasonOrder}/episode/${episode.order + 1}`;
        const nextSeasonLink = `/series/${seriesId}/season/${seasonOrder + 1}/episode/1`;

        if (episode.order === episodesQuantity) {
          router.push(nextSeasonLink);
        } else {
          router.push(nextEpisodeLink);
        }
      }
    };

    const iframeElement = iFrameRef.current;
    if (iframeElement) {
      iframeElement.addEventListener("load", handleIframeLoad);
    }

    if (window) {
      window.addEventListener("message", handleWindowEvents);
    }

    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener("load", handleIframeLoad);
      }
      if (window) {
        window.removeEventListener("message", handleWindowEvents);
      }
    };
  }, [iFrameRef, url]);

  return (
    <div
      className={styles.root}
      style={{ aspectRatio: episode.width / episode.height }}
    >
      {url && !episode.isProcessing && (
        <iframe
          ref={iFrameRef}
          src={url}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
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
