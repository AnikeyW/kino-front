import React from "react";
import styles from "./page.module.scss";
import SeriesDetailsPage from "@/components/series/seriesDetailsPage/SeriesDetailsPage";
import { seriesService } from "@/services/series.service";

export const revalidate = 1800;

const Page = async ({ params }: { params: { seriesId: number } }) => {
  const data = await seriesService.getSeriesById(params.seriesId);

  return (
    <div className={styles.root}>
      <SeriesDetailsPage seriesDetails={data} />
    </div>
  );
};

export default Page;
