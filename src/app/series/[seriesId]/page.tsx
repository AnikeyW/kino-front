import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import SeriesPage from "@/components/series/seriesPage/SeriesPage";

export const revalidate = 1800;

const Page = async ({ params }: { params: { seriesId: number } }) => {
  const seriesDetails = await seriesService.getSeriesById(params.seriesId);

  const breadcrumbs = [
    {
      path: "/",
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
      <SeriesPage seriesDetails={seriesDetails} />
    </>
  );
};

export default Page;
