import React from "react";
import styles from "./page.module.scss";
import SeasonPage from "@/components/series/seasonPage/SeasonPage";
import { seriesService } from "@/services/series.service";

export interface SeasonDetailsParams {
  seasonOrder: number;
  seriesId: number;
}

export const revalidate = 1800;

const Page = async ({ params }: { params: SeasonDetailsParams }) => {
  const [season, series] = await Promise.all([
    seriesService.getSeasonByOrder(params.seasonOrder, params.seriesId),
    seriesService.getSeriesById(params.seriesId),
  ]);

  return (
    <div className={styles.root}>
      <SeasonPage
        seasonData={season}
        seriesId={params.seriesId}
        seriesData={series}
        seasonOrder={params.seasonOrder}
      />
    </div>
  );
};

export default Page;
