import React, { FC, PropsWithChildren } from "react";
import styles from "./TitleH2.module.scss";

const TitleH2: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={styles.root}>{children}</h2>;
};

export default TitleH2;
