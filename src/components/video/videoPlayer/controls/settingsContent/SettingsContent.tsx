import styles from "./SettingsContent.module.scss";
import {
  MdClosedCaption,
  MdDone,
  MdOutlineArrowBackIos,
  MdOutlineSpeed,
  MdVideoSettings,
} from "react-icons/md";
import { Dispatch, FC, SetStateAction, useState } from "react";
import SettingsMenuItem from "@/components/video/videoPlayer/controls/settingsMenuItem/SettingsMenuItem";
import {
  IAudio,
  IQuality,
  IVideo,
  PlayBackSpeedType,
} from "@/components/video/videoPlayer/videoPlayer.interface";

enum PopupPages {
  MENU = "menu",
  QUALITY = "quality",
  SPEED = "speed",
  SUBTITLES = "subtitles",
  AUDIO = "audio",
}

interface Props {
  video: IVideo;
  audio: IAudio;
  quality: IQuality;
  playBackSpeed: PlayBackSpeedType;
  isCaptionsOn: boolean;
  setQualityHandler: (quality: IQuality) => void;
  setIsOpenPopup: Dispatch<SetStateAction<boolean>>;
  changePlaybackSpeedHandler: (playbackSpeed: PlayBackSpeedType) => void;
  changeAudioHandler: (audio: IAudio) => void;
}

const playBackSpeeds: PlayBackSpeedType[] = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2,
];

const SettingsContent: FC<Props> = ({
  video,
  audio,
  quality,
  playBackSpeed,
  isCaptionsOn,
  setQualityHandler,
  setIsOpenPopup,
  changePlaybackSpeedHandler,
  changeAudioHandler,
}) => {
  const [popupPage, setPopupPage] = useState(PopupPages.MENU);

  const clickQualityHandler = (quality: IQuality) => {
    setQualityHandler(quality);
    setIsOpenPopup(false);
    setPopupPage(PopupPages.MENU);
  };

  return (
    <div className={styles.popupContent}>
      {popupPage === PopupPages.MENU && (
        <>
          <SettingsMenuItem
            onClick={() => setPopupPage(PopupPages.SUBTITLES)}
            icon={<MdClosedCaption size={18} />}
            iconShow={true}
            itemName={"Субтитры"}
            itemValue={isCaptionsOn ? "Вкл" : "Выкл"}
          />
          <SettingsMenuItem
            onClick={() => setPopupPage(PopupPages.SPEED)}
            icon={<MdOutlineSpeed size={18} />}
            iconShow={true}
            itemName={"Скорость"}
            itemValue={playBackSpeed === 1 ? "Обычная" : `${playBackSpeed}x`}
          />
          <SettingsMenuItem
            onClick={() => setPopupPage(PopupPages.QUALITY)}
            icon={<MdVideoSettings size={18} />}
            iconShow={true}
            itemName={"Качество"}
            itemValue={quality.res.toString()}
          />
          <SettingsMenuItem
            onClick={() => setPopupPage(PopupPages.AUDIO)}
            icon={<MdVideoSettings size={18} />}
            iconShow={true}
            itemName={"Озвучка"}
            itemValue={audio.title}
          />
        </>
      )}
      {popupPage === PopupPages.QUALITY && (
        <>
          <div
            onClick={() => setPopupPage(PopupPages.MENU)}
            className={styles.menuTitle}
          >
            <MdOutlineArrowBackIos />
            Качество
          </div>
          {audio.qualities.map((q) => (
            <SettingsMenuItem
              key={q.res}
              onClick={() => clickQualityHandler(q)}
              icon={<MdDone size={18} />}
              iconShow={q.res === quality.res}
              itemName={q.res.toString()}
            />
          ))}
        </>
      )}

      {popupPage === PopupPages.SUBTITLES && (
        <>
          <div
            onClick={() => setPopupPage(PopupPages.MENU)}
            className={styles.menuTitle}
          >
            <MdOutlineArrowBackIos />
            Субтитры
          </div>
          <SettingsMenuItem
            onClick={() => {}}
            icon={<MdDone size={18} />}
            iconShow={!isCaptionsOn}
            itemName={"Выкл"}
          />
          {video.captions.map((caption, index) => (
            <SettingsMenuItem
              key={index}
              onClick={() => {}}
              icon={<MdDone size={18} />}
              iconShow={false}
              itemName={caption.title}
            />
          ))}
        </>
      )}

      {popupPage === PopupPages.SPEED && (
        <>
          <div
            onClick={() => setPopupPage(PopupPages.MENU)}
            className={styles.menuTitle}
          >
            <MdOutlineArrowBackIos />
            Скорость
          </div>
          {playBackSpeeds.map((speed) => (
            <SettingsMenuItem
              key={speed}
              onClick={() => changePlaybackSpeedHandler(speed)}
              icon={<MdDone size={18} />}
              iconShow={playBackSpeed === speed}
              itemName={speed === 1 ? "Обычная" : `${speed}x`}
            />
          ))}
        </>
      )}

      {popupPage === PopupPages.AUDIO && (
        <>
          <div
            onClick={() => setPopupPage(PopupPages.MENU)}
            className={styles.menuTitle}
          >
            <MdOutlineArrowBackIos />
            Озвучка
          </div>
          {video.audios.map((a) => (
            <SettingsMenuItem
              key={a.id}
              onClick={() => changeAudioHandler(a)}
              icon={<MdDone size={18} />}
              iconShow={audio.id === a.id}
              itemName={a.title}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default SettingsContent;
