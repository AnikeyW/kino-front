import React from "react";
import { seriesService } from "@/services/series.service";
import EditEpisode from "@/components/adminPage/editEpisode/EditEpisode";

export const revalidate = 0;

const Page = async ({
  params,
}: {
  params: { seriesId: number; seasonId: number; episodeId: number };
}) => {
  const data = await seriesService.getEpisodeById(params.episodeId);

  return (
    <EditEpisode
      episodeDetails={data}
      seriesId={params.seriesId}
      seasonId={params.seasonId}
    />
  );
};

export default Page;
