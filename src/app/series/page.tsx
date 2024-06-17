import React from "react";
import styles from "./page.module.scss";
import SeriesList from "@/components/series/seriesList/SeriesList";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const revalidate = 1800;

const Page = async () => {
  const series = await seriesService.getSeries();
  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: "/series",
      title: "Сериалы",
    },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <article className={styles.root}>
        <SeriesList series={series} />
      </article>
    </>
  );
};

export default Page;
