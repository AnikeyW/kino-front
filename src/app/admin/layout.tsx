import React from "react";
import AdminPageLayout from "@/components/adminPage/adminPageLayout/AdminPageLayout";
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

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminPageLayout>{children}</AdminPageLayout>;
};

export default Layout;
