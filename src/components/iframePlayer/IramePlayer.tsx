"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import Image from "next/image";
import { subLabelFromSubSrc } from "@/utils";
import { EVENT_CHANGE_URL } from "@/constants";

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
  const [url, setUrl] = useState<string | null>(null);
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    // const url = `/player/playerjs.html?file=https://localhost:3000/player/pl.txt`;
    // const url = `/player/playerjs.html?file=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC}${seriesInfo.playlist}`;
    // const url = `${process.env.NEXT_PUBLIC_PLAYER_URL}?file=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC}${seriesInfo.playlist}`;
    // const url = `${process.env.NEXT_PUBLIC_PLAYER_URL}?file=https://holotv.space/api/static/playlists/house-of-the-dragon.txt`;
    // const url = `https://localhost:5173/?file=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC}${seriesInfo.playlist}`;
    // const url = `https://localhost:5173/?file=https://localhost:3000/player/pl.txt${Math.random()}`;
    // const url = `https://localhost:5173/?file=https://localhost:5173/pl.txt`;
    // const url = `https://localhost:5173`;
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
          // process.env.NEXT_PUBLIC_CLIENT_URL!,
          process.env.NEXT_PUBLIC_PLAYER_URL!,
          // "https://localhost:5173/",
        );
      }
    };

    const handleWindowEvents = (event: any) => {
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
            // process.env.NEXT_PUBLIC_CLIENT_URL!,
            process.env.NEXT_PUBLIC_PLAYER_URL!,
            // "https://localhost:5173/",
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
