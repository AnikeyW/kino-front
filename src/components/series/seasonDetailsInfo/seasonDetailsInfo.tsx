import React, { FC } from "react";
import styles from "./SeasonDetailsInfo.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";

interface Props {
  seasonData: ISeason;
  seriesData: ISeries;
}

const SeasonDetailsInfo: FC<Props> = ({ seasonData, seriesData }) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h1 className={styles.title}>
          {seriesData.title} {seasonData.title}
        </h1>
        <div className={styles.description}>
          <p>{seasonData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsInfo;
