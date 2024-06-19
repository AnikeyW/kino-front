import React, { FC } from "react";
import styles from "./SeriesPage.module.scss";
import { ISeries } from "@/components/series/Series.types";
import { isJSON } from "@/utils";
import SeasonList from "@/components/series/seriesPage/seasonList/SeasonList";
import SeriesDetailsInfo from "@/components/series/seriesPage/seriesDetailsInfo/SeriesDetailsInfo";

interface Props {
  seriesDetails: ISeries;
}

const SeriesPage: FC<Props> = ({ seriesDetails }) => {
  return (
    <article className={styles.root}>
      <h1 className={styles.pageTitle}>
        {seriesDetails.title} смотреть онлайн
      </h1>
      <div className={styles.seriesInfo}>
        <SeriesDetailsInfo seriesDetails={seriesDetails} />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.description}>
          {isJSON(seriesDetails.description) &&
            JSON.parse(seriesDetails.description).map(
              (paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ),
            )}
        </div>

        <div className={styles.seasonsList}>
          <SeasonList seriesDetails={seriesDetails} />
        </div>
      </div>
    </article>
  );
};

export default SeriesPage;
