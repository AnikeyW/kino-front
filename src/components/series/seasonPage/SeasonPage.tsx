import React, { FC } from "react";
import styles from "./SeasonPage.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";
import { isJSON } from "@/utils";
import EpisodeList from "@/components/series/seasonPage/episodeList/EpisodeList";

interface Props {
  seasonData: ISeason;
  seriesData: ISeries;
}

const SeasonPage: FC<Props> = ({ seasonData, seriesData }) => {
  return (
    <article className={styles.root}>
      <h1 className={styles.pageTitle}>
        {seriesData.title} {seasonData.order} сезон смотреть онлайн
      </h1>
      {isJSON(seasonData.description) && (
        <div className={styles.description}>
          {JSON.parse(seasonData.description).map(
            (paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      )}

      <EpisodeList
        episodes={seasonData.episodes}
        seriesId={seriesData.id}
        seasonOrder={seasonData.order}
      />
    </article>
  );
};

export default SeasonPage;
