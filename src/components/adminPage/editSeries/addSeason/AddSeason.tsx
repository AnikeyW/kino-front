import React, { ChangeEvent, FC, useState } from "react";
import styles from "./AddSeason.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { CreateSeasonDto, seriesService } from "@/services/series.service";
import { useRouter } from "next/navigation";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";

interface Props {
  seriesId: number;
  seasons: ISeasonWithoutEpisodes[];
}

const AddSeason: FC<Props> = ({ seriesId, seasons }) => {
  const router = useRouter();
  const [seasonData, setSeasonData] = useState<CreateSeasonDto>({
    title: `Сезон ${seasons.length + 1}`,
    description: "",
    order: seasons.length + 1,
    poster: null,
    seriesId: seriesId,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [error, setError] = useState("");

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setSeasonData({ ...seasonData, poster: e.target.files[0] });
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

  const changeSeasonDataHandler = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof seasonData,
  ) => {
    setSeasonData({ ...seasonData, [field]: e.target.value });
  };

  const addSeasonHandler = async () => {
    if (!seasonData.poster) {
      setError("Добавь постер");
      return;
    }
    const response = await seriesService.addSeason(seasonData);
    setSeasonData({
      title: "",
      description: "",
      order: seasons.length + 1,
      poster: null,
      seriesId: seriesId,
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
            value={seasonData.title}
            onChange={(e) => changeSeasonDataHandler(e, "title")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder={"Описание"}
            value={seasonData.description}
            onChange={(e) => changeSeasonDataHandler(e, "description")}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder={"Порядковый номер"}
            value={seasonData.order}
            onChange={(e) => changeSeasonDataHandler(e, "order")}
          />
        </div>

        <button onClick={addSeasonHandler}>добавить сезон</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default AddSeason;
