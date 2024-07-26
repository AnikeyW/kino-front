import React, { FC } from "react";
import styles from "./SeriesDetailsInfo.module.scss";
import Image from "next/image";
import { ISeries } from "@/components/series/Series.types";
import { getQualityName } from "@/utils";
import RateValue from "@/components/UI/rateValue/RateValue";

interface Props {
  seriesDetails: ISeries;
}

const SeriesDetailsInfo: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.poster}>
          <Image
            src={
              process.env.NEXT_PUBLIC_SERVER_URL_STATIC + seriesDetails.poster
            }
            alt={`Сериал ${seriesDetails.title}`}
            fill={true}
            sizes={"300px"}
          />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <small>Название: </small>
          <span className={styles.value}>{seriesDetails.title}</span>
        </div>

        <div className={styles.infoItem}>
          <small>Год выхода: </small>
          <span className={styles.value}>{seriesDetails.releaseYear}</span>
        </div>

        <div className={styles.infoItem}>
          <small>Страна: </small>
          <span className={styles.value}>
            {seriesDetails.countries.map((country, index) => (
              <span key={index}>
                {country}
                {index < seriesDetails.countries.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>

        <div className={styles.infoItem}>
          <small>Жанр: </small>
          <span className={styles.value}>
            {seriesDetails.genres.map((genre, index) => (
              <span key={index}>
                {genre}
                {index < seriesDetails.genres.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>

        <div className={styles.infoItem}>
          <small>Качество: </small>
          <span>{getQualityName(seriesDetails.quality)}</span>
        </div>

        <div className={styles.infoItem}>
          <small>Рейтинг Кинопоиска: </small>
          {/*<span>{seriesDetails.rateKinopoisk}</span>*/}
          <RateValue value={seriesDetails.rateKinopoisk} />
        </div>

        <div className={styles.infoItem}>
          <small>Рейтинг IMDB: </small>
          {/*<span>{seriesDetails.rateImdb}</span>*/}
          <RateValue value={seriesDetails.rateImdb} />
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsInfo;
