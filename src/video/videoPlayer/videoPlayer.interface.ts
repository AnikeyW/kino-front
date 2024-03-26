export interface IVideoElement extends HTMLVideoElement {
  msRequestFullScreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
}

export type PlayBackSpeedType = 2 | 1.75 | 1.5 | 1.25 | 1 | 0.75 | 0.5 | 0.25;
