import React, { FC } from "react";
import styles from "./SeasonItem.module.scss";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";

interface Props {
  data: ISeasonWithoutEpisodes;
}

const SeasonItem: FC<Props> = ({ data }) => {
  return (
    <MyLink href={`/series/${data.seriesId}/season/${data.order}`}>
      <div className={styles.root}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + data.poster}
            alt={"season_poster"}
            width={150}
            height={220}
          />
        </div>
        <div className={styles.title}>{data.title}</div>
      </div>
    </MyLink>
  );
};

export default SeasonItem;
