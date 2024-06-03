"use client";
import React, { FC } from "react";
import styles from "./EditInfoEpisode.module.scss";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import { IEpisode } from "@/components/series/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import PostersList from "@/components/adminPage/editEpisode/postersList/PostersList";
import Image from "next/image";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { useEditEpisode } from "@/hooks/useEditEpisode";
import { isJSON } from "@/utils";

interface Props {
  episodeDetails: IEpisode;
}

const EditInfoEpisode: FC<Props> = ({ episodeDetails }) => {
  const { data, actions } = useEditEpisode(episodeDetails);

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div>
          <div className={styles.poster}>
            <Image
              src={
                process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                data.episodeData.poster
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
              value={data.episodeData.title}
              onChange={(e) => actions.changeEpisodeDataHandler(e, "title")}
            />
          </div>

          <div>
            <span>Дата выхода: </span>
            <input
              type="date"
              value={data.episodeData.releaseDate}
              onChange={(e) =>
                actions.changeEpisodeDataHandler(e, "releaseDate")
              }
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Порядковый номер: "}
              value={data.episodeData.order}
              onChange={(e) => actions.changeEpisodeDataHandler(e, "order")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить интро(сек.): "}
              value={data.episodeData.skipIntro?.toString() || ""}
              onChange={(e) => actions.changeEpisodeDataHandler(e, "skipIntro")}
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить повтор(сек.): "}
              value={data.episodeData.skipRepeat?.toString() || ""}
              onChange={(e) =>
                actions.changeEpisodeDataHandler(e, "skipRepeat")
              }
            />
          </div>

          <div className={styles.order}>
            <EditableInput
              label={"Пропустить титры(сек.): "}
              value={data.episodeData.skipCredits?.toString() || ""}
              onChange={(e) =>
                actions.changeEpisodeDataHandler(e, "skipCredits")
              }
            />
          </div>

          <div className={styles.subtitles}>
            <div>Субтитры: </div>
            <div>
              <div>Существующие:</div>
              {data.episodeData.existSubtitles.length === 0 ? (
                <div>нет субтитров</div>
              ) : (
                <ul>
                  {data.episodeData.existSubtitles.map((sub) => (
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

                      <div
                        onClick={() =>
                          actions.removeExistSubtitlesHandler(sub.id)
                        }
                      >
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
                  setFile={actions.changeNewSubtitlesHandler}
                  accept={".vtt,text/vtt"}
                  name={"subtitles"}
                  multiple={true}
                >
                  Добавить Субтитры
                </FileUpload>
              </MyButton>
              {data.episodeData.newSubtitles.length > 0 &&
                data.episodeData.newSubtitles.map((sub, index) => (
                  <div key={index}>{sub.name}</div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <small>Описание:</small>
        {isJSON(data.episodeData.description) ? (
          <>
            {JSON.parse(data.episodeData.description).map(
              (paragraph: string, index: number) => (
                <div style={{ display: "flex" }} className={styles.paragraph}>
                  <div className={styles.textArea}>
                    <EditableTextarea
                      key={index}
                      label={""}
                      value={paragraph}
                      placeholder={`Параграф ${index + 1}`}
                      defaultText={
                        paragraph === "" ? `Параграф ${index + 1}` : ""
                      }
                      onChange={(e) =>
                        actions.changeDescriptionHandler(e, index)
                      }
                    />
                  </div>

                  <div
                    onClick={() => actions.deleteParagraphHandler(index)}
                    className={styles.deleteParagraphBtn}
                  >
                    <MdOutlineRemoveCircle
                      title={`Удалить параграф ${index + 1}`}
                    />
                  </div>
                </div>
              ),
            )}
          </>
        ) : (
          <EditableTextarea
            label={""}
            value={data.episodeData.description}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "description")}
          />
        )}
        <MyButton onClick={actions.addParagraphHandler}>
          Добавить параграф
        </MyButton>
      </div>

      <div className={styles.saveBtn}>
        <MyButton
          onClick={actions.saveChangesHandler}
          variant={VariantsBtn.ACTION}
          disabled={data.isLoading}
        >
          {data.isLoading ? "Сохранение..." : "Сохранить"}
        </MyButton>
      </div>

      <div className={styles.postersList}>
        <PostersList
          episodeDetails={episodeDetails}
          changePoster={actions.onChangePoster}
        />
      </div>
    </div>
  );
};

export default EditInfoEpisode;
