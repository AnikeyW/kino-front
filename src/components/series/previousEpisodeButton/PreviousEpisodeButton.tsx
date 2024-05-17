import React, { FC } from "react";
import styles from "./PreviousEpisodeButton.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";

interface Props {
  episodeOrder: number;
  seriesId: number;
  seasonOrder: number;
}

const PreviousEpisodeButton: FC<Props> = ({
  episodeOrder,
  seriesId,
  seasonOrder,
}) => {
  return (
    <div className={styles.root}>
      {episodeOrder === 1 ? (
        <button disabled className={styles.btn}>
          Предыдущая серия
        </button>
      ) : (
        <LinkBtn
          href={`/series/${seriesId}/season/${seasonOrder}/episode/${episodeOrder - 1}`}
        >
          <button className={styles.btn}>Предыдущая серия</button>
        </LinkBtn>
      )}
    </div>
  );
};

export default PreviousEpisodeButton;
