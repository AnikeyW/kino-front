import React, { FC } from "react";
import styles from "./SeasonList.module.scss";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";
import CardItem from "@/components/UI/cardItem/CardItem";

interface Props {
  seasons: ISeasonWithoutEpisodes[];
}

const SeasonList: FC<Props> = ({ seasons }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Сезоны</h2>
      <div className={styles.seasonsList}>
        {seasons.map((season) => (
          <div key={season.id} className={styles.itemWrapper}>
            <CardItem
              title={season.title}
              imageSrc={season.poster}
              href={`/series/${season.seriesId}/season/${season.order}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonList;
