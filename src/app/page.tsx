import React from "react";
import { seriesService } from "@/services/series.service";
import SeriesList from "@/components/series/seriesList/SeriesList";
import styles from "./page.module.scss";
import TitleH1 from "@/components/UI/titleH1/TitleH1";
import Breadcrumbs from "@/components/UI/breadcrumbs/Breadcrumbs";
import TitleH2 from "@/components/UI/titleH2/TitleH2";

export const revalidate = 1800;

const Page = async () => {
  const series = await seriesService.getSeries();

  const breadcrumbs = [
    {
      path: "",
      title: "Сериалы",
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <article className={styles.root}>
        <div className={styles.titleH1}>
          <TitleH1
            text={"Сериалы Игра престолов и Дом дракона смотреть онлайн"}
          />
        </div>

        <p>
          На ХолоТВ доступны для просмотра сериалы Игра престолов и Дом
          Драконов. Здесь вы можете абсолютно бесплатно и без рекламы
          насладиться любимыми сериалами в отличном качестве FullHD.
        </p>

        <p>
          «Игра престолов» (Game of Thrones) и «Дом Дракона» (House of the
          Dragon) — это эпические фэнтези-сериалы, покорившие сердца миллионов
          зрителей по всему миру. Каждый эпизод полон интриг, захватывающих битв
          и неожиданных поворотов сюжета. На нашем сайте вы найдете все сезоны и
          эпизоды, готовые для просмотра в любое удобное для вас время.
        </p>

        <p>
          Наслаждайтесь любимыми сериалами в различных озвучках: Lostfilm,
          HDRezka, а также в официальном дубляже. Вне зависимости от ваших
          предпочтений, вы найдете идеальный вариант для себя. Просмотр доступен
          в высоком качестве FullHD, что позволит вам полностью погрузиться в
          удивительный мир Вестероса.
        </p>

        <div className={styles.titleH2}>
          <TitleH2>
            Смотрите сериалы в озвучке Lostfilm, HDRezka, а так же в официальном
            дубляже
          </TitleH2>
        </div>

        <SeriesList series={series} />

        <p>
          Не пропустите возможность окунуться в мир интриг, власти и драконов.
          Присоединяйтесь к миллионам фанатов, которые уже посмотрели и оценили
          качество наших услуг. Ваши любимые сериалы ждут вас на ХолоТВ —
          смотрите онлайн без рекламы и совершенно бесплатно!
        </p>
      </article>
    </>
  );
};

export default Page;
