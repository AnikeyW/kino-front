import React, { FC } from "react";
import styles from "./SeriesDetailsInfo.module.scss";
import Image from "next/image";
import { ISeries } from "@/components/series/Series.types";

interface Props {
  seriesDetails: ISeries;
}

const SeriesDetailsInfo: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <div className={styles.poster}>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_URL + seriesDetails.poster}
          alt={"series_poster"}
          width={200}
          height={300}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{seriesDetails.title}</h1>
        <div className={styles.releaseYear}>
          <small>Год выхода: </small>
          <span>{seriesDetails.releaseYear}</span>
        </div>
        <div className={styles.description}>
          <small>Описание: </small>
          <p>{seriesDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsInfo;
