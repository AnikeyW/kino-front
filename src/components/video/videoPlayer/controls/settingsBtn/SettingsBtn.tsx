import { MdSettings } from "react-icons/md";
import { FC, useState } from "react";
import styles from "./SettingsBtn.module.scss";
import Popup from "@/components/UI/popup/Popup";
import SettingsContent from "@/components/video/videoPlayer/controls/settingsContent/SettingsContent";
import {
  IQuality,
  IVideo,
  PlayBackSpeedType,
} from "@/components/video/videoPlayer/videoPlayer.interface";

interface Props {
  video: IVideo;
  quality: IQuality;
  playBackSpeed: PlayBackSpeedType;
  isCaptionsOn: boolean;
  setQualityHandler: (quality: IQuality) => void;
  changePlaybackSpeedHandler: (playbackSpeed: PlayBackSpeedType) => void;
}

const SettingsBtn: FC<Props> = ({
  video,
  quality,
  playBackSpeed,
  isCaptionsOn,
  setQualityHandler,
  changePlaybackSpeedHandler,
}) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const clickBtnHandler = () => {
    setIsOpenPopup((prev) => !prev);
  };

  return (
    <>
      <button className={styles.root} onClick={clickBtnHandler}>
        <MdSettings size={"30px"} />
      </button>
      <Popup isOpenPopup={isOpenPopup}>
        <SettingsContent
          video={video}
          quality={quality}
          isCaptionsOn={isCaptionsOn}
          playBackSpeed={playBackSpeed}
          setQualityHandler={setQualityHandler}
          setIsOpenPopup={setIsOpenPopup}
          changePlaybackSpeedHandler={changePlaybackSpeedHandler}
        />
      </Popup>
    </>
  );
};

export default SettingsBtn;
