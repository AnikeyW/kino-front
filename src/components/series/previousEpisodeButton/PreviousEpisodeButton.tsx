import React, { FC } from "react";
import styles from "./PreviousEpisodeButton.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";
import { ISeason } from "@/components/series/Series.types";

interface Props {
  episodeOrder: number;
  seriesId: number;
  seasonOrder: number;
  prevSeason: ISeason | null;
}

const PreviousEpisodeButton: FC<Props> = ({
  episodeOrder,
  seriesId,
  seasonOrder,
  prevSeason,
}) => {
  const prevEpisodeLink = `/series/${seriesId}/season/${seasonOrder}/episode/${episodeOrder - 1}`;
  const prevSeasonLink = `/series/${seriesId}/season/${seasonOrder - 1}/episode/${prevSeason?.episodes.length}`;
  console.log(prevSeason?.episodes.length);

  return (
    <div className={styles.root}>
      {episodeOrder === 1 && seasonOrder === 1 ? (
        <button disabled className={styles.btn}>
          Предыдущая серия
        </button>
      ) : (
        <LinkBtn href={episodeOrder === 1 ? prevSeasonLink : prevEpisodeLink}>
          <button className={styles.btn}>
            {episodeOrder === 1 ? "Предыдущий сезон" : "Предыдущая серия"}
          </button>
        </LinkBtn>
      )}
    </div>
  );
};

export default PreviousEpisodeButton;
