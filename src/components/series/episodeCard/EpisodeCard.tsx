import React, { FC } from "react";
import { IEpisode } from "@/components/series/Series.types";
import styles from "./EpisodeCard.module.scss";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";
import { formatDate, formatTimeHhMm } from "@/utils";

interface Props {
  episode: IEpisode;
  href: string;
}

const EpisodeCard: FC<Props> = ({ episode, href }) => {
  return (
    <MyLink href={href}>
      <div className={styles.root}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}
            alt={"episode_poster"}
            fill={true}
          />
        </div>
        <div className={styles.title}>{episode.title}</div>
        <div className={styles.date}>
          <small>Дата выхода:</small>
          {formatDate(episode.releaseDate)}
        </div>
        <div className={styles.duration}>
          <small>Длительность:</small>
          {formatTimeHhMm(episode.duration)}
        </div>
      </div>
    </MyLink>
  );
};

export default EpisodeCard;
