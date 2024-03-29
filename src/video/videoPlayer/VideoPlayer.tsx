"use client";
import React, { FC } from "react";
import { usePlayer } from "@/video/videoPlayer/usePlayer";
import cl from "classnames";
import styles from "./VideoPlayer.module.scss";
import PlayPauseBtn from "@/video/videoPlayer/controls/playPauseBtn/PlayPauseBtn";
import Timeline from "@/video/videoPlayer/controls/timeline/Timeline";
import Volume from "@/video/videoPlayer/controls/volume/Volume";
import Duration from "@/video/videoPlayer/controls/duration/Duration";
import FullScreenBtn from "@/video/videoPlayer/controls/fullScreenBtn/FullScreenBtn";
import MiniPlayerBtn from "@/video/videoPlayer/controls/miniPlayerBtn/MiniPlayerBtn";
import Captions from "@/video/videoPlayer/controls/captions/Captions";
import SettingsBtn from "@/video/videoPlayer/controls/settingsBtn/SettingsBtn";
import { IVideo } from "@/video/videoPlayer/videoPlayer.interface";

interface Props {
  video: IVideo;
}

const VideoPlayer: FC<Props> = ({ video }) => {
  const { videoRef, status, actions } = usePlayer(video);

  return (
    <div className={cl(styles.root)}>
      <div className={styles.controlsContainer}>
        <Timeline
          currentDuration={status.currentDuration}
          totalDuration={status.videoDuration}
          changeCurrentTime={actions.changeCurrentTime}
        />
        <div className={styles.controls}>
          <PlayPauseBtn
            isPlaying={status.isPlaying}
            togglePlayingVideo={actions.togglePlayingVideo}
          />
          <Volume
            changeVolume={actions.changeVideoVolume}
            toggleMute={actions.toggleMute}
          />
          <Duration
            totalDuration={status.videoDuration}
            currentDuration={status.currentDuration}
          />
          <SettingsBtn
            video={video}
            quality={status.quality}
            isCaptionsOn={status.isCaptionsOn}
            playBackSpeed={status.playBackSpeed}
            setQualityHandler={actions.setQualityHandler}
            changePlaybackSpeedHandler={actions.changePlaybackSpeedHandler}
          />
          <Captions
            toggleCaptions={actions.toggleCaptions}
            isCaptionsOn={status.isCaptionsOn}
          />
          <MiniPlayerBtn miniPlayerHandler={actions.miniPlayerHandler} />
          <FullScreenBtn
            isFullScreen={status.isFullScreen}
            fullScreenHandler={actions.fullScreenHandler}
          />
        </div>
      </div>
      <video
        ref={videoRef}
        autoPlay={false}
        controls={false}
        onClick={actions.togglePlayingVideo}
        onDoubleClick={actions.fullScreenHandler}
        onLoadedMetadata={actions.onLoadedDataHandler}
        onTimeUpdate={actions.timeUpdateHandler}
        onPause={actions.onPauseHandler}
        onPlay={actions.onPlayHandler}
        preload={"metadata"}
      >
        {}
        {/*<source src={video.qualities[0].src} type={video.qualities[0].type} />*/}
        <source src={status.quality.src} type={status.quality.type} />
        {video.captions.map((caption, index) => (
          <track
            key={index}
            kind={"captions"}
            srcLang={caption.srcLang}
            src={caption.src}
            title={caption.title}
          />
        ))}
      </video>
    </div>
  );
};

export default VideoPlayer;
