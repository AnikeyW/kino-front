import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  IQuality,
  IVideo,
  PlayBackSpeedType,
} from "@/video/videoPlayer/videoPlayer.interface";

export const usePlayer = (video: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [playBackSpeed, setPlayBackSpeed] = useState<PlayBackSpeedType>(1);
  const [quality, setQuality] = useState<IQuality>(
    video.qualities.find((q) => q.res === video.defaultRes)!,
  );

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullScreenChangeListener);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        fullScreenChangeListener,
      );
    };
  }, []);

  const onPauseHandler = () => {
    setIsPlaying(false);
  };

  const onPlayHandler = () => {
    setIsPlaying(true);
  };

  const onLoadedDataHandler = (e: SyntheticEvent<HTMLVideoElement>) => {
    setVideoDuration(e.currentTarget.duration);
  };

  const timeUpdateHandler = (e: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentDuration(e.currentTarget.currentTime);
  };

  const changePlaybackSpeedHandler = (playbackSpeed: PlayBackSpeedType) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackSpeed;
    setPlayBackSpeed(playbackSpeed);
  };

  const setQualityHandler = (quality: IQuality) => {
    const video = videoRef.current;
    if (!video) return;
    setQuality(quality);
    video.load();
    if (isPlaying) {
      video.play();
    }
  };

  const toggleCaptions = () => {
    if (!videoRef.current) return;
    //todo
    setIsCaptionsOn((prevState) => !prevState);
    if (videoRef.current.textTracks.length === 0) {
      setIsCaptionsOn(false);
      return;
    }
    videoRef.current.textTracks[0].mode = !isCaptionsOn ? "showing" : "hidden";
  };

  const miniPlayerHandler = () => {
    if (!videoRef.current) return;
    if (!document.pictureInPictureEnabled) {
      document.exitPictureInPicture();
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  const fullScreenChangeListener = () => {
    if (document.fullscreenElement !== null) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  const fullScreenHandler = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement === null) {
      video.parentElement!.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const changeVideoVolume = (volume: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = volume === 0;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };

  const togglePlayingVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return {
    videoRef,
    status: {
      isPlaying,
      videoDuration,
      currentDuration,
      isFullScreen,
      isCaptionsOn,
      playBackSpeed,
      quality,
    },
    actions: {
      togglePlayingVideo,
      changeVideoVolume,
      toggleMute,
      fullScreenHandler,
      miniPlayerHandler,
      toggleCaptions,
      setQualityHandler,
      changePlaybackSpeedHandler,
      onLoadedDataHandler,
      timeUpdateHandler,
      onPauseHandler,
      onPlayHandler,
    },
  };
};
