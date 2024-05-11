import React, { FC } from "react";
import styles from "./SeriesItem.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";

interface Props {
  data: ISeriesWithoutSeasons;
}

const SeriesItem: FC<Props> = ({ data }) => {
  return (
    <MyLink href={`/series/${data.id}`}>
      <div className={styles.root}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + data.poster}
            alt={"series_poster"}
            width={150}
            height={220}
          />
        </div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.date}>
          <small>Дата выхода:</small>
          {data.releaseYear}
        </div>
      </div>
    </MyLink>
  );
};

export default SeriesItem;
