import React from "react";
import { seriesService } from "@/services/series.service";
import EpisodePage from "@/components/series/episodePage/EpisodePage";
import { notFound } from "next/navigation";
import EpisodeBreadcrubs from "@/components/series/episodePage/episodeBreadcrubs/EpisodeBreadcrubs";

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
  const season = await seriesService.getSeasonByOrder(
    Number(params.seasonOrder),
    params.slug,
  );

  if (!season) {
    return [];
  }

  return season.episodes.map((episode) => ({
    episodeOrder: episode.order.toString(),
  }));
}

const Page = async ({ params }: { params: Params }) => {
  const [episode, series, season, allEpisodes] = await Promise.all([
    seriesService.getEpisodeByOrder(
      Number(params.episodeOrder),
      Number(params.seasonOrder),
      params.slug,
    ),
    seriesService.getSeriesBySlug(params.slug),
    seriesService.getSeasonByOrder(Number(params.seasonOrder), params.slug),
    seriesService.getAllEpisodesBySeriesSlug(params.slug),
  ]);

  if (!episode || !series || !season || !allEpisodes) {
    notFound();
    return null;
  }

  return (
    <>
      <EpisodeBreadcrubs
        episode={episode}
        allEpisodes={allEpisodes}
        seriesInfo={series}
        season={season}
      />
      <EpisodePage
        episode={episode}
        seriesInfo={series}
        allEpisodes={allEpisodes}
        seasonInfo={season}
      />
    </>
  );
};

export default Page;
