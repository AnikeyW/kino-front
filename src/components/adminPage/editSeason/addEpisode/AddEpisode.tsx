"use client";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./AddEpisode.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { useRouter } from "next/navigation";
import { CreateEpisodeDto, seriesService } from "@/services/series.service";
import { IEpisode } from "@/components/series/Series.types";
import { timestampToStringData } from "@/utils";

interface Props {
  episodes: IEpisode[];
  // seriesId: number;
  seasonId: number;
}

const AddEpisode: FC<Props> = ({ episodes, seasonId }) => {
  const router = useRouter();
  const [episodeData, setEpisodeData] = useState<CreateEpisodeDto>({
    title: `Эпизод ${episodes.length + 1}`,
    description: "",
    order: episodes.length + 1,
    poster: null,
    seasonId: seasonId,
    releaseDate: 0,
    video: null,
    skipIntro: null,
    skipCredits: null,
    skipRepeat: null,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [error, setError] = useState("");

  const onChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setEpisodeData({ ...episodeData, video: e.target.files[0] });
    }
  };

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setEpisodeData({ ...episodeData, poster: e.target.files[0] });
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === "string") {
          setPosterPreviewSrc(img.result);
        }
      };
      img.readAsDataURL(e.target.files[0]);
    }
  };

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof episodeData,
  ) => {
    if (field === "releaseDate") {
      setEpisodeData({
        ...episodeData,
        [field]: new Date(e.target.value).getTime(),
      });
    } else {
      setEpisodeData({ ...episodeData, [field]: e.target.value });
    }
  };

  const addEpisodeHandler = async () => {
    if (!episodeData.poster || !episodeData.video) {
      setError("Добавь постер и видео");
      return;
    }
    const updatedSeries = await seriesService.addEpisode(episodeData);
    setEpisodeData({
      title: `Эпизод ${episodes.length + 1}`,
      description: "",
      order: episodes.length + 1,
      poster: null,
      seasonId: seasonId,
      video: null,
      releaseDate: 0,
      skipRepeat: null,
      skipCredits: null,
      skipIntro: null,
    });
    setPosterPreviewSrc("");
    router.refresh();
  };

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <img src={posterPreviewSrc} alt={""} />
        </div>

        <div className={styles.changePosterBtn}>
          <FileUpload
            setFile={onChangePicture}
            accept={"image/*"}
            name={"poster"}
          >
            Изменить
          </FileUpload>
        </div>
      </div>
      <div>
        <div>
          <input
            type="text"
            placeholder={"Название"}
            value={episodeData.title}
            onChange={(e) => changeEpisodeDataHandler(e, "title")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder={"Описание"}
            value={episodeData.description}
            onChange={(e) => changeEpisodeDataHandler(e, "description")}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder={"Порядковый номер"}
            value={episodeData.order}
            onChange={(e) => changeEpisodeDataHandler(e, "order")}
          />
        </div>

        <div>
          <input
            type="date"
            value={timestampToStringData(episodeData.releaseDate)}
            onChange={(e) => changeEpisodeDataHandler(e, "releaseDate")}
          />
        </div>

        <div className={styles.changeVideoBtn}>
          <FileUpload
            setFile={onChangeVideo}
            accept={"video/mp4"}
            name={"video"}
          >
            Выбрать видео
          </FileUpload>
        </div>

        <button onClick={addEpisodeHandler}>добавить Эпизлд</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default AddEpisode;
