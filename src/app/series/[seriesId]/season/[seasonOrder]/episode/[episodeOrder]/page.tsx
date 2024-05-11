import React from "react";
import VideoJsPlayer from "@/components/videojsPlayer/VideoJsPlayer";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import styles from "./page.module.scss";

interface Params {
  seasonOrder: number;
  seriesId: number;
  episodeOrder: number;
}

export const revalidate = 1800;

export async function generateStaticParams({ params }: { params: Params }) {
  const season = await seriesService.getSeasonByOrder(
    params.seasonOrder,
    params.seriesId,
  );

  return season.episodes.map((episode) => ({
    episodeOrder: episode.order.toString(),
  }));
}

const Page = async ({ params }: { params: Params }) => {
  const [episode, series] = await Promise.all([
    seriesService.getEpisodeByOrder(
      params.episodeOrder,
      params.seasonOrder,
      params.seriesId,
    ),
    seriesService.getSeriesById(params.seriesId),
  ]);

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
      path: `/series/${series.id}`,
      title: series.title,
    },
    {
      path: `/series/${series.id}/season/${params.seasonOrder}`,
      title: series.seasons.find((season) => season.order == params.seasonOrder)
        ?.title!,
    },
    {
      path: "",
      title: episode.title,
    },
  ];

  return (
    <div className={styles.root}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <VideoJsPlayer src={process.env.NEXT_PUBLIC_SERVER_URL + episode.src} />
    </div>
  );
};

export default Page;
