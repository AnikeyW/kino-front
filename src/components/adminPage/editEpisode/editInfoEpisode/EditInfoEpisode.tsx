"use client";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditInfoEpisode.module.scss";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import { IEpisode } from "@/components/series/Series.types";
import { EditEpisodeDto, seriesService } from "@/services/series.service";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import PostersList from "@/components/adminPage/editEpisode/postersList/PostersList";
import Image from "next/image";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { MdOutlineRemoveCircle } from "react-icons/md";

interface Props {
  episodeDetails: IEpisode;
}

const EditInfoEpisode: FC<Props> = ({ episodeDetails }) => {
  const [episodeData, setEpisodeData] = useState<EditEpisodeDto>({
    title: episodeDetails.title,
    description: episodeDetails.description,
    order: episodeDetails.order.toString(),
    poster: episodeDetails.poster,
    newSubtitles: [],
    existSubtitles: episodeDetails.subtitles,
    releaseDate: episodeDetails.releaseDate.split("T")[0],
    skipCredits: episodeDetails.skipCredits,
    skipIntro: episodeDetails.skipIntro,
    skipRepeat: episodeDetails.skipRepeat,
  });

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof episodeData,
  ) => {
    setEpisodeData({ ...episodeData, [field]: e.target.value });
  };

  const onChangePoster = (thumbnailSrc: string) => {
    setEpisodeData({ ...episodeData, poster: thumbnailSrc });
  };

  const changeNewSubtitlesHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setEpisodeData({
        ...episodeData,
        newSubtitles: [...Array.from(e.target.files)],
      });
    }
  };

  const removeExistSubtitlesHandler = (subId: number) => {
    const subs = episodeData.existSubtitles.filter((s) => s.id !== subId);
    setEpisodeData({
      ...episodeData,
      existSubtitles: subs,
    });
  };

  const saveChangesHandler = async () => {
    const updatedEpisode = await seriesService.editEpisode(
      {
        title: episodeData.title,
        description: episodeData.description,
        order: episodeData.order,
        releaseDate: episodeData.releaseDate,
        poster: episodeData.poster,
        skipCredits: !episodeData.skipCredits
          ? null
          : Number(episodeData.skipCredits),
        skipIntro: !episodeData.skipIntro
          ? null
          : Number(episodeData.skipIntro),
        skipRepeat: !episodeData.skipRepeat
          ? null
          : Number(episodeData.skipRepeat),
        existSubtitles: episodeData.existSubtitles,
        newSubtitles: episodeData.newSubtitles,
      },
      episodeDetails.id,
    );
    setEpisodeData({
      title: updatedEpisode.title,
      description: updatedEpisode.description,
      order: updatedEpisode.order.toString(),
      releaseDate: updatedEpisode.releaseDate.split("T")[0],
      poster: updatedEpisode.poster,
      skipCredits: updatedEpisode.skipCredits,
      skipIntro: updatedEpisode.skipIntro,
      skipRepeat: updatedEpisode.skipRepeat,
      existSubtitles: updatedEpisode.subtitles,
      newSubtitles: [],
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div>
          <div className={styles.poster}>
            <Image
              src={
                process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episodeData.poster
              }
              alt={"poster"}
              fill={true}
              sizes="(max-width: 320px) 100vw, 320px"
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.title}>
            <EditableInput
              label={""}
              value={episodeData.title}
              onChange={(e) => changeEpisodeDataHandler(e, "title")}
            />
          </div>

          <div>
            <span>Дата выхода: </span>
            <input
              type="date"
              value={episodeData.releaseDate}
              onChange={(e) => changeEpisodeDataHandler(e, "releaseDate")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Порядковый номер: "}
              value={episodeData.order}
              onChange={(e) => changeEpisodeDataHandler(e, "order")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить интро(сек.): "}
              value={episodeData.skipIntro?.toString() || ""}
              onChange={(e) => changeEpisodeDataHandler(e, "skipIntro")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить повтор(сек.): "}
              value={episodeData.skipRepeat?.toString() || ""}
              onChange={(e) => changeEpisodeDataHandler(e, "skipRepeat")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить титры(сек.): "}
              value={episodeData.skipCredits?.toString() || ""}
              onChange={(e) => changeEpisodeDataHandler(e, "skipCredits")}
            />
          </div>

          <div className={styles.subtitles}>
            <div>Субтитры: </div>
            <div>
              <div>Существующие:</div>
              {episodeData.existSubtitles.length === 0 ? (
                <div>нет субтитров</div>
              ) : (
                <ul>
                  {episodeData.existSubtitles.map((sub) => (
                    <li key={sub.id}>
                      <span>
                        {
                          sub.src
                            .replace(/\\/g, "/")
                            .split("/")
                            .pop()
                            ?.split(".")[0]
                        }
                      </span>

                      <div onClick={() => removeExistSubtitlesHandler(sub.id)}>
                        <MdOutlineRemoveCircle color="red" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <MyButton>
                <FileUpload
                  setFile={changeNewSubtitlesHandler}
                  accept={".vtt,text/vtt"}
                  name={"subtitles"}
                  multiple={true}
                >
                  Добавить Субтитры
                </FileUpload>
              </MyButton>
              {episodeData.newSubtitles.length > 0 &&
                episodeData.newSubtitles.map((sub, index) => (
                  <div key={index}>{sub.name}</div>
                ))}
            </div>
          </div>

          <div className={styles.description}>
            <small>Описание:</small>
            <EditableTextarea
              label={""}
              value={episodeData.description}
              onChange={(e) => changeEpisodeDataHandler(e, "description")}
            />
          </div>

          <div className={styles.saveBtn}>
            <MyButton onClick={saveChangesHandler} variant={VariantsBtn.ACTION}>
              Сохранить
            </MyButton>
          </div>
        </div>
      </div>

      <div className={styles.postersList}>
        <PostersList
          episodeDetails={episodeDetails}
          changePoster={onChangePoster}
        />
      </div>
    </div>
  );
};

export default EditInfoEpisode;
