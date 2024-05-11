import React from "react";
import styles from "./page.module.scss";
import SeriesList from "@/components/series/seriesList/SeriesList";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";

export const revalidate = 1800;

const Page = async () => {
  const series = await seriesService.getSeries();
  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: "/series",
      title: "Сериалы",
    },
  ];
  return (
    <div className={styles.root}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <SeriesList series={series} />
    </div>
  );
};

export default Page;
