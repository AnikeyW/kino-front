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
    <MyLink href={href}>
      <div className={styles.root}>
        <div className={styles.poster}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + imageSrc}
            alt={"series_poster"}
            width={150}
            height={220}
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
  );
};

export default CardItem;
