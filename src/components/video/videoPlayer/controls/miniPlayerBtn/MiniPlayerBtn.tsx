import { MdBrandingWatermark } from "react-icons/md";
import { FC } from "react";

interface Props {
  miniPlayerHandler: () => void;
}

const MiniPlayerBtn: FC<Props> = ({ miniPlayerHandler }) => {
  return (
    <button onClick={miniPlayerHandler}>
      <MdBrandingWatermark size={28} />
    </button>
  );
};

export default MiniPlayerBtn;
