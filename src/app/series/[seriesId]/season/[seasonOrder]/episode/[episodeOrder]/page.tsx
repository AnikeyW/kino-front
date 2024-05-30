import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import styles from "./page.module.scss";
import EpisodeDetailsInfo from "@/components/series/episodeDetailsInfo/EpisodeDetailsInfo";
import DetailsPage from "@/components/UI/detailsPage/DetailsPage";
import { SeasonDetailsParams } from "@/app/series/[seriesId]/season/[seasonOrder]/page";

interface Params {
  seasonOrder: number;
  seriesId: number;
  episodeOrder: number;
}

export const revalidate = 1800;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const episode = await seriesService.getEpisodeByOrder(
    params.episodeOrder,
    params.seasonOrder,
    params.seriesId,
  );

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL!),
    alternates: {
      canonical: `/series/${params.seriesId}/season/${params.seasonOrder}/episode/${params.episodeOrder}`,
    },
    title: `Игра престолов ${params.seasonOrder} сезон ${params.episodeOrder} серия смотреть онлайн бесплатно`,
    description: `Сериал Игра престолов (Game of Thrones) смотреть онлайн ${params.seasonOrder} сезон ${params.episodeOrder} серию в хорошем качестве FullHD 1080 в русском дубляже на ПК, ТВ и мобильных устройствах.`,
    robots: {
      index: true,
      follow: true,
      noarchive: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
    },
    openGraph: {
      title: `Игра престолов ${params.seasonOrder} сезон ${params.episodeOrder} серия смотреть онлайн бесплатно`,
      description: `Сериал Игра престолов (Game of Thrones) смотреть онлайн ${params.seasonOrder} сезон ${params.episodeOrder} серию в хорошем качестве FullHD 1080 в русском дубляже на ПК, ТВ и мобильных устройствах.`,
      type: "website",
      locale: "ru_RU",
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}series/${params.seriesId}/season/${params.seasonOrder}/episode/${params.episodeOrder}`,
      siteName: "Игра престолов смотреть онлайн",
      images: {
        url: `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster}`,
        type: "image/webp",
        width: 360,
        height: 203,
      },
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
      apple: [
        { url: "/apple-touch-icon", sizes: "180x180", type: "image/png" },
      ],
    },
  };
};

export async function generateStaticParams({ params }: { params: Params }) {
  const season = await seriesService.getSeasonByOrder(
    params.seasonOrder,
    params.seriesId,
  );

  return season.episodes.map((episode) => ({
    episodeOrder: episode.order.toString(),
  }));
}

const Page = async ({ params }: { params: Params }) => {
  const [episode, series, season] = await Promise.all([
    seriesService.getEpisodeByOrder(
      params.episodeOrder,
      params.seasonOrder,
      params.seriesId,
    ),
    seriesService.getSeriesById(params.seriesId),
    seriesService.getSeasonByOrder(params.seasonOrder, params.seriesId),
  ]);

  const breadcrumbs = [
    {
      path: "/",
      title: "Главная",
    },
    {
      path: `/series/${series.id}/season/${params.seasonOrder}`,
      title: `Сезон ${season.order}`,
    },
    {
      path: "",
      title: `Серия ${episode.order}`,
    },
  ];

  return (
    <div className={styles.root}>
      <DetailsPage>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <EpisodeDetailsInfo
          episode={episode}
          seriesTitle={series.title}
          seasonOrder={params.seasonOrder}
          seriesId={params.seriesId}
          seasonEpisodes={season.episodes}
        />
      </DetailsPage>
    </div>
  );
};

export default Page;
