import React from "react";
import { seriesService } from "@/services/series.service";

const Page = async ({
  params,
}: {
  params: { seriesId: number; seasonId: number; episodeId: number };
}) => {
  const data = await seriesService.getEpisodeById(params.episodeId);

  return <div>{data.title}</div>;
};

export default Page;