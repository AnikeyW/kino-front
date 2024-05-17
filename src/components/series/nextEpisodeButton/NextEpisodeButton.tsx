import React, { FC } from "react";
import styles from "./NextEpisodeButton.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";

interface Props {
  episodeOrder: number;
  seriesId: number;
  seasonOrder: number;
  episodesQuantity: number;
}

const NextEpisodeButton: FC<Props> = ({
  episodeOrder,
  seriesId,
  seasonOrder,
  episodesQuantity,
}) => {
  return (
    <div className={styles.root}>
      {episodeOrder === episodesQuantity ? (
        <button disabled className={styles.btn}>
          Следующая серия
        </button>
      ) : (
        <LinkBtn
          href={`/series/${seriesId}/season/${seasonOrder}/episode/${episodeOrder + 1}`}
        >
          <button className={styles.btn}>Следующая серия</button>
        </LinkBtn>
      )}
    </div>
  );
};

export default NextEpisodeButton;
