import React, { FC } from "react";
import { IEpisode } from "@/components/series/Series.types";
import styles from "./EpisodeCard.module.scss";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";
import { formatTimeHhMm } from "@/utils";

interface Props {
  episode: IEpisode;
  href: string;
  seasonOrder: number;
}

const EpisodeCard: FC<Props> = ({ episode, href, seasonOrder }) => {
  return (
    <li>
      <MyLink href={href}>
        <div className={styles.root}>
          <div className={styles.posterBox}>
            <div className={styles.poster}>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}
                alt={"episode_poster"}
                fill={true}
                quality={60}
                sizes={"300px"}
              />
            </div>
          </div>
          <div className={styles.episodeInfo}>
            <span>{`Сезон ${seasonOrder} Серия ${episode.order}`}</span>
            <span className={styles.duration}>
              {formatTimeHhMm(episode.duration)}
            </span>
          </div>
          <h3 className={styles.title}>{episode.title}</h3>
        </div>
      </MyLink>
    </li>
  );
};

export default EpisodeCard;
