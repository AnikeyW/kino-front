import React, { FC } from "react";
import styles from "./SeasonPage.module.scss";
import { ISeason, ISeries } from "@/components/series/Series.types";
import Image from "next/image";
import EpisodeList from "@/components/series/episodeList/EpisodeList";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";

interface Props {
  seasonData: ISeason;
  seriesId: number;
  seriesData: ISeries;
  seasonOrder: number;
}

const SeasonPage: FC<Props> = ({
  seasonData,
  seriesId,
  seriesData,
  seasonOrder,
}) => {
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
      path: `/series/${seriesData.id}`,
      title: seriesData.title,
    },
    {
      path: "",
      title: seasonData.title,
    },
  ];

  return (
    <div className={styles.root}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.header}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + seasonData.poster}
            alt={"season_poster"}
            width={200}
            height={400}
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{seasonData.title}</h2>
          <div className={styles.description}>{seasonData.description}</div>
        </div>
      </div>
      <EpisodeList
        episodes={seasonData.episodes}
        seriesId={seriesId}
        seasonOrder={seasonOrder}
      />
    </div>
  );
};

export default SeasonPage;
