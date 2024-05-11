import React, { FC } from "react";
import { IEpisode } from "@/components/series/Series.types";
import styles from "./EditEpisodesList.module.scss";
import { useRouter } from "next/navigation";
import AddEpisode from "@/components/adminPage/editSeason/addEpisode/AddEpisode";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonId: number;
}

const EditEpisodesList: FC<Props> = ({ episodes, seriesId, seasonId }) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <AddEpisode episodes={episodes} seasonId={seasonId} />
      <div>Эпизоды:</div>
      <div>
        {episodes.map((episode) => (
          <div key={episode.id}>
            <div>{episode.title}</div>
            <button
              onClick={() =>
                router.push(
                  `/admin/series/edit/${seriesId}/season/${seasonId}/episode/${episode.id}`,
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

export default EditEpisodesList;
