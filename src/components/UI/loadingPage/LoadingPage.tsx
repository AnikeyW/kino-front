import React from "react";
import styles from "./LoadingPage.module.scss";
import Loader from "@/components/UI/loader/Loader";

const LoadingPage = () => {
  return (
    <div className={styles.root}>
      <Loader />
    </div>
  );
};

export default LoadingPage;
