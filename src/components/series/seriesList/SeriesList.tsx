import React, { FC } from "react";
import styles from "./SeriesList.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import SeriesItem from "@/components/series/seriesItem/SeriesItem";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const SeriesList: FC<Props> = ({ series }) => {
  return (
    <div className={styles.root}>
      {series.map((ser) => (
        <div key={ser.id} className={styles.itemWrapper}>
          <SeriesItem data={ser} />
        </div>
      ))}
    </div>
  );
};

export default SeriesList;
