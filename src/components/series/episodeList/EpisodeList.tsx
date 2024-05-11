import React, { FC } from "react";
import styles from "./EpisodeList.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import EpisodeItem from "@/components/series/episodeItem/EpisodeItem";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonOrder: number;
}
const EpisodeList: FC<Props> = ({ episodes, seriesId, seasonOrder }) => {
  return (
    <div className={styles.root}>
      {episodes.map((episode) => (
        <div key={episode.id} className={styles.itemWrapper}>
          <EpisodeItem
            episode={episode}
            seriesId={seriesId}
            seasonOrder={seasonOrder}
          />
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
