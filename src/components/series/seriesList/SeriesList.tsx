import React, { FC } from "react";
import styles from "./SeriesList.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import CardItem from "@/components/UI/cardItem/CardItem";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const SeriesList: FC<Props> = ({ series }) => {
  return (
    <ul className={styles.root}>
      {series.map((seriesItem) => (
        <CardItem
          key={seriesItem.id}
          href={`/series/${seriesItem.id}`}
          imageSrc={seriesItem.poster}
          title={seriesItem.title}
          releaseDate={seriesItem.releaseYear}
        />
      ))}
    </ul>
  );
};

export default SeriesList;
