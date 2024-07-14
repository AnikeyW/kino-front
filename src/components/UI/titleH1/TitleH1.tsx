import React, { FC } from "react";
import styles from "./TitleH1.module.scss";

interface Props {
  text: string;
}

const TitleH1: FC<Props> = ({ text }) => {
  return <h1 className={styles.root}>{text}</h1>;
};

export default TitleH1;
