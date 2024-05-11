import React, { FC, PropsWithChildren } from "react";
import styles from "./MainLayout.module.scss";
import Link from "next/link";
import Container from "@/components/UI/container/Container";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerBox}>
            <Link href={"/"}>HOLO</Link>
            <nav className={styles.nav}>
              <Link href={"/series"}>Сериалы</Link>
              <Link href={"/movies"}>Фильмы</Link>
            </nav>
          </div>
        </Container>
      </header>

      <section className={styles.section}>
        <Container>{children}</Container>
      </section>
    </main>
  );
};

export default MainLayout;
