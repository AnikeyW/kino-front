import React, { FC } from "react";
import styles from "./CardItem.module.scss";
import Image from "next/image";
import MyLink from "@/components/UI/myLink/MyLink";

interface Props {
  href: string;
  imageSrc: string;
  title: string;
  releaseDate?: number;
}

const CardItem: FC<Props> = ({ href, title, imageSrc, releaseDate }) => {
  return (
    <li>
      <MyLink href={href}>
        <div className={styles.root}>
          <div className={styles.poster}>
            <Image
              src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + imageSrc}
              alt={"series_poster"}
              fill={true}
            />
          </div>
          <div className={styles.title}>{title}</div>
          {releaseDate && (
            <div className={styles.date}>
              <small>Дата выхода:</small>
              {releaseDate}
            </div>
          )}
        </div>
      </MyLink>
    </li>
  );
};

export default CardItem;
