import React from "react";
import styles from "./page.module.scss";
import { seriesService } from "@/services/series.service";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import SeasonDetailsInfo from "@/components/series/seasonDetailsInfo/seasonDetailsInfo";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import EpisodeList from "@/components/series/episodeList/EpisodeList";
import BlockWrapper from "@/components/UI/blockWrapper/BlockWrapper";

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
      title: "Главная",
    },
    {
      path: "",
      title: season.title,
    },
  ];

  return (
    <div className={styles.root}>
      <DetailsPage>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/*<BlockWrapper>*/}
        <SeasonDetailsInfo seasonData={season} />
        {/*</BlockWrapper>*/}
        {/*<BlockWrapper>*/}
        <EpisodeList
          episodes={season.episodes}
          seriesId={params.seriesId}
          seasonOrder={params.seasonOrder}
        />
        {/*</BlockWrapper>*/}
      </DetailsPage>
    </div>
  );
};

export default Page;
