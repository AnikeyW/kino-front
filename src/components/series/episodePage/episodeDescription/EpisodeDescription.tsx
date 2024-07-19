"use client";
import React, { FC } from "react";
import DescriptionBlock from "@/components/UI/descriptionBlock/DescriptionBlock";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface Props {
  episode: IEpisode;
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
}

const EpisodeDescription: FC<Props> = ({
  episode,
  allEpisodes,
  seriesInfo,
}) => {
  const { episodeInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  return <DescriptionBlock description={episodeInfo.description} />;
};

export default EpisodeDescription;
