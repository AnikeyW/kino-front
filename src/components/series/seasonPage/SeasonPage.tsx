import React, { FC } from "react";
import styles from "./SeasonPage.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";
import EpisodeList from "@/components/series/seasonPage/episodeList/EpisodeList";
import DescriptionBlock from "@/components/UI/descriptionBlock/DescriptionBlock";

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

      <DescriptionBlock description={seasonData.description} />

      <EpisodeList
        episodes={seasonData.episodes}
        seriesId={seriesData.id}
        seasonOrder={seasonData.order}
      />
    </article>
  );
};

export default SeasonPage;
