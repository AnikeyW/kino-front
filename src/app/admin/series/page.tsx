import React from "react";
import AdminSeriesPage from "@/components/adminPage/adminSeriesPage/AdminSeriesPage";
import { seriesService } from "@/services/series.service";

const Page = async () => {
  const series = await seriesService.getSeries();

  return <AdminSeriesPage series={series} />;
};

export default Page;
