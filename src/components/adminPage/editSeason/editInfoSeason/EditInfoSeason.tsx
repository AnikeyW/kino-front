"use client";
import React, { FC } from "react";
import styles from "./EditInfoSeason.module.scss";
import { ISeason } from "@/components/series/Series.types";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import Image from "next/image";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import { useEditSeason } from "@/hooks/useEditSeason";

interface Props {
  seasonDetails: ISeason;
}

const EditInfoSeason: FC<Props> = ({ seasonDetails }) => {
  const { data, actions } = useEditSeason(seasonDetails);

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <Image
            src={
              data.posterPreviewSrc
                ? data.posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                  seasonDetails.poster
            }
            alt={seasonDetails.title}
            fill={true}
            sizes={"200px"}
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

      <div className={styles.details}>
        <div className={styles.title}>
          <EditableInput
            label={""}
            value={data.seasonData.title}
            onChange={(e) => actions.changeSeasonDataHandler(e, "title")}
          />
        </div>

        <div className={styles.order}>
          <EditableInput
            label={"Порядковый номер: "}
            value={data.seasonData.order}
            onChange={(e) => actions.changeSeasonDataHandler(e, "order")}
          />
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          <EditableTextarea
            label={""}
            value={data.seasonData.description}
            onChange={(e) => actions.changeSeasonDataHandler(e, "description")}
          />
        </div>

        <div className={styles.saveBtn}>
          <MyButton
            variant={VariantsBtn.ACTION}
            onClick={actions.saveChangesHandler}
            disabled={data.isLoading}
          >
            {data.isLoading ? "Сохранение..." : "Сохранить"}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default EditInfoSeason;
