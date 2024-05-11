import { FC, useState } from "react";
import { MdHd, MdOutlineHd, MdSettings } from "react-icons/md";
import { BsBadgeHdFill } from "react-icons/bs";
import styles from "./SettingsBtn.module.scss";
import Popup from "@/components/UI/popup/Popup";
import SettingsContent from "@/components/video/videoPlayer/controls/settingsContent/SettingsContent";
import {
  IAudio,
  IQuality,
  IVideo,
  PlayBackSpeedType,
} from "@/components/video/videoPlayer/videoPlayer.interface";

interface Props {
  video: IVideo;
  audio: IAudio;
  quality: IQuality;
  playBackSpeed: PlayBackSpeedType;
  isCaptionsOn: boolean;
  setQualityHandler: (quality: IQuality) => void;
  changePlaybackSpeedHandler: (playbackSpeed: PlayBackSpeedType) => void;
  changeAudioHandler: (audio: IAudio) => void;
}

const SettingsBtn: FC<Props> = ({
  video,
  audio,
  quality,
  playBackSpeed,
  isCaptionsOn,
  setQualityHandler,
  changePlaybackSpeedHandler,
  changeAudioHandler,
}) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const clickBtnHandler = () => {
    setIsOpenPopup((prev) => !prev);
  };

  return (
    <>
      <button className={styles.root} onClick={clickBtnHandler}>
        <MdSettings size={30} />
        {quality.res === 1080 && (
          <div className={styles.iconQuality}>
            <div className={styles.overlay}></div>
            <div className={styles.icon}>
              <BsBadgeHdFill size={16} color={"red"} />
            </div>
          </div>
        )}
      </button>
      <Popup isOpenPopup={isOpenPopup}>
        <SettingsContent
          video={video}
          audio={audio}
          quality={quality}
          isCaptionsOn={isCaptionsOn}
          playBackSpeed={playBackSpeed}
          setQualityHandler={setQualityHandler}
          setIsOpenPopup={setIsOpenPopup}
          changePlaybackSpeedHandler={changePlaybackSpeedHandler}
          changeAudioHandler={changeAudioHandler}
        />
      </Popup>
    </>
  );
};

export default SettingsBtn;
