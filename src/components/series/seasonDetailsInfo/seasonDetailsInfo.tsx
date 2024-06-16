import React, { FC } from "react";
import styles from "./SeasonDetailsInfo.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";
import { isJSON } from "@/utils";

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
        {isJSON(seasonData.description) ? (
          <div className={styles.description}>
            {JSON.parse(seasonData.description).map(
              (paragraph: string, index: number) => (
                <p style={{ marginBottom: "1rem" }} key={index}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        ) : (
          <div className={styles.description}>
            <p>{seasonData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonDetailsInfo;
