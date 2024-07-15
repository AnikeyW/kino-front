import React from "react";
import { seriesService } from "@/services/series.service";

export const revalidate = 1800;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const seriesDetails = await seriesService.getSeriesBySlug(params.slug);

  if (!seriesDetails) {
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
    alternates: {
      canonical: false,
    },
    title: `${seriesDetails.title} смотреть онлайн все сезоны и серии`,
    description: `Сериал ${seriesDetails.title} смотреть онлайн в хорошем качестве FullHD 1080 все сезоны и серии бесплатно, без регистрации в озвучке Lostfilm, HDRezka и официальном дубляже`,
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
      title: `${seriesDetails.title} смотреть все сезоны и серии онлайн`,
      description: `Сериал ${seriesDetails.title} смотреть онлайн все сезоны и серии бесплатно, без регистрации в хорошем качестве FullHD 1080`,
      type: "website",
      locale: "ru_RU",
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}series/${params.slug}`,
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

export async function generateStaticParams() {
  const series = await seriesService.getSeries();

  return series.map((ser) => ({
    slug: ser.slug,
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
