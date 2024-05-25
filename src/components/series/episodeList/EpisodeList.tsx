import React, { FC } from "react";
import styles from "./EpisodeList.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import CardItem from "@/components/UI/cardItem/CardItem";
import EpisodeCard from "@/components/series/episodeCard/EpisodeCard";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonOrder: number;
}
const EpisodeList: FC<Props> = ({ episodes, seriesId, seasonOrder }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Эпизоды</h2>
      <div className={styles.episodesList}>
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            seasonOrder={seasonOrder}
            href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
