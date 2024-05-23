import React, { FC, ReactNode } from "react";
import styles from "./MyButton.module.scss";
import cl from "classnames";

export enum VariantsBtn {
  DEFAULT = "default",
  ACTION = "action",
}

interface Props {
  children: ReactNode;
  onClick?: (args: any) => void;
  variant?: VariantsBtn;
}

const MyButton: FC<Props> = ({
  children,
  onClick,
  variant = VariantsBtn.DEFAULT,
}) => {
  return (
    <button
      className={cl(styles.root, {
        [styles.action]: variant === VariantsBtn.ACTION,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
