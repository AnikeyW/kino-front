import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import styles from "./page.module.scss";
import EpisodeDetailsInfo from "@/components/series/episodeDetailsInfo/EpisodeDetailsInfo";
import BlockWrapper from "@/components/UI/blockWrapper/BlockWrapper";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";

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
  const [episode, series, season] = await Promise.all([
    seriesService.getEpisodeByOrder(
      params.episodeOrder,
      params.seasonOrder,
      params.seriesId,
    ),
    seriesService.getSeriesById(params.seriesId),
    seriesService.getSeasonByOrder(params.seasonOrder, params.seriesId),
  ]);

  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: "/series",
      title: "...",
    },
    {
      path: `/series/${series.id}`,
      title: "...",
    },
    {
      path: `/series/${series.id}/season/${params.seasonOrder}`,
      title: season.title,
    },
    {
      path: "",
      title: episode.title,
    },
  ];

  return (
    <div className={styles.root}>
      <DetailsPage>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <BlockWrapper>
          <EpisodeDetailsInfo
            episode={episode}
            seriesTitle={series.title}
            seasonOrder={params.seasonOrder}
            episodesQuantity={season.episodes.length}
            seriesId={params.seriesId}
          />
        </BlockWrapper>
      </DetailsPage>
    </div>
  );
};

export default Page;
