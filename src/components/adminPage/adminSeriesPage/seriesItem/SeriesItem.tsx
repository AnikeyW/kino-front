"use client";
import React, { FC } from "react";
import styles from "./SeriesItem.module.scss";
import { ISeriesWithoutSeasons } from "@/components/series/Series.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  seriesItem: ISeriesWithoutSeasons;
}

const SeriesItem: FC<Props> = ({ seriesItem }) => {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_URL + seriesItem.poster}
          alt={seriesItem.title}
          width={60}
          height={60}
        />
      </div>
      <div>{seriesItem.title}</div>
      <button
        onClick={() => {
          router.push(`/admin/series/edit/${seriesItem.id}`);
        }}
      >
        Редактировать
      </button>
    </div>
  );
};

export default SeriesItem;
