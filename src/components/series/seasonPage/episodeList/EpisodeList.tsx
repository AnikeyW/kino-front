import React, { FC } from "react";
import styles from "./EpisodeList.module.scss";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import EpisodeCard from "@/components/series/seasonPage/episodeCard/EpisodeCard";
import TitleH2 from "@/components/UI/titleH2/TitleH2";

interface Props {
  episodes: IEpisode[];
  seriesData: ISeries;
  seasonOrder: number;
}
const EpisodeList: FC<Props> = ({ episodes, seasonOrder, seriesData }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <TitleH2>
          Все серии {seasonOrder} сезона сериала {seriesData.title}{" "}
          <span className={styles.titleSpan}>({episodes.length} серий)</span>
        </TitleH2>
      </div>

      <ul className={styles.episodesList}>
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            seasonOrder={seasonOrder}
            href={`/series/${seriesData.slug}/season/${seasonOrder}/episode/${episode.order}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
