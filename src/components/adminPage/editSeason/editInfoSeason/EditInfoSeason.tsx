import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditInfoSeason.module.scss";
import { ISeason } from "@/components/series/Series.types";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import {
  EditSeasonDto,
  EditSeriesDto,
  seriesService,
} from "@/services/series.service";

interface Props {
  seasonDetails: ISeason;
}

const EditInfoSeason: FC<Props> = ({ seasonDetails }) => {
  const [seasonData, setSeasonData] = useState<EditSeasonDto>({
    title: seasonDetails.title,
    description: seasonDetails.description,
    order: seasonDetails.order.toString(),
    poster: seasonDetails.poster,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const changeSeriesDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof seasonData,
  ) => {
    setSeasonData({ ...seasonData, [field]: e.target.value });
  };

  const saveChangesHandler = async () => {
    const updatedSeason = await seriesService.editSeason(
      seasonData,
      seasonDetails.id,
    );
    setSeasonData(updatedSeason);
  };

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <img
            src={
              posterPreviewSrc
                ? posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL + seasonDetails.poster
            }
            alt={seasonDetails.title}
          />
        </div>

        <div className={styles.changePosterBtn}>
          <FileUpload
            setFile={onChangePicture}
            accept={"image/*"}
            name={"poster"}
          >
            Изменить постер
          </FileUpload>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.title}>
          <EditableInput
            label={""}
            value={seasonData.title}
            onChange={(e) => changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.order}>
          <EditableInput
            label={"Порядковый номер: "}
            value={seasonData.order}
            onChange={(e) => changeSeriesDataHandler(e, "order")}
          />
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          <EditableTextarea
            label={""}
            value={seasonData.description}
            onChange={(e) => changeSeriesDataHandler(e, "description")}
          />
        </div>

        <div className={styles.saveBtn}>
          <button onClick={saveChangesHandler}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoSeason;
