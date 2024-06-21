import React, { FC } from "react";
import styles from "./DescriptionBlock.module.scss";
import { isJSON } from "@/utils";

interface Props {
  description: string; //JSON строка формата ['string', 'string'...]
}

const DescriptionBlock: FC<Props> = ({ description }) => {
  return (
    <>
      {isJSON(description) && (
        <div className={styles.description}>
          {JSON.parse(description).map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default DescriptionBlock;
