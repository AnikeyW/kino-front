import { FC } from "react";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";

interface Props {
  isPlaying: boolean;
  togglePlayingVideo: () => void;
}

const PlayPauseBtn: FC<Props> = ({ isPlaying, togglePlayingVideo }) => {
  return (
    <button onClick={togglePlayingVideo}>
      {isPlaying ? (
        <MdOutlinePause size={"30px"} />
      ) : (
        <MdPlayArrow size={"30px"} />
      )}
    </button>
  );
};

export default PlayPauseBtn;
