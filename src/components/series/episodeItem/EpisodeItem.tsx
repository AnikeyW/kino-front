import React, { FC } from "react";
import styles from "./EpisodeItem.module.scss";
import { IEpisode } from "@/components/series/Series.types";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";

interface Props {
  episode: IEpisode;
  seriesId: number;
  seasonOrder: number;
}

const EpisodeItem: FC<Props> = ({ episode, seriesId, seasonOrder }) => {
  return (
    <MyLink
      href={`/series/${seriesId}/season/${seasonOrder}/episode/${episode.order}`}
    >
      <div className={styles.root}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + episode.poster}
            alt={"episode_poster"}
            width={150}
            height={220}
          />
        </div>
        <div className={styles.title}>{episode.title}</div>
      </div>
    </MyLink>
  );
};

export default EpisodeItem;
