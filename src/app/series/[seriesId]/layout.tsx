import React from "react";
import { seriesService } from "@/services/series.service";
import { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL!),
  alternates: {
    canonical: "/",
  },
  title: "Игра престолов смотреть онлайн бесплатно все сезоны",
  description:
    "Сериал Игра престолов (Game of Thrones) смотреть онлайн все сезоны и серии бесплатно, без регистрации в хорошем качестве HD, FullHD 720-1080.",
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
    title: "Игра престолов смотреть онлайн бесплатно все сезоны",
    description:
      "Сериал Игра престолов (Game of Thrones) смотреть онлайн все сезоны и серии бесплатно, без регистрации в хорошем качестве HD, FullHD 720-1080.",
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: "Игра престолов смотреть онлайн",
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
