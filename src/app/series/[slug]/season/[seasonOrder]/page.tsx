import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import SeasonPage from "@/components/series/seasonPage/SeasonPage";

export interface SeasonDetailsParams {
  slug: string;
  seasonOrder: number;
}

export const revalidate = 1800;

const Page = async ({ params }: { params: SeasonDetailsParams }) => {
  const [season, series] = await Promise.all([
    seriesService.getSeasonByOrder(params.seasonOrder, params.slug),
    seriesService.getSeriesBySlug(params.slug),
  ]);

  const breadcrumbs = [
    {
      path: "/",
      title: "Сериалы",
    },
    {
      path: `/series/${series.slug}`,
      title: `${series.title}`,
    },
    {
      path: "",
      title: season.title,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <SeasonPage seasonData={season} seriesData={series} />
    </>
  );
};

export default Page;
