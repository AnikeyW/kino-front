"use client";
import React, { FC, useState } from "react";
import { IEpisode } from "@/components/series/Series.types";
import styles from "./EditEpisodesList.module.scss";
import { useRouter } from "next/navigation";
import AddEpisode from "@/components/adminPage/editSeason/addEpisode/AddEpisode";
import Modal from "@/components/UI/modal/Modal";
import MyButton from "@/components/UI/myButton/MyButton";
import Image from "next/image";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonId: number;
}

const EditEpisodesList: FC<Props> = ({ episodes, seriesId, seasonId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.root}>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <AddEpisode
          episodes={episodes}
          seasonId={seasonId}
          closeModal={closeModal}
        />
      </Modal>

      <div className={styles.listTitle}>Эпизоды:</div>
      <MyButton onClick={() => setIsOpenModal(true)}>Добавить эпизод</MyButton>
      {episodes.length === 0 ? (
        <div>Нет эпизодов</div>
      ) : (
        <div className={styles.list}>
          {episodes.map((episode) => (
            <div key={episode.id} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemPoster}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster
                    }
                    alt={""}
                    fill={true}
                    sizes={"60px"}
                  />
                </div>
                <div className={styles.itemTitle}>
                  Серия {episode.order} {episode.title}
                </div>
              </div>

              <MyButton
                onClick={() =>
                  router.push(
                    `/admin/series/edit/${seriesId}/season/${seasonId}/episode/${episode.id}`,
                  )
                }
              >
                Редактировать
              </MyButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditEpisodesList;
