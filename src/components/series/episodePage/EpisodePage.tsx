import React, { FC } from "react";
import styles from "./EpisodePage.module.scss";
import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import { formatDate } from "@/utils";
import PreviousEpisodeButton from "@/components/series/previousEpisodeButton/PreviousEpisodeButton";
import NextEpisodeButton from "@/components/series/nextEpisodeButton/NextEpisodeButton";
import IframePlayer from "@/components/iframePlayer/IramePlayer";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";
import DescriptionBlock from "@/components/UI/descriptionBlock/DescriptionBlock";
import TitleH1 from "@/components/UI/titleH1/TitleH1";

interface Props {
  episode: IEpisode;
  seasonOrder: number;
  seriesInfo: ISeries;
  seasonEpisodes: IEpisode[];
  prevSeason: ISeason | null;
  // allEpisodes: IEpisode[];
}

const EpisodePage: FC<Props> = ({
  episode,
  seasonOrder,
  seasonEpisodes,
  seriesInfo,
  prevSeason,
  // allEpisodes,
}) => {
  return (
    <article className={styles.root}>
      <div className={styles.episodeInfo}>
        <div className={styles.title}>
          <TitleH1
            text={`${seriesInfo.title} Сезон ${seasonOrder} Серия ${episode.order} смотреть онлайн`}
          />
        </div>

        <IframePlayer
          episode={episode}
          episodesQuantity={seasonEpisodes.length}
          seasonsQuantity={seriesInfo.seasons.length}
          seasonOrder={seasonOrder}
          seriesSlug={seriesInfo.slug}
          // allEpisodes={allEpisodes}
          seriesInfo={seriesInfo}
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

        <h2>«{episode.title}»</h2>

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
