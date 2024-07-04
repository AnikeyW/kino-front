import React from "react";
import { seriesService } from "@/services/series.service";
import { SeasonDetailsParams } from "@/app/series/[slug]/season/[seasonOrder]/page";

export const revalidate = 1800;

export const generateMetadata = async ({
  params,
}: {
  params: SeasonDetailsParams;
}) => {
  const series = await seriesService.getSeriesBySlug(params.slug);

  return {
    alternates: {
      canonical: false,
    },
    title: `${series.title} ${params.seasonOrder} сезон - смотреть онлайн бесплатно все серии`,
    description: `Сериал ${series.title} ${params.seasonOrder} сезон - смотреть онлайн все серии бесплатно в хорошем качестве HD 1080 официальный дубляж`,
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
      title: `${series.title} ${params.seasonOrder} сезон - смотреть онлайн бесплатно все серии`,
      description: `Сериал ${series.title} ${params.seasonOrder} сезон - смотреть онлайн все серии бесплатно в хорошем качестве HD 1080 официальный дубляж`,
      type: "website",
      locale: "ru_RU",
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}series/${params.slug}/season/${params.seasonOrder}`,
      siteName: "ХолоТВ Сериалы онлайн",
      images: {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}og-image.jpg`,
        type: "image/jpeg",
        width: 750,
        height: 420,
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

export async function generateStaticParams({
  params,
}: {
  params: SeasonDetailsParams;
}) {
  const series = await seriesService.getSeriesBySlug(params.slug);

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
