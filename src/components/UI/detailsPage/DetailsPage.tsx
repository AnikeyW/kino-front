import React, { FC, PropsWithChildren } from "react";
import styles from "./DetailsPage.module.scss";

const DetailsPage: FC<PropsWithChildren> = ({ children }) => {
  return <article className={styles.root}>{children}</article>;
};

export default DetailsPage;
