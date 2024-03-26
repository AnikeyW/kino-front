import { FC, ReactNode } from "react";
import styles from "./SettingsMenuItem.module.scss";

interface Props {
  icon: ReactNode;
  iconShow: boolean;
  itemName: string;
  itemValue?: string;
  onClick: () => void;
}

const SettingsMenuItem: FC<Props> = ({
  icon,
  iconShow,
  itemName,
  itemValue,
  onClick,
}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.root__itemTitle}>
        <div className={styles.root__itemTitle__icon}>{iconShow && icon}</div>
        <div className={styles.root__itemTitle__name}>{itemName}</div>
      </div>
      <div className={styles.root__itemValue}>{itemValue && itemValue}</div>
    </div>
  );
};

export default SettingsMenuItem;
