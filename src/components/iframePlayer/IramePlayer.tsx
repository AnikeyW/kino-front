"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import Image from "next/image";
import { subLabelFromSubSrc } from "@/utils";
import { EVENT_CHANGE_URL } from "@/constants";
import { useWindowResize } from "@/hooks/useWindowResize";

interface Props {
  episode: IEpisode;
  seriesSlug: string;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
}

const IframePlayer: FC<Props> = ({
  episode,
  seriesSlug,
  allEpisodes,
  seriesInfo,
}) => {
  const windowSize = useWindowResize();
  const [url, setUrl] = useState<string | null>(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootElementResizeHandler = () => {
      const rootElement = rootRef.current;
      if (rootElement) {
        const rootElementWidth = rootElement.getBoundingClientRect().width;
        const rootElementHeight =
          rootElementWidth * (episode.height / episode.width);
        rootElement.style.height = `${rootElementHeight}px`;
      }
    };

    rootElementResizeHandler();
  }, [windowSize?.width]);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_PLAYER_URL}?file=${seriesInfo.playlist}`;

    setUrl(url);
  }, [episode]);

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iFrameRef.current) {
        iFrameRef.current.contentWindow?.postMessage(
          {
            type: "MY_VARIABLES",
            value: {
              videoId: episode.id,
              skipIntro: episode.skipIntro,
              skipIntroEnd: episode.skipIntroEnd,
              skipCredits: episode.skipCredits,
              skipRepeat: episode.skipRepeat,
              skipRepeatEnd: episode.skipRepeatEnd,
              mode: process.env.NODE_ENV,
              defaultSubtitle: episode.defaultSubtitle
                ? subLabelFromSubSrc(episode.defaultSubtitle)
                : null,
            },
          },
          process.env.NEXT_PUBLIC_PLAYER_URL!,
        );
      }
    };

    const handleWindowEvents = (event: any) => {
      if (event.data.event === "playlist") {
        setIsIframeLoading(false);
      }
      if (event.data.event === "new") {
        const episodeInfo = allEpisodes.find(
          (episode) => episode.id == event.data.id,
        );

        const seasonOrder = seriesInfo.seasons.find(
          (season) => season.id === episodeInfo?.seasonId,
        )?.order;

        window.history.replaceState(
          {
            ...window.history.state,
            // as: "/series/game-of-thrones/season/1/episode/112",
            // url: "/series/game-of-thrones/season/1/episode/112",
          },
          "",
          `/series/${seriesSlug}/season/${seasonOrder}/episode/${episodeInfo?.order}`,
        );

        const customEvent = new Event(EVENT_CHANGE_URL);
        window.dispatchEvent(customEvent);

        if (iFrameRef.current) {
          const index = episodeInfo?.subtitles.findIndex(
            (sub) => sub.src === episodeInfo?.defaultSubtitle,
          );
          iFrameRef.current.contentWindow?.postMessage(
            {
              type: "CHANGE_SUBS",
              value: {
                defaultSubtitle: index,
              },
            },
            process.env.NEXT_PUBLIC_PLAYER_URL!,
          );
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
    <div className={styles.root} ref={rootRef}>
      {url && !episode.isProcessing && (
        <iframe
          ref={iFrameRef}
          src={url}
          width="100%"
          height={isIframeLoading ? "0px" : "100%"}
          allowFullScreen
        ></iframe>
      )}
      {isIframeLoading && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: `${(episode.height / episode.width) * 100}%`,
          }}
          className={styles.loaderBox}
        >
          <div className={styles.poster1}>
            <Image
              src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}
              alt={"video-poster"}
              fill={true}
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              priority={true}
            />
            <div className={styles.loader}></div>
          </div>
        </div>
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
