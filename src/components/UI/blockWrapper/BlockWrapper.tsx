import React, { FC, PropsWithChildren } from "react";
import styles from "./BlockWrapper.module.scss";

const BlockWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default BlockWrapper;
