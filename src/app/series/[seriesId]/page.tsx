import React from "react";
import { seriesService } from "@/services/series.service";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
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
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <DetailsPage>
        <SeriesDetailsInfo seriesDetails={seriesDetails} />
        <SeasonList seasons={seriesDetails.seasons} />
      </DetailsPage>
    </>
  );
};

export default Page;
