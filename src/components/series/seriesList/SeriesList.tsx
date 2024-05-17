import React, { FC } from "react";
import styles from "./SeriesList.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import CardItem from "@/components/UI/cardItem/CardItem";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const SeriesList: FC<Props> = ({ series }) => {
  return (
    <div className={styles.root}>
      {series.map((seriesItem) => (
        <div key={seriesItem.id} className={styles.itemWrapper}>
          <CardItem
            href={`/series/${seriesItem.id}`}
            imageSrc={seriesItem.poster}
            title={seriesItem.title}
            releaseDate={seriesItem.releaseYear}
          />
        </div>
      ))}
    </div>
  );
};

export default SeriesList;
