"use client";
import { FC, ReactNode, useLayoutEffect, useRef } from "react";
import styles from "./Popup.module.scss";

interface Props {
  children: ReactNode;
  isOpenPopup: boolean;
  onClose?: () => void;
}

const Popup: FC<Props> = ({ isOpenPopup, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpenPopup && !ref.current?.open) {
      ref.current?.show();
    } else {
      ref.current?.close();
    }
  }, [isOpenPopup]);

  return (
    <>
      {isOpenPopup && (
        <dialog className={styles.root} ref={ref}>
          {children}
        </dialog>
      )}
    </>
  );
};

export default Popup;
