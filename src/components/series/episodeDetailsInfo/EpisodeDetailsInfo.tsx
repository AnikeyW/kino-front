// "use client";
import React, { FC, useEffect } from "react";
import styles from "./EpisodeDetailsInfo.module.scss";
import { IEpisode } from "@/components/series/Series.types";
// import VideoJsPlayer from "@/components/videojsPlayer/VideoJsPlayer";
import { formatDate } from "@/utils";
// import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";
import PreviousEpisodeButton from "@/components/series/previousEpisodeButton/PreviousEpisodeButton";
import NextEpisodeButton from "@/components/series/nextEpisodeButton/NextEpisodeButton";
// import ShakaPlayer from "@/components/shakaPlayer/ShakaPlayer";
// import OpenPlayerJs from "@/components/openPlayerJs/OpenPlayerJs";
// import IframeComponent from "@/components/iframePlayer/IramePlayer";
import IframePlayer from "@/components/iframePlayer/IramePlayer";

interface Props {
  episode: IEpisode;
  seriesTitle: string;
  seasonOrder: number;
  episodesQuantity: number;
  seriesId: number;
}

const EpisodeDetailsInfo: FC<Props> = ({
  episode,
  seriesTitle,
  seasonOrder,
  episodesQuantity,
  seriesId,
}) => {
  const m3u8 = "video/b97f99cb-aef7-4386-9838-90596397d6b7/master.m3u8";
  const mpd = "video/b97f99cb-aef7-4386-9838-90596397d6b7/master.mpd";

  return (
    <div className={styles.root}>
      <h1
        className={styles.title}
      >{`${seriesTitle} Сезон ${seasonOrder} Серия ${episode.order}`}</h1>
      {/*<VideoJsPlayer src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.src} />*/}

      {/*<VideoJsPlayer src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + mdp} />*/}
      {/*<OpenPlayerJs src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.src} />*/}
      {/*<ShakaPlayer src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.src} />*/}

      {/*<IframePlayer*/}
      {/*  src={`/player/playerjs.html?file=${"/player/playlist.txt"}`}*/}
      {/*/>*/}
      {/*<IframePlayer*/}
      {/*  src={`/player/playerjs.html?file=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.src}`}*/}
      {/*/>*/}
      <IframePlayer
        src={`/player/playerjs.html?file=${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + m3u8} or ${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + mpd}`}
      />
      <div className={styles.prevNextBtns}>
        <PreviousEpisodeButton
          episodeOrder={episode.order}
          seriesId={seriesId}
          seasonOrder={seasonOrder}
        />
        <NextEpisodeButton
          episodeOrder={episode.order}
          seriesId={seriesId}
          seasonOrder={seasonOrder}
          episodesQuantity={episodesQuantity}
        />
      </div>

      <div>{formatDate(episode.releaseDate)}</div>
    </div>
  );
};

export default EpisodeDetailsInfo;
