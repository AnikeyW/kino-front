import React from "react";
import { seriesService } from "@/services/series.service";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import SeasonDetailsInfo from "@/components/series/seasonDetailsInfo/seasonDetailsInfo";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import EpisodeList from "@/components/series/episodeList/EpisodeList";

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

  const breadcrumbs = [
    {
      path: "/",
      title: "Сериалы",
    },
    {
      path: `/series/${series.id}`,
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
      <DetailsPage>
        <SeasonDetailsInfo seasonData={season} seriesData={series} />
        <EpisodeList
          episodes={season.episodes}
          seriesId={params.seriesId}
          seasonOrder={params.seasonOrder}
        />
      </DetailsPage>
    </>
  );
};

export default Page;
