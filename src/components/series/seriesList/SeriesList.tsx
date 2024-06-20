import React, { FC } from "react";
import styles from "./SeriesList.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import SeriesItem from "@/components/series/seriesItem/SeriesItem";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const SeriesList: FC<Props> = ({ series }) => {
  return (
    <ul className={styles.root}>
      {series.map((seriesItem) => (
        <SeriesItem seriesDetails={seriesItem} key={seriesItem.id} />
      ))}
    </ul>
  );
};

export default SeriesList;
