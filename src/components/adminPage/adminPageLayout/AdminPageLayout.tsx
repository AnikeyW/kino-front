"use client";
import React, { FC, PropsWithChildren } from "react";
import styles from "./AdminPageLayout.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { authService } from "@/services/auth.service";
import MyLink from "@/components/UI/myLink/MyLink";
import cl from "classnames";

interface ILink {
  href: string;
  title: string;
}

const navLinks: ILink[] = [
  {
    href: "/admin/series",
    title: "Сериалы",
  },
  {
    href: "/admin/movies",
    title: "Фильмы",
  },
];

const AdminPageLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("accessToken");
      await router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.sideNav}>
        <div className={styles.title}>
          <h1>Админ панель</h1>
          <MdLogout
            onClick={logoutHandler}
            className={styles.logout}
            size={20}
            title={"Выйти"}
          />
        </div>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <MyLink href={link.href} key={link.href}>
              <div
                className={cl(styles.link, {
                  [styles.selectedLink]: pathname.includes(link.href),
                })}
              >
                {link.title}
              </div>
            </MyLink>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminPageLayout;
