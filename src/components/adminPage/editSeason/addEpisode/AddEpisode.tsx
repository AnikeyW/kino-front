"use client";
import React, { FC } from "react";
import styles from "./AddEpisode.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { IEpisode } from "@/components/series/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import { useAddEpisode } from "@/hooks/useAddEpisode";

interface Props {
  episodes: IEpisode[];
  seasonId: number;
}

const AddEpisode: FC<Props> = ({ episodes, seasonId }) => {
  const { data, actions } = useAddEpisode(episodes, seasonId);

  return (
    <div className={styles.root}>
      <div>
        <div>
          <input
            type="text"
            placeholder={"Название"}
            value={data.episodeData.title}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "title")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder={"Описание"}
            value={data.episodeData.description}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "description")}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder={"Порядковый номер"}
            value={data.episodeData.order}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "order")}
          />
        </div>

        <div>
          <input
            type="date"
            value={data.episodeData.releaseDate}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "releaseDate")}
          />
        </div>

        <div className={styles.changeVideoBtn}>
          <MyButton>
            <FileUpload
              setFile={actions.onChangeVideo}
              accept={"video/mp4"}
              name={"video"}
            >
              Выбрать видео
            </FileUpload>
          </MyButton>
          {data.episodeData.video && <span>{data.episodeData.video.name}</span>}
        </div>

        <div className={styles.selectSubsBtn}>
          <MyButton>
            <FileUpload
              setFile={actions.changeSubtitlesHandler}
              accept={".vtt,text/vtt"}
              name={"subtitles"}
              multiple={true}
            >
              Выбрать Субтитры
            </FileUpload>
          </MyButton>
          {data.episodeData.subtitles.length > 0 &&
            data.episodeData.subtitles.map((sub, index) => (
              <div key={index}>{sub.name}</div>
            ))}
        </div>

        <MyButton
          onClick={actions.addEpisodeHandler}
          variant={VariantsBtn.ACTION}
        >
          Добавить Эпизод
        </MyButton>
        {data.uploadProgress.isUploading && (
          <progress value={data.uploadProgress.percent} max="100"></progress>
        )}
        {data.error && <div style={{ color: "red" }}>{data.error}</div>}
      </div>
    </div>
  );
};

export default AddEpisode;
