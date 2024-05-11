"use client";
import React, { FC } from "react";
import styles from "./AdminSeriesPage.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import SeriesItem from "@/components/adminPage/adminSeriesPage/seriesItem/SeriesItem";
import MyLink from "@/components/UI/myLink/MyLink";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const AdminSeriesPage: FC<Props> = ({ series }) => {
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <input type="text" placeholder={"Поиск"} />
      </div>

      <MyLink href={"/admin/series/add"}>
        <button>добавить сериал</button>
      </MyLink>

      <div className={styles.seriesList}>
        {series.map((seriesItem) => (
          <SeriesItem seriesItem={seriesItem} key={seriesItem.id} />
        ))}
      </div>
    </div>
  );
};

export default AdminSeriesPage;
