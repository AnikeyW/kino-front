import styles from "./Timeline.module.scss";
import { FC, useEffect, useRef } from "react";

interface Props {
  currentDuration: number;
  totalDuration: number;
}

const Timeline: FC<Props> = ({ currentDuration, totalDuration }) => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  // const isScrubbingRef = useRef<boolean>(false);
  // const totalDuration = useAppSelector(
  //   (state) => state.videoPlayer.totalDuration,
  // );
  // const currentDuration = useAppSelector(
  //   (state) => state.videoPlayer.currentDuration,
  // );
  // const isScrubbing = useAppSelector((state) => state.videoPlayer.isScrubbing);

  // const mouseDownHandler = () => {
  //   // dispatch(setIsScrubbing(true));
  //   isScrubbingRef.current = true;
  // };

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
      // onMouseDown={mouseDownHandler}
      ref={timelineContainerRef}
    >
      <div className={styles.timeline}>
        <div className={styles.thumbIndicator}></div>
      </div>
    </div>
  );
};

export default Timeline;
