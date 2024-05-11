import React from "react";
import { seriesService } from "@/services/series.service";
import EditSeries from "@/components/adminPage/editSeries/EditSeries";

const Page = async ({ params }: { params: { seriesId: number } }) => {
  const data = await seriesService.getSeriesById(params.seriesId);
  return <EditSeries seriesDetails={data} />;
};

export default Page;
