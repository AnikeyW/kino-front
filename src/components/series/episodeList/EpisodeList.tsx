import React, { FC } from "react";
import styles from "./EpisodeList.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import CardItem from "@/components/UI/cardItem/CardItem";

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
          <div key={episode.id} className={styles.itemWrapper}>
            <CardItem
              href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
              imageSrc={episode.poster}
              title={episode.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
