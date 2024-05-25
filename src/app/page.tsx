import React from "react";
import styles from "./page.module.scss";
import { seriesService } from "@/services/series.service";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import SeriesDetailsInfo from "@/components/series/seriesDetailsInfo/SeriesDetailsInfo";
import SeasonList from "@/components/series/seasonList/SeasonList";

export const revalidate = 1800;

const Page = async () => {
  const seriesDetails = await seriesService.getSeriesById(1);

  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
  ];

  return (
    <div className={styles.root}>
      <DetailsPage>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <SeriesDetailsInfo seriesDetails={seriesDetails} />
        <SeasonList seasons={seriesDetails.seasons} />
      </DetailsPage>
    </div>
  );
};

export default Page;
