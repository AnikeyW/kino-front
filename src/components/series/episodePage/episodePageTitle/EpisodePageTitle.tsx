"use client";
import React, { FC } from "react";
import TitleH1 from "@/components/UI/titleH1/TitleH1";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  seasonOrder: number;
  seriesInfo: ISeries;
  allEpisodes: IEpisode[];
}

const EpisodePageTitle: FC<Props> = ({
  seriesInfo,
  allEpisodes,
  episode,
  seasonOrder,
}) => {
  const { episodeInfo, seasonInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  return (
    <TitleH1
      text={`${seriesInfo.title} Сезон ${seasonInfo?.order || seasonOrder} Серия ${episodeInfo?.order || " "} смотреть онлайн`}
    />
  );
};

export default EpisodePageTitle;
