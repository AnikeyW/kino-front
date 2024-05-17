import React from "react";
import styles from "./page.module.scss";
import { seriesService } from "@/services/series.service";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import BlockWrapper from "@/components/UI/blockWrapper/BlockWrapper";
import SeriesDetailsInfo from "@/components/series/seriesDetailsInfo/SeriesDetailsInfo";
import SeasonList from "@/components/series/seasonList/SeasonList";

export const revalidate = 1800;

const Page = async ({ params }: { params: { seriesId: number } }) => {
  const seriesDetails = await seriesService.getSeriesById(params.seriesId);

  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: "/series",
      title: "Сериалы",
    },
    {
      path: "",
      title: seriesDetails.title,
    },
  ];

  return (
    <div className={styles.root}>
      <DetailsPage>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <BlockWrapper>
          <SeriesDetailsInfo seriesDetails={seriesDetails} />
        </BlockWrapper>
        <BlockWrapper>
          <SeasonList seasons={seriesDetails.seasons} />
        </BlockWrapper>
      </DetailsPage>
    </div>
  );
};

export default Page;
