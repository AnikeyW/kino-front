"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const AdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const router = useRouter();
  //
  // const logoutHandler = async () => {
  //   try {
  //     await authService.logout();
  //     localStorage.removeItem("accessToken");
  //     await router.push("/login");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    // Проверяем текущий путь
    if (pathname === "/admin") {
      // Перенаправляем на /admin/series
      router.push("/admin/series");
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Админ панель</h1>
      {/*<button onClick={logoutHandler}>Выйти</button>*/}
    </div>
  );
};

export default AdminPage;
