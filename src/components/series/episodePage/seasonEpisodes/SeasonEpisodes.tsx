"use client";
import React, { FC } from "react";
import styles from "./SeasonEpisodes.module.scss";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";
import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
  season: ISeason;
}

const SeasonEpisodes: FC<Props> = ({
  episode,
  allEpisodes,
  seriesInfo,
  season,
}) => {
  const { seasonInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  return (
    <div className={styles.root}>
      <h2>{`Все серии ${seasonInfo?.order || season.order} сезона`}</h2>

      <ul className={styles.seasonEpisodesList}>
        {allEpisodes
          .filter(
            (episode) => episode.seasonId === (seasonInfo?.id || season.id),
          )
          .sort((a, b) => a.order - b.order)
          .map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              href={`/series/${seriesInfo.slug}/season/${seasonInfo?.order || season.order}/episode/${episode.order}`}
              seasonOrder={seasonInfo?.order || season.order}
            />
          ))}
      </ul>
    </div>
  );
};

export default SeasonEpisodes;
