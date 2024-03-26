import { FC, memo } from "react";
import styles from "./Duration.module.scss";
import { formatTime } from "@/utils";

interface Props {
  currentDuration: number;
  totalDuration: number;
}

const Duration: FC<Props> = ({ currentDuration, totalDuration }) => {
  return (
    <div className={styles.duration}>
      <div className={styles.currentTime}>{formatTime(currentDuration)}</div>/
      <div className={styles.totalTime}>{formatTime(totalDuration)}</div>
    </div>
  );
};

export default memo(Duration);
