import React, { FC } from "react";
import styles from "./SeasonList.module.scss";
import { ISeries } from "@/components/series/Series.types";
import SeasonItem from "@/components/series/seriesPage/seasonItem/SeasonItem";
import { getQualityName } from "@/utils";
import TitleH2 from "@/components/UI/titleH2/TitleH2";

interface Props {
  seriesDetails: ISeries;
}

const SeasonList: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <TitleH2>
          Все сезоны сериала {seriesDetails.title} в{" "}
          {getQualityName(seriesDetails.quality)} качестве
        </TitleH2>
      </div>
      <ul className={styles.seasonsList}>
        {seriesDetails.seasons.map((season) => (
          <SeasonItem
            key={season.id}
            season={season}
            quality={seriesDetails.quality}
            seriesSlug={seriesDetails.slug}
          />
        ))}
      </ul>
    </div>
  );
};

export default SeasonList;
