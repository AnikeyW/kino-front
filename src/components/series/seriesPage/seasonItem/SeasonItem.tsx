import React, { FC } from "react";
import {
  ISeasonWithoutEpisodes,
  QualityResolutionType,
} from "@/components/series/Series.types";
import styles from "./SeasonItem.module.scss";
import MyLink from "@/components/UI/myLink/MyLink";
import Image from "next/image";
import { getQualityName } from "@/utils";

interface Props {
  season: ISeasonWithoutEpisodes;
  quality: QualityResolutionType;
  seriesSlug: string;
}

const SeasonItem: FC<Props> = ({ season, quality, seriesSlug }) => {
  return (
    <li>
      <MyLink href={`/series/${seriesSlug}/season/${season.order}`}>
        <div className={styles.root}>
          <div className={styles.quality}>{getQualityName(quality)}</div>
          <div className={styles.overlayText}>СМОТРЕТЬ ОНЛАЙН</div>
          <div className={styles.posterBox}>
            <div className={styles.poster}>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + season.poster}
                alt={`${seriesSlug} ${season.order} сезон`}
                fill={true}
                sizes={"400px"}
              />
            </div>
          </div>

          <div className={styles.title}>{season.order} cезон</div>
        </div>
      </MyLink>
    </li>
  );
};

export default SeasonItem;
