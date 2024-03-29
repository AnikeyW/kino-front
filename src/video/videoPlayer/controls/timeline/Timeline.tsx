import styles from "./Timeline.module.scss";
import { FC, useEffect, useRef, MouseEvent } from "react";
import { formatTime } from "@/utils";

interface Props {
  currentDuration: number;
  totalDuration: number;
  changeCurrentTime: (seconds: number) => void;
}

const Timeline: FC<Props> = ({
  currentDuration,
  totalDuration,
  changeCurrentTime,
}) => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const previewTimeRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!timelineContainerRef.current) return;
    const rect = timelineContainerRef.current.getBoundingClientRect();

    const percent =
      Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;

    const seconds = percent * totalDuration;

    changeCurrentTime(seconds);
  };

  const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!timelineContainerRef.current || !previewTimeRef.current) return;

    const rect = timelineContainerRef.current.getBoundingClientRect();

    const percent = (e.clientX - rect.left) / rect.width;

    timelineContainerRef.current.style.setProperty(
      "--preview-position",
      percent.toString(),
    );

    const time = percent * totalDuration;

    previewTimeRef.current.innerText = formatTime(time);
  };

  useEffect(() => {
    if (!timelineContainerRef.current) return;

    const percent = currentDuration / totalDuration;

    timelineContainerRef.current.style.setProperty(
      "--progress-position",
      percent.toString(),
    );
  }, [totalDuration, currentDuration]);

  return (
    <div
      className={styles.root}
      ref={timelineContainerRef}
      onMouseMove={mouseMoveHandler}
    >
      <div className={styles.timeline} onClick={clickHandler}>
        <div className={styles.previewTime} ref={previewTimeRef}>
          12:32
        </div>
        <div className={styles.thumbIndicator}></div>
      </div>
    </div>
  );
};

export default Timeline;
