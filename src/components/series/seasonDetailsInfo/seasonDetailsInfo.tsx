import React, { FC } from "react";
import styles from "./SeasonDetailsInfo.module.scss";
import Image from "next/image";
import { ISeason } from "@/components/series/Series.types";

interface Props {
  seasonData: ISeason;
}

const SeasonDetailsInfo: FC<Props> = ({ seasonData }) => {
  return (
    <div className={styles.root}>
      <div className={styles.poster}>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_URL + seasonData.poster}
          alt={"series_poster"}
          width={200}
          height={300}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{seasonData.title}</h1>
        <div className={styles.description}>
          <small>Описание: </small>
          <p>{seasonData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsInfo;
