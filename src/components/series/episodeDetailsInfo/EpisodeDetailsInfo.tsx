import React, { FC } from "react";
import styles from "./EpisodeDetailsInfo.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import { formatDate, isJSON } from "@/utils";
import PreviousEpisodeButton from "@/components/series/previousEpisodeButton/PreviousEpisodeButton";
import NextEpisodeButton from "@/components/series/nextEpisodeButton/NextEpisodeButton";
import IframePlayer from "@/components/iframePlayer/IramePlayer";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";

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
          className={styles.episodeNumber}
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

        <div className={styles.releaseDate}>
          <div className={styles.releaseDateName}>Дата выхода:</div>
          <div className={styles.releaseDateValue}>
            {formatDate(episode.releaseDate)}
          </div>
        </div>

        <h2 className={styles.title}>{episode.title}</h2>

        {isJSON(episode.description) && (
          <div className={styles.description}>
            {JSON.parse(episode.description).map(
              (paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ),
            )}
          </div>
        )}
      </div>

      <div className={styles.seasonEpisodesBlock}>
        <div className={styles.seasonEpisodesTitle}>
          {`Все серии ${seasonOrder} сезона`}
        </div>
        <ul className={styles.seasonEpisodesList}>
          {seasonEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
              seasonOrder={seasonOrder}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeDetailsInfo;
