"use client";
import React, { FC } from "react";
import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
  season: ISeason;
}

const EpisodeBreadcrubs: FC<Props> = ({
  episode,
  allEpisodes,
  seriesInfo,
  season,
}) => {
  const { episodeInfo, seasonInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  const breadcrumbs = [
    {
      path: "/",
      title: "Сериалы",
    },
    {
      path: `/series/${seriesInfo.slug}`,
      title: `${seriesInfo.title}`,
    },
    {
      path: `/series/${seriesInfo.slug}/season/${seasonInfo?.order || season.order}`,
      title: `Сезон ${seasonInfo?.order || season.order}`,
    },
    {
      path: "",
      title: `Серия ${episodeInfo?.order || episode.order}`,
    },
  ];
  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
};

export default EpisodeBreadcrubs;
