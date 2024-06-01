"use client";
import React, { FC } from "react";
import styles from "./EditInfo.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import { ISeries } from "@/components/series/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import Image from "next/image";
import { useEditSeries } from "@/hooks/useEditSeries";

interface Props {
  seriesDetails: ISeries;
}

const EditInfo: FC<Props> = ({ seriesDetails }) => {
  const { data, actions } = useEditSeries(seriesDetails);

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <Image
            src={
              data.posterPreviewSrc
                ? data.posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                  seriesDetails.poster
            }
            alt={seriesDetails.title}
            fill={true}
            sizes={"200px"}
            priority={true}
          />
        </div>

        <div className={styles.changePoster}>
          <MyButton>
            <FileUpload
              setFile={actions.onChangePicture}
              accept={"image/*"}
              name={"poster"}
            >
              Выбрать постер
            </FileUpload>
          </MyButton>
        </div>
      </div>

      <div className={styles.seriesDetails}>
        <div className={styles.seriesTitle}>
          <EditableInput
            label={""}
            value={data.seriesData.title}
            onChange={(e) => actions.changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.seriesReleaseYear}>
          <EditableInput
            label={"Год выхода :"}
            value={data.seriesData.releaseYear}
            onChange={(e) => actions.changeSeriesDataHandler(e, "releaseYear")}
          />
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          <EditableTextarea
            label={""}
            value={data.seriesData.description}
            onChange={(e) => actions.changeSeriesDataHandler(e, "description")}
          />
        </div>

        <div className={styles.saveBtn}>
          <MyButton
            variant={VariantsBtn.ACTION}
            onClick={actions.saveChangesHandler}
            disabled={data.isChangesSaving}
          >
            {data.isChangesSaving ? "Сохранение..." : "Сохранить"}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
