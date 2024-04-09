"use client";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  IQuality,
  IVideo,
  PlayBackSpeedType,
} from "@/video/videoPlayer/videoPlayer.interface";

export const usePlayer = (video: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerControlsShowRef = useRef<NodeJS.Timeout | null>(null);
  const throttleCurrentTimeRef = useRef<boolean>(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [playBackSpeed, setPlayBackSpeed] = useState<PlayBackSpeedType>(1);
  const [quality, setQuality] = useState<IQuality>(
    video.qualities.find((q) => q.res === video.defaultRes)!,
  );
  const [isControlsShow, setIsControlsShow] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowright":
          skipTimeLine(10);
          break;
        case "arrowleft":
          skipTimeLine(-10);
          break;
        case "f":
          fullScreenHandler();
          break;
        case " ":
          togglePlayingVideo();
          break;
        case "m":
          toggleMute();
          break;
        default:
          return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timerControlsShowRef.current!);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullScreenChangeListener);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        fullScreenChangeListener,
      );
    };
  }, []);

  const handleMouseActivity = () => {
    setIsControlsShow(true);
    clearTimeout(timerControlsShowRef.current!);
    timerControlsShowRef.current = setTimeout(() => {
      document.documentElement.style.cursor = "none";
      setIsControlsShow(false);
    }, 5000);
  };

  const mouseMoveHandler = () => {
    if (document.documentElement.style.cursor === "none") {
      document.documentElement.style.cursor = "auto";
    }
    if (isFullScreen) {
      handleMouseActivity();
    }
  };

  const mouseEnterHandler = () => {
    setIsControlsShow(true);
  };

  const mouseLeaveHandler = () => {
    setIsControlsShow(false);
  };

  const changeCurrentTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = seconds;
  };

  const skipTimeLine = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime += seconds;
  };

  const onPauseHandler = () => {
    setIsPlaying(false);
  };

  const onPlayHandler = () => {
    setIsPlaying(true);
  };

  const onLoadedDataHandler = (e: SyntheticEvent<HTMLVideoElement>) => {
    setVideoDuration(e.currentTarget.duration);
  };

  const changeCurrentDurationThrottle = (time: number) => {
    if (throttleCurrentTimeRef.current) return;

    throttleCurrentTimeRef.current = true;

    setTimeout(() => {
      setCurrentDuration(time);

      throttleCurrentTimeRef.current = false;
    }, 1000);
  };

  const timeUpdateHandler = (e: SyntheticEvent<HTMLVideoElement>) => {
    if (isControlsShow) {
      changeCurrentDurationThrottle(e.currentTarget.currentTime);
    }
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
    video.currentTime = currentDuration;
    if (isPlaying) {
      video.play();
    }
  };

  const toggleCaptions = () => {
    if (!videoRef.current) return;
    //todo: допилить функционал с субтитрами
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
    } else {
      document.exitFullscreen();
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

    if (!video.paused) {
      video.pause();
    } else {
      video.play();
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
      isControlsShow,
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
      changeCurrentTime,
      mouseEnterHandler,
      mouseLeaveHandler,
      mouseMoveHandler,
    },
  };
};
