import React, { FC } from "react";
import styles from "./EpisodeDetailsInfo.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import { formatDate } from "@/utils";
import PreviousEpisodeButton from "@/components/series/previousEpisodeButton/PreviousEpisodeButton";
import NextEpisodeButton from "@/components/series/nextEpisodeButton/NextEpisodeButton";
import IframePlayer from "@/components/iframePlayer/IramePlayer";
import EpisodeCard from "@/components/series/episodeCard/EpisodeCard";

interface Props {
  episode: IEpisode;
  seriesTitle: string;
  seasonOrder: number;
  seriesId: number;
  seasonEpisodes: IEpisode[];
}

const EpisodeDetailsInfo: FC<Props> = ({
  episode,
  seriesTitle,
  seasonOrder,
  seriesId,
  seasonEpisodes,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.episodeInfo}>
        <h1
          className={styles.title}
        >{`${seriesTitle} Сезон ${seasonOrder} Серия ${episode.order}`}</h1>

        <IframePlayer episode={episode} />

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
            episodesQuantity={seasonEpisodes.length}
          />
        </div>

        <div>{formatDate(episode.releaseDate)}</div>

        <div className={styles.description}>{episode.description}</div>
      </div>

      <div className={styles.seasonEpisodesList}>
        {seasonEpisodes.map((episode) => (
          <EpisodeCard
            episode={episode}
            href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
            seasonOrder={seasonOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeDetailsInfo;
