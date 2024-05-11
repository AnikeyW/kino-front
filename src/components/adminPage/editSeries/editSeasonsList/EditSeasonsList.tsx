"use client";
import React, { FC } from "react";
import styles from "./EditSeasonsList.module.scss";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";
import AddSeason from "@/components/adminPage/editSeries/addSeason/AddSeason";
import { useRouter } from "next/navigation";

interface Props {
  seasons: ISeasonWithoutEpisodes[];
  seriesId: number;
}

const EditSeasonsList: FC<Props> = ({ seasons, seriesId }) => {
  const router = useRouter();

  return (
    <div className={styles.seasons}>
      <AddSeason seriesId={seriesId} seasons={seasons} />
      <div>Сезоны:</div>
      <div>
        {seasons.map((season) => (
          <div key={season.id}>
            <div>{season.title}</div>
            <button
              onClick={() =>
                router.push(
                  `/admin/series/edit/${seriesId}/season/${season.id}`,
                )
              }
            >
              Редактировать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSeasonsList;
