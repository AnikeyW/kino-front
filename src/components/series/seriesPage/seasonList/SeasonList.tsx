import React, { FC } from "react";
import styles from "./SeasonList.module.scss";
import { ISeries } from "@/components/series/Series.types";
import SeasonItem from "@/components/series/seriesPage/seasonItem/SeasonItem";

interface Props {
  seriesDetails: ISeries;
}

const SeasonList: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <h2>Все сезоны</h2>
      <ul className={styles.seasonsList}>
        {seriesDetails.seasons.map((season) => (
          <SeasonItem
            key={season.id}
            season={season}
            quality={seriesDetails.quality}
          />
        ))}
      </ul>
    </div>
  );
};

export default SeasonList;
