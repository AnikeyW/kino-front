import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import SeriesPage from "@/components/series/seriesPage/SeriesPage";
import { notFound } from "next/navigation";

export const revalidate = 1800;

const Page = async ({ params }: { params: { slug: string } }) => {
  const seriesDetails = await seriesService.getSeriesBySlug(params.slug);

  if (!seriesDetails) {
    notFound();
    return null;
  }

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
