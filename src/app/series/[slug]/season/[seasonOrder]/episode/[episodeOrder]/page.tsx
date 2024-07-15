import React from "react";
import { seriesService } from "@/services/series.service";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import EpisodePage from "@/components/series/episodePage/EpisodePage";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
  seasonOrder: string;
  episodeOrder: string;
}

export const revalidate = 1800;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const [episode, series] = await Promise.all([
    seriesService.getEpisodeByOrder(
      Number(params.episodeOrder),
      Number(params.seasonOrder),
      params.slug,
    ),
    seriesService.getSeriesBySlug(params.slug),
  ]);

  if (!episode || !series) {
    return {
      title: "Страница не найдена",
      description: "Запрашиваемая страница не найдена",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${series.title} ${params.seasonOrder} сезон ${params.episodeOrder} серия - смотреть онлайн бесплатно`,
    description: `Сериал ${series.title} ${params.seasonOrder} сезон ${params.episodeOrder} серия - смотреть онлайн в хорошем качестве FullHD 1080 на любых платформах на ХолоТВ`,
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
      title: `${series.title} ${params.seasonOrder} сезон ${params.episodeOrder} серия - смотреть онлайн бесплатно`,
      description: `Сериал ${series.title} ${params.seasonOrder} сезон ${params.episodeOrder} серия - смотреть онлайн в хорошем качестве FullHD 1080 на любых платформах на ХолоТВ`,
      type: "website",
      locale: "ru_RU",
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}series/${params.slug}/season/${params.seasonOrder}/episode/${params.episodeOrder}`,
      siteName: "ХолоТВ Сериалы онлайн",
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
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
};

export async function generateStaticParams({ params }: { params: Params }) {
  // console.log('');
  const season = await seriesService.getSeasonByOrder(
    Number(params.seasonOrder),
    params.slug,
  );

  // if (!season) {
  //   return [];
  // }

  return season!.episodes.map((episode) => ({
    episodeOrder: episode.order.toString(),
  }));
}

const Page = async ({ params }: { params: Params }) => {
  const [episode, series, season] = await Promise.all([
    seriesService.getEpisodeByOrder(
      Number(params.episodeOrder),
      Number(params.seasonOrder),
      params.slug,
    ),
    seriesService.getSeriesBySlug(params.slug),
    seriesService.getSeasonByOrder(Number(params.seasonOrder), params.slug),
    // seriesService.getAllEpisodesBySeriesSlug(params.slug),
  ]);

  if (!episode || !series || !season) {
    notFound();
    return null;
  }

  let prevSeason = null;

  if (season.order !== 1) {
    const season = await seriesService.getSeasonByOrder(
      Number(params.seasonOrder) - 1,
      params.slug,
    );

    if (season) {
      prevSeason = season;
    }
  }

  const breadcrumbs = [
    {
      path: "/",
      title: "Сериалы",
    },
    {
      path: `/series/${series.slug}`,
      title: `${series!.title}`,
    },
    {
      path: `/series/${series.slug}/season/${params.seasonOrder}`,
      title: `Сезон ${season.order}`,
    },
    {
      path: "",
      title: `Серия ${episode.order}`,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <EpisodePage
        episode={episode}
        seasonOrder={Number(params.seasonOrder)}
        seasonEpisodes={season.episodes}
        seriesInfo={series}
        prevSeason={prevSeason}
        // allEpisodes={allEpisodes}
      />
    </>
  );
};

export default Page;
