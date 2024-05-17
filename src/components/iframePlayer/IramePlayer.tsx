import React, { FC } from "react";
import styles from "./IframePlayer.module.scss";

interface Props {
  src: string;
}

const IframePlayer: FC<Props> = ({ src }) => {
  return (
    <div className={styles.root}>
      <iframe src={src} width="100%" height="100%" allowFullScreen></iframe>
    </div>
  );
};

export default IframePlayer;
