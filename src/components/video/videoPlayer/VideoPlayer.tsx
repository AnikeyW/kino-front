"use client";
import React, { FC } from "react";
import cl from "classnames";
import styles from "./VideoPlayer.module.scss";
import { IVideo } from "@/components/video/videoPlayer/videoPlayer.interface";
import { usePlayer } from "@/components/video/videoPlayer/usePlayer";
import Timeline from "@/components/video/videoPlayer/controls/timeline/Timeline";
import PlayPauseBtn from "@/components/video/videoPlayer/controls/playPauseBtn/PlayPauseBtn";
import Volume from "@/components/video/videoPlayer/controls/volume/Volume";
import Duration from "@/components/video/videoPlayer/controls/duration/Duration";
import SettingsBtn from "@/components/video/videoPlayer/controls/settingsBtn/SettingsBtn";
import Captions from "@/components/video/videoPlayer/controls/captions/Captions";
import MiniPlayerBtn from "@/components/video/videoPlayer/controls/miniPlayerBtn/MiniPlayerBtn";
import FullScreenBtn from "@/components/video/videoPlayer/controls/fullScreenBtn/FullScreenBtn";

interface Props {
  video: IVideo;
}

const VideoPlayer: FC<Props> = ({ video }) => {
  const { videoRef, status, actions } = usePlayer(video);

  return (
    <div
      className={cl(styles.root, {
        [styles.controlsContainerShow]: status.isControlsShow,
      })}
      onMouseEnter={actions.mouseEnterHandler}
      onMouseLeave={actions.mouseLeaveHandler}
      onMouseMove={actions.mouseMoveHandler}
    >
      <div className={cl(styles.controlsContainer)}>
        <Timeline
          currentTime={status.currentTime}
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
            currentTime={status.currentTime}
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
