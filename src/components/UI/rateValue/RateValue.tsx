import React, { FC } from "react";
import styles from "./RateValue.module.scss";
import classNames from "classnames";
const cx = classNames.bind(styles);

interface Props {
  value: number;
}

const RateValue: FC<Props> = ({ value }) => {
  return (
    <div
      className={cx(styles.value, {
        [styles.valueBest]: value > 7.5,
        [styles.valueGood]: value >= 6.5 && value <= 7.5,
        [styles.valueBad]: value < 6.5,
      })}
    >
      {value.toFixed(1)}
    </div>
  );
};

export default RateValue;
