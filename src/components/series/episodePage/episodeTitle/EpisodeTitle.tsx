"use client";
import React, { FC } from "react";
import TitleH2 from "@/components/UI/titleH2/TitleH2";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
}

const EpisodeTitle: FC<Props> = ({ episode, allEpisodes, seriesInfo }) => {
  const { episodeInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  return <TitleH2>«{episodeInfo.title || ""}»</TitleH2>;
};

export default EpisodeTitle;
