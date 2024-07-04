import React, { FC } from "react";
import styles from "./SeriesItem.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import MyLink from "@/components/UI/myLink/MyLink";
import Image from "next/image";
import { getQualityName } from "@/utils";
import classNames from "classnames";
import RateValue from "@/components/UI/rateValue/RateValue";
const cx = classNames.bind(styles);

interface Props {
  seriesDetails: ISeriesWithoutSeasons;
}

const SeriesItem: FC<Props> = ({ seriesDetails }) => {
  return (
    <li>
      <MyLink href={`/series/${seriesDetails.slug}`}>
        <div className={styles.root}>
          <div className={styles.quality}>
            {getQualityName(seriesDetails.quality)}
          </div>
          <div className={cx(styles.rate, styles.kinopoiskRate)}>
            <span className={styles.rateName}>Кинопоиск</span>
            <RateValue value={seriesDetails.rateKinopoisk} />
          </div>
          <div className={cx(styles.rate, styles.imdbRate)}>
            <span className={styles.rateName}>IMDB</span>
            <RateValue value={seriesDetails.rateImdb} />
          </div>
          <div className={styles.overlayText}>СМОТРЕТЬ ОНЛАЙН</div>
          <div className={styles.posterBox}>
            <div className={styles.poster}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                  seriesDetails.poster
                }
                alt={seriesDetails.title}
                fill={true}
                sizes={"300px"}
              />
            </div>
          </div>
          <div className={styles.title}>{seriesDetails.title}</div>
          <div className={styles.date}>
            <small>Дата выхода:</small>
            {seriesDetails.releaseYear}
          </div>
        </div>
      </MyLink>
    </li>
  );
};

export default SeriesItem;
