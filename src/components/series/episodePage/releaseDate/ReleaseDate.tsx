"use client";
import React, { FC } from "react";
import styles from "@/components/series/episodePage/EpisodePage.module.scss";
import { formatDate } from "@/utils";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
}

const ReleaseDate: FC<Props> = ({ episode, allEpisodes, seriesInfo }) => {
  const { episodeInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  return (
    <div className={styles.root}>
      <div className={styles.releaseDateName}>Дата выхода:</div>
      <div className={styles.releaseDateValue}>
        {formatDate(episodeInfo.releaseDate)}
      </div>
    </div>
  );
};

export default ReleaseDate;
