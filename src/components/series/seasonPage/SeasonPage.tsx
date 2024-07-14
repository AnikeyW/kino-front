import React, { FC } from "react";
import styles from "./SeasonPage.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";
import EpisodeList from "@/components/series/seasonPage/episodeList/EpisodeList";
import DescriptionBlock from "@/components/UI/descriptionBlock/DescriptionBlock";
import TitleH1 from "@/components/UI/titleH1/TitleH1";

interface Props {
  seasonData: ISeason;
  seriesData: ISeries;
}

const SeasonPage: FC<Props> = ({ seasonData, seriesData }) => {
  return (
    <article className={styles.root}>
      <div className={styles.title}>
        <TitleH1
          text={`Сериал ${seriesData.title} ${seasonData.order} сезон смотреть онлайн
        бесплатно`}
        />
      </div>

      <DescriptionBlock description={seasonData.description} />

      <EpisodeList
        episodes={seasonData.episodes}
        seasonOrder={seasonData.order}
        seriesData={seriesData}
      />
    </article>
  );
};

export default SeasonPage;
