import React, { FC } from "react";
import styles from "./SeasonList.module.scss";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";
import SeasonItem from "@/components/series/seasonItem/SeasonItem";

interface Props {
  seasons: ISeasonWithoutEpisodes[];
}

const SeasonList: FC<Props> = ({ seasons }) => {
  return (
    <div className={styles.root}>
      {seasons.map((season) => (
        <div key={season.id} className={styles.itemWrapper}>
          <SeasonItem data={season} />
        </div>
      ))}
    </div>
  );
};

export default SeasonList;
