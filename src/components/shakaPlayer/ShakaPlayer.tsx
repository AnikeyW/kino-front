// "use client";
// import React, { FC, useEffect, useRef } from "react";
// import shaka from "shaka-player/dist/shaka-player.ui";
// import "shaka-player/dist/controls.css";
//
// interface Props {
//   src: string;
// }
//
// const ShakaPlayer: FC<Props> = ({ src }) => {
//   const videoContainerElement = useRef(null);
//   const videoElement = useRef(null);
//
//   function initApp() {
//     shaka.polyfill.installAll();
//
//     if (shaka.Player.isBrowserSupported()) {
//       initPlayer();
//     } else {
//       console.error("Browser not supported!");
//     }
//   }
//
//   const config = {
//     controlPanelElements: [
//       "play_pause",
//       "time_and_duration",
//       "rewind",
//       "skip",
//       "fast_forward",
//       "spacer",
//       "mute",
//       "volume",
//       "quality",
//       "fullscreen",
//     ],
//     seekBarColors: {
//       base: "rgba(255,0,0,0.3)",
//       buffered: "rgba(0,145,255,0.54)",
//       played: "rgb(255,218,0)",
//     },
//   };
//
//   async function initPlayer() {
//     const localPlayer = new shaka.Player();
//     await localPlayer.attach(videoElement.current);
//
//     const ui = new shaka.ui.Overlay(
//       localPlayer,
//       videoContainerElement.current,
//       videoElement.current,
//     );
//
//     const controls = ui.getControls();
//
//     const player = controls.getPlayer();
//
//     ui.configure(config);
//
//     player.addEventListener("error", onErrorEvent);
//
//     try {
//       await player.load(src);
//       // This runs if the asynchronous load is successful.
//       console.log("The video has now been loaded!");
//     } catch (e) {
//       onError(e);
//     }
//   }
//
//   function onErrorEvent(event: any) {
//     onError(event.detail);
//   }
//
//   function onError(error: any) {
//     console.error("Error code", error.code, "object", error);
//   }
//
//   useEffect(() => {
//     initApp();
//   }, [src]);
//
//   return (
//     <div
//       // data-shaka-player-container
//       style={{ maxWidth: "40em" }}
//       ref={videoContainerElement}
//     >
//       <video
//         // data-shaka-player
//         style={{ width: "100%", height: "100%" }}
//         ref={videoElement}
//       ></video>
//     </div>
//   );
// };
//
// export default ShakaPlayer;
