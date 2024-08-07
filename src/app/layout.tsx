import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.scss";
import MainLayout from "@/components/layouts/MainLayout";
import Script from "next/script";
import { Suspense } from "react";
import YandexMetrika from "@/components/yandexMetrika/YandexMetrika";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Игра престолов и Дом Драконов смотреть онлайн бесплатно",
  description:
    "На ХолоТВ можно посмотреть сериалы Игра престолов и Дом Драконов онлайн все серии абсолютно бесплатно и без рекламы в отличном качестве FullHD в озвучке Lostfilm, HDRezka и официальном дубляже",
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
    title:
      "Сериалы Игра престолов и Дом Драконов - смотреть онлайн бесплатно все сезоны и серии",
    description:
      "На ХолоТВ можно посмотреть сериалы Игра престолов и Дом Драконов онлайн все серии абсолютно бесплатно и без рекламы в отличном качестве FullHD и официальным дубляжом",
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      {process.env.NODE_ENV === "production" && (
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
       
          ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {
                defer: true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
          });`}
        </Script>
      )}

      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
      )}

      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      )}
    </html>
  );
}
