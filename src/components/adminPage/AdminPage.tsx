"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      router.push("/admin/series");
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Админ панель</h1>
    </div>
  );
};

export default AdminPage;
