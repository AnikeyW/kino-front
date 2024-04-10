import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import styles from "./Volume.module.scss";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  changeVolume: (volume: number) => void;
  toggleMute: () => void;
}

const Volume: FC<Props> = ({ changeVolume, toggleMute }) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMuteHandler = () => {
    toggleMute();
    if (volume === 0) {
      setVolume(0.3);
      setIsMuted(false);
      changeVolume(0.3);
      return;
    }
    setIsMuted((prev) => !prev);
  };

  const changeVolumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setVolume(value);
    changeVolume(value);
  };

  return (
    <div className={styles.root}>
      <button className={styles.root__muteBtn} onClick={toggleMuteHandler}>
        {volume >= 0.5 && !isMuted && <MdVolumeUp size={"30px"} />}
        {volume > 0 && !isMuted && volume < 0.5 && (
          <MdVolumeDown size={"30px"} />
        )}
        {(volume === 0 || isMuted) && <MdVolumeOff size={"30px"} />}
      </button>
      <input
        className={styles.volumeSlider}
        type="range"
        min={0}
        max={1}
        step={"any"}
        value={volume}
        onChange={changeVolumeHandler}
      />
    </div>
  );
};

export default Volume;
