import React from "react";
import { seriesService } from "@/services/series.service";
import SeriesList from "@/components/series/seriesList/SeriesList";
import styles from "./page.module.scss";

export const revalidate = 1800;

const Page = async () => {
  const series = await seriesService.getSeries();

  return (
    <>
      <article className={styles.root}>
        <h1>Сериалы Игра престолов и Дом дракона смотреть онлайн</h1>

        <p>
          На ХолоТВ доступны для просмотра сериалы Игра престолов и Дом
          Драконов. Здесь вы можете абсолютно бесплатно и без рекламы
          насладиться любимыми сериалами в отличном качестве FullHD.
        </p>

        <h2>
          Смотрите сериалы в озвучке Lostfilm, HDRezka, а так же в официальном
          дубляже
        </h2>
        <SeriesList series={series} />
      </article>
    </>
  );
};

export default Page;
