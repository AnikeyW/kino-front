import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { FC } from "react";

interface Props {
  isFullScreen: boolean;
  fullScreenHandler: () => void;
}

const FullScreenBtn: FC<Props> = ({ isFullScreen, fullScreenHandler }) => {
  return (
    <button onClick={fullScreenHandler}>
      {isFullScreen ? (
        <MdFullscreenExit size={30} />
      ) : (
        <MdFullscreen size={35} />
      )}
    </button>
  );
};

export default FullScreenBtn;
