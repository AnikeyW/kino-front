import React from "react";
import styles from "./page.module.scss";
import LoadingPage from "@/components/UI/loadingPage/LoadingPage";

const Loading = () => {
  return (
    <div className={styles.root}>
      <LoadingPage />
    </div>
  );
};

export default Loading;
