"use client";
import React, { FC } from "react";
import styles from "./AddSeries.module.scss";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import Image from "next/image";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import MyInput from "@/components/UI/myInput/MyInput";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import { useAddSeries } from "@/hooks/useAddSeries";

interface Props {
  closeModal: () => void;
}

const AddSeries: FC<Props> = ({ closeModal }) => {
  const { data, actions } = useAddSeries(closeModal);

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        {!!data.posterPreviewSrc && (
          <div className={styles.poster}>
            <Image src={data.posterPreviewSrc} alt={""} fill={true} />
          </div>
        )}

        <div className={styles.changePosterBtn}>
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

      <div className={styles.form}>
        <div className={styles.input}>
          <MyInput
            type={"text"}
            placeholder={"Название"}
            value={data.seriesData.title}
            onChange={(e) => actions.changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.input}>
          <span>Год выхода:</span>
          <MyInput
            type={"number"}
            placeholder={"Год выхода"}
            value={data.seriesData.releaseYear}
            onChange={(e) => actions.changeSeriesDataHandler(e, "releaseYear")}
          />
        </div>

        <div className={styles.input}>
          <MyInput
            type={"text"}
            placeholder={"Описание"}
            value={data.seriesData.description}
            onChange={(e) => actions.changeSeriesDataHandler(e, "description")}
          />
        </div>

        <div className={styles.addBtn}>
          <MyButton
            onClick={actions.addSeriesHandler}
            variant={VariantsBtn.ACTION}
            disabled={data.isLoading}
          >
            {data.isLoading ? "Добавление..." : "Добавить сериал"}
          </MyButton>
        </div>

        {data.error && <ErrorMessage message={data.error} />}
      </div>
    </div>
  );
};

export default AddSeries;
