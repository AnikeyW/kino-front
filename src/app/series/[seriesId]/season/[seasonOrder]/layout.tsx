import React from "react";
import { seriesService } from "@/services/series.service";
import { SeasonDetailsParams } from "@/app/series/[seriesId]/season/[seasonOrder]/page";

export const revalidate = 1800;

export async function generateStaticParams({
  params,
}: {
  params: SeasonDetailsParams;
}) {
  const series = await seriesService.getSeriesById(params.seriesId);

  return series.seasons.map((season) => ({
    seasonOrder: season.order.toString(),
  }));
}

const SeasonDetailsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default SeasonDetailsLayout;
