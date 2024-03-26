import styles from "./page.module.css";
import VideoPlayer from "@/video/videoPlayer/VideoPlayer";
import { IVideo } from "@/video/video.interface";

const video: IVideo = {
  title: "Игра Престолов 1.1",
  defaultRes: "1080",
  qualities: [
    {
      res: "1080",
      src: "./GOT.S01E01.mp4",
      type: "video/mp4",
    },
    {
      res: "720",
      src: "./22.mp4",
      type: "video/mp4",
    },
  ],
  captions: [
    {
      title: "English",
      src: "./GOT.S01E01.BDRip.1080p_track9_[eng].1.srt",
      srcLang: "en",
    },
  ],
};

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoPlayer video={video} />
    </main>
  );
}
