"use client";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditInfo.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import { ISeries } from "@/components/series/Series.types";
import { EditSeriesDto, seriesService } from "@/services/series.service";

interface Props {
  seriesDetails: ISeries;
}

const EditInfo: FC<Props> = ({ seriesDetails }) => {
  const [seriesData, setSeriesData] = useState<EditSeriesDto>({
    title: seriesDetails.title,
    description: seriesDetails.description,
    releaseYear: seriesDetails.releaseYear.toString(),
    poster: seriesDetails.poster,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSeriesData({ ...seriesData, poster: e.target.files[0] });
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
    field: keyof typeof seriesData,
  ) => {
    setSeriesData({ ...seriesData, [field]: e.target.value });
  };

  const saveChangesHandler = async () => {
    const updatedSeries = await seriesService.editSeries(
      seriesData,
      seriesDetails.id,
    );
    setSeriesData(updatedSeries);
  };

  return (
    <div className={styles.seriesInfo}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <img
            src={
              posterPreviewSrc
                ? posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL + seriesDetails.poster
            }
            alt={seriesDetails.title}
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

      <div className={styles.seriesDetails}>
        <div className={styles.seriesTitle}>
          <EditableInput
            label={""}
            value={seriesData.title}
            onChange={(e) => changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.seriesReleaseYear}>
          <EditableInput
            label={"Год выхода :"}
            value={seriesData.releaseYear}
            onChange={(e) => changeSeriesDataHandler(e, "releaseYear")}
          />
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          <EditableTextarea
            label={""}
            value={seriesData.description}
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

export default EditInfo;
