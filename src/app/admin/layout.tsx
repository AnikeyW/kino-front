import React from "react";
import AdminPageLayout from "@/components/adminPage/adminPageLayout/AdminPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
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
