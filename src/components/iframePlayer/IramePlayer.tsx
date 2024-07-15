"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./IframePlayer.module.scss";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { subLabelFromSubSrc } from "@/utils";

interface Props {
  episode: IEpisode;
  seriesSlug: string;
  seasonOrder: number;
  episodesQuantity: number;
  seasonsQuantity: number;
  // allEpisodes: IEpisode[];
  seriesInfo: ISeries;
}

const IframePlayer: FC<Props> = ({
  episode,
  episodesQuantity,
  seasonsQuantity,
  seasonOrder,
  seriesSlug,
  // allEpisodes,
  seriesInfo,
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);
  const router = useRouter();
  // const pathname = usePathname();
  // console.log(allEpisodes);

  // useEffect(() => {
  //   const url = pathname;
  //   console.log(url);
  //   // You can now use the current URL
  //   // ...
  // }, [pathname]);

  useEffect(() => {
    // const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls} or ${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcDash}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL_STATIC!.split("/api/static/")[0] + "/";
    const videoName = episode.srcHls.replace(/\\/g, "/").split("/")[1];

    // const videoSrc = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.srcHls}`;
    const videoSrc = `${baseUrl}{v1}/${videoName}/{v2}`;

    let subtitlesSrc = "";

    if (episode.subtitles.length > 0) {
      episode.subtitles.forEach((sub, index) => {
        const subLabel = subLabelFromSubSrc(sub.src);
        if (index === episode.subtitles.length - 1) {
          subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src}`;
        } else {
          subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src},`;
        }
      });
    }

    // const url = `/player/playerjs.html?file=[{"title":"Сезон 1","folder":[{"title":"Серия 1","file":"http://localhost:5000/{v1}/1dbe20b8-c678-4144-b6aa-15ae399d2f98/{v2}","id":"1","poster":"http://localhost:5000/api/static/thumbnails/1dbe20b8-c678-4144-b6aa-15ae399d2f98/thumbnail_11.webp"},{"title":"Серия 2","file":"http://localhost:5000/{v1}/a50180a9-d791-45f9-89ad-e16d59a70238/{v2}","id":"129"}]},{"title":"Сезон 2","folder":[{"title":"Серия 1","file":"http://localhost:5000/{v1}/5c87ab31-c2d6-4c48-8207-13bcfff1e0f8/{v2}","id":"124","poster":"http://localhost:5000/api/static/thumbnails/5c87ab31-c2d6-4c48-8207-13bcfff1e0f8/thumbnail_11.webp"}]}]`;
    const url = `/player/playerjs.html?file=${videoSrc}${episode.subtitles.length > 0 ? `&subtitle=${subtitlesSrc}` : ""}&poster=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`;
    // const url = `https://player-holotv.ru/?file=${videoSrc}${episode.subtitles.length > 0 ? `&subtitle=${subtitlesSrc}` : ""}&poster=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`;
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
              mode: process.env.NODE_ENV,
              defaultSubtitle: episode.defaultSubtitle
                ? subLabelFromSubSrc(episode.defaultSubtitle)
                : null,
            },
          },
          process.env.NEXT_PUBLIC_CLIENT_URL!,
        );
      }
    };

    const handleWindowEvents = (event: any) => {
      // if (event.data.event === "new") {
      //   const episodeInfo = allEpisodes.find(
      //     (episode) => episode.id == event.data.id,
      //   );
      //   console.log("episodeInfo", episodeInfo);
      //
      //   const seasonOrder = seriesInfo.seasons.find(
      //     (season) => season.id === episodeInfo?.seasonId,
      //   )?.order;
      //   console.log("seasonOrder", seasonOrder);
      //
      //   window.history.replaceState(
      //     {
      //       ...window.history.state,
      //       // as: "/series/game-of-thrones/season/1/episode/112",
      //       // url: "/series/game-of-thrones/season/1/episode/112",
      //     },
      //     "",
      //     `/series/game-of-thrones/season/${seasonOrder}/episode/${episodeInfo?.order}`,
      //   );
      // }
      if (event.data.event === "CLICK_BUTTON_NEXT_EPISODE") {
        if (
          episode.order === episodesQuantity &&
          seasonOrder === seasonsQuantity
        )
          return;

        const nextEpisodeLink = `/series/${seriesSlug}/season/${seasonOrder}/episode/${episode.order + 1}`;
        const nextSeasonLink = `/series/${seriesSlug}/season/${seasonOrder + 1}/episode/1`;

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
