import { FC, memo } from "react";
import styles from "./Duration.module.scss";
import { formatTime } from "@/utils";

interface Props {
  currentTime: number;
  totalDuration: number;
}

const Duration: FC<Props> = ({ currentTime, totalDuration }) => {
  return (
    <div className={styles.duration}>
      <div className={styles.currentTime}>{formatTime(currentTime)}</div>/
      <div className={styles.totalTime}>{formatTime(totalDuration)}</div>
    </div>
  );
};

export default memo(Duration);
