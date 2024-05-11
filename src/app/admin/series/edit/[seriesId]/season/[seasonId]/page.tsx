import React from "react";
import EditSeason from "@/components/adminPage/editSeason/EditSeason";
import { seriesService } from "@/services/series.service";

const Page = async ({
  params,
}: {
  params: { seriesId: number; seasonId: number };
}) => {
  const data = await seriesService.getSeasonById(
    params.seasonId,
    params.seriesId,
  );

  return <EditSeason seasonDetails={data} />;
};

export default Page;
