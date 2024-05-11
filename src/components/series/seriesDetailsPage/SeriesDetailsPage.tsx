import React, { FC } from "react";
import styles from "./SeriesDetailsPage.module.scss";
import { ISeries } from "@/components/series/Series.types";
import Image from "next/image";
import SeasonList from "@/components/series/seasonList/SeasonList";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";

interface Props {
  seriesDetails: ISeries;
}

const SeriesDetailsPage: FC<Props> = ({ seriesDetails }) => {
  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: "/series",
      title: "Сериалы",
    },
    {
      path: "",
      title: seriesDetails.title,
    },
  ];
  return (
    <div className={styles.root}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.header}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + seriesDetails.poster}
            alt={"series_poster"}
            width={200}
            height={400}
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{seriesDetails.title}</h2>
          <div className={styles.releaseYear}>{seriesDetails.releaseYear}</div>
          <div className={styles.description}>{seriesDetails.description}</div>
        </div>
      </div>
      <SeasonList seasons={seriesDetails.seasons} />
    </div>
  );
};

export default SeriesDetailsPage;
