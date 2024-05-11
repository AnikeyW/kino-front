import React from "react";
import { seriesService } from "@/services/series.service";

export const revalidate = 1800;

export async function generateStaticParams() {
  const series = await seriesService.getSeries();

  return series.map((ser) => ({
    seriesId: ser.id.toString(),
  }));
}

const SeriesDetailsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default SeriesDetailsLayout;
