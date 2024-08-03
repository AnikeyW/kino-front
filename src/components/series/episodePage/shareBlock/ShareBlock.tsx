"use client";
import React, { FC } from "react";
import Image from "next/image";
import styles from "./ShareBlock.module.scss";
import { IEpisode, ISeries } from "@/components/series/Series.types";
import { useUrlChange } from "@/hooks/useUrlChange";

interface ISocialIcons {
  iconPath: string;
  socialType: SocialType;
  imageAlt: string;
}

enum SocialType {
  FB = "FB",
  TG = "TG",
  VK = "VK",
  X = "X",
}

interface Props {
  episode: IEpisode;
  seasonOrder: number;
  seriesInfo: ISeries;
  allEpisodes: IEpisode[];
}

const ShareBlock: FC<Props> = ({
  episode,
  allEpisodes,
  seriesInfo,
  seasonOrder,
}) => {
  const { episodeInfo, seasonInfo } = useUrlChange({
    allEpisodes,
    seriesInfo,
    defaultEpisodeInfo: episode,
  });

  const socialIcons: ISocialIcons[] = [
    {
      iconPath: "/icons/tg.png",
      socialType: SocialType.TG,
      imageAlt: "tg-icon",
    },
    {
      iconPath: "/icons/vk.png",
      socialType: SocialType.VK,
      imageAlt: "vk-icon",
    },
    {
      iconPath: "/icons/x.png",
      socialType: SocialType.X,
      imageAlt: "x-icon",
    },
    {
      iconPath: "/icons/fb.png",
      socialType: SocialType.FB,
      imageAlt: "fb-icon",
    },
  ];

  const handleShare = (social: SocialType) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `${seriesInfo.title} Сезон ${seasonInfo?.order || seasonOrder} Серия ${episodeInfo?.order || " "} смотреть онлайн`,
    );

    const shareUrlBySocialType: Record<SocialType, string> = {
      [SocialType.FB]: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      [SocialType.TG]: `https://t.me/share/url?url=${url}&text=${text}`,
      [SocialType.VK]: `https://vk.com/share.php?url=${url}&title=${text}`,
      [SocialType.X]: `https://x.com/intent/tweet?url=${url}&text=${text}`,
    };

    window.open(
      shareUrlBySocialType[social],
      "_blank",
      "noopener,noreferrer,width=600,height=400",
    );
  };

  return (
    <div className={styles.root}>
      {socialIcons.map((socialIcon) => (
        <div className={styles.shareItem} key={socialIcon.iconPath}>
          <Image
            src={socialIcon.iconPath}
            alt={socialIcon.imageAlt}
            fill={true}
            sizes={"30px"}
            onClick={() => handleShare(socialIcon.socialType)}
          />
        </div>
      ))}
    </div>
  );
};

export default ShareBlock;
