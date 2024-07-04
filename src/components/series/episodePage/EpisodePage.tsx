import React, { FC } from "react";
import styles from "./EpisodePage.module.scss";
import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import { formatDate } from "@/utils";
import PreviousEpisodeButton from "@/components/series/previousEpisodeButton/PreviousEpisodeButton";
import NextEpisodeButton from "@/components/series/nextEpisodeButton/NextEpisodeButton";
import IframePlayer from "@/components/iframePlayer/IramePlayer";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";
import DescriptionBlock from "@/components/UI/descriptionBlock/DescriptionBlock";

interface Props {
  episode: IEpisode;
  seasonOrder: number;
  seriesInfo: ISeries;
  seasonEpisodes: IEpisode[];
  prevSeason: ISeason | null;
}

const EpisodePage: FC<Props> = ({
  episode,
  seasonOrder,
  seasonEpisodes,
  seriesInfo,
  prevSeason,
}) => {
  return (
    <article className={styles.root}>
      <div className={styles.episodeInfo}>
        <h1>{`${seriesInfo.title} Сезон ${seasonOrder} Серия ${episode.order}`}</h1>

        <IframePlayer
          episode={episode}
          episodesQuantity={seasonEpisodes.length}
          seasonsQuantity={seriesInfo.seasons.length}
          seasonOrder={seasonOrder}
          seriesSlug={seriesInfo.slug}
        />

        <div className={styles.prevNextBtns}>
          <PreviousEpisodeButton
            episodeOrder={episode.order}
            seasonOrder={seasonOrder}
            prevSeason={prevSeason}
            seriesSlug={seriesInfo.slug}
          />
          <NextEpisodeButton
            episodeOrder={episode.order}
            seasonOrder={seasonOrder}
            episodesQuantity={seasonEpisodes.length}
            seasonsQuantity={seriesInfo.seasons.length}
            seriesSlug={seriesInfo.slug}
          />
        </div>

        <div className={styles.releaseDate}>
          <div className={styles.releaseDateName}>Дата выхода:</div>
          <div className={styles.releaseDateValue}>
            {formatDate(episode.releaseDate)}
          </div>
        </div>

        <h2>{episode.title}</h2>

        <DescriptionBlock description={episode.description} />
      </div>

      <div className={styles.seasonEpisodesBlock}>
        <h2>{`Все серии ${seasonOrder} сезона`}</h2>

        <ul className={styles.seasonEpisodesList}>
          {seasonEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              href={`/series/${seriesInfo.slug}/season/${seasonOrder}/episode/${episode.order}`}
              seasonOrder={seasonOrder}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default EpisodePage;
