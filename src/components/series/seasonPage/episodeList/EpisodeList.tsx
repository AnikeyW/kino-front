import React, { FC } from "react";
import styles from "./EpisodeList.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonOrder: number;
}
const EpisodeList: FC<Props> = ({ episodes, seriesId, seasonOrder }) => {
  return (
    <div className={styles.root}>
      <h2>Все серии {seasonOrder} сезона</h2>
      <ul className={styles.episodesList}>
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            seasonOrder={seasonOrder}
            href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
