import React, { FC, PropsWithChildren } from "react";
import styles from "./DetailsPage.module.scss";

const DetailsPage: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default DetailsPage;
