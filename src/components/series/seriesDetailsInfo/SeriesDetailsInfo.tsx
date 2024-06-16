import React, { FC } from "react";
import styles from "./SeriesDetailsInfo.module.scss";
import Image from "next/image";
import { ISeries } from "@/components/series/Series.types";
import { getQualityName, isJSON } from "@/utils";

interface Props {
  seriesDetails: ISeries;
}

const SeriesDetailsInfo: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <div className={styles.details}>
        <div className={styles.poster}>
          <Image
            src={
              process.env.NEXT_PUBLIC_SERVER_URL_STATIC + seriesDetails.poster
            }
            alt={"series_poster"}
            fill={true}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{seriesDetails.title}</h1>

          <div className={styles.infoItem}>
            <small>Год выхода: </small>
            <span>{seriesDetails.releaseYear}</span>
          </div>

          <div className={styles.infoItem}>
            <small>Страна: </small>
            <span>
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
            <span>
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
            <span>{seriesDetails.rateKinopoisk}</span>
          </div>

          <div className={styles.infoItem}>
            <small>Рейтинг IMDB: </small>
            <span>{seriesDetails.rateImdb}</span>
          </div>

          {isJSON(seriesDetails.description) ? (
            <div className={styles.descriptionDesktop}>
              {JSON.parse(seriesDetails.description).map(
                (paragraph: string, index: number) => (
                  <p style={{ marginBottom: "1rem" }} key={index}>
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          ) : (
            <div className={styles.descriptionDesktop}>
              <p>{seriesDetails.description}</p>
            </div>
          )}
        </div>
      </div>

      {isJSON(seriesDetails.description) ? (
        <div className={styles.descriptionMobile}>
          {JSON.parse(seriesDetails.description).map(
            (paragraph: string, index: number) => (
              <p style={{ marginBottom: "1rem" }} key={index}>
                {paragraph}
              </p>
            ),
          )}
        </div>
      ) : (
        <div className={styles.descriptionMobile}>
          <p>{seriesDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default SeriesDetailsInfo;
