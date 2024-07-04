import React, { FC } from "react";
import styles from "./NextEpisodeButton.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";

interface Props {
  episodeOrder: number;
  seriesSlug: string;
  seasonOrder: number;
  episodesQuantity: number;
  seasonsQuantity: number;
}

const NextEpisodeButton: FC<Props> = ({
  episodeOrder,
  seasonOrder,
  episodesQuantity,
  seasonsQuantity,
  seriesSlug,
}) => {
  const nextEpisodeLink = `/series/${seriesSlug}/season/${seasonOrder}/episode/${episodeOrder + 1}`;
  const nextSeasonLink = `/series/${seriesSlug}/season/${seasonOrder + 1}/episode/1`;

  return (
    <div className={styles.root}>
      {episodeOrder === episodesQuantity && seasonOrder === seasonsQuantity ? (
        <button disabled className={styles.btn}>
          Следующая серия
        </button>
      ) : (
        <LinkBtn
          href={
            episodeOrder === episodesQuantity ? nextSeasonLink : nextEpisodeLink
          }
        >
          <button className={styles.btn}>
            {episodeOrder === episodesQuantity
              ? "Следующий сезон"
              : "Следующая серия"}
          </button>
        </LinkBtn>
      )}
    </div>
  );
};

export default NextEpisodeButton;
