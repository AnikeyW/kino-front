import { FC } from "react";
import styles from "./Captions.module.scss";
import { MdClosedCaption, MdClosedCaptionDisabled } from "react-icons/md";

interface Props {
  isCaptionsOn: boolean;
  toggleCaptions: () => void;
}

const Captions: FC<Props> = ({ isCaptionsOn, toggleCaptions }) => {
  const captionsHandler = () => {
    toggleCaptions();
  };

  return (
    <button className={styles.root} onClick={captionsHandler}>
      {isCaptionsOn ? (
        <MdClosedCaption size={"30px"} />
      ) : (
        <MdClosedCaptionDisabled size={"30px"} />
      )}
    </button>
  );
};

export default Captions;
