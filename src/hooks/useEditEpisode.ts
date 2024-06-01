import React, { ChangeEvent, useState } from "react";
import { EditEpisodeDto, seriesService } from "@/services/series.service";
import { IEpisode } from "@/components/series/Series.types";
import { toast } from "react-hot-toast";

export const useEditEpisode = (episodeDetails: IEpisode) => {
  const [episodeData, setEpisodeData] = useState<EditEpisodeDto>({
    title: episodeDetails.title,
    description: episodeDetails.description,
    order: episodeDetails.order.toString(),
    poster: episodeDetails.poster,
    newSubtitles: [],
    existSubtitles: episodeDetails.subtitles,
    releaseDate: episodeDetails.releaseDate.split("T")[0],
    skipCredits: episodeDetails.skipCredits,
    skipIntro: episodeDetails.skipIntro,
    skipRepeat: episodeDetails.skipRepeat,
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof episodeData,
  ) => {
    setEpisodeData({ ...episodeData, [field]: e.target.value });
  };

  const onChangePoster = (thumbnailSrc: string) => {
    setEpisodeData({ ...episodeData, poster: thumbnailSrc });
  };

  const changeNewSubtitlesHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setEpisodeData({
        ...episodeData,
        newSubtitles: [...Array.from(e.target.files)],
      });
    }
  };

  const removeExistSubtitlesHandler = (subId: number) => {
    const subs = episodeData.existSubtitles.filter((s) => s.id !== subId);
    setEpisodeData({
      ...episodeData,
      existSubtitles: subs,
    });
  };

  const saveChangesHandler = async () => {
    try {
      setIsLoading(true);
      const updatedEpisode = await seriesService.editEpisode(
        {
          title: episodeData.title,
          description: episodeData.description,
          order: episodeData.order,
          releaseDate: episodeData.releaseDate,
          poster: episodeData.poster,
          skipCredits: !episodeData.skipCredits
            ? null
            : Number(episodeData.skipCredits),
          skipIntro: !episodeData.skipIntro
            ? null
            : Number(episodeData.skipIntro),
          skipRepeat: !episodeData.skipRepeat
            ? null
            : Number(episodeData.skipRepeat),
          existSubtitles: episodeData.existSubtitles,
          newSubtitles: episodeData.newSubtitles,
        },
        episodeDetails.id,
      );
      setEpisodeData({
        title: updatedEpisode.title,
        description: updatedEpisode.description,
        order: updatedEpisode.order.toString(),
        releaseDate: updatedEpisode.releaseDate.split("T")[0],
        poster: updatedEpisode.poster,
        skipCredits: updatedEpisode.skipCredits,
        skipIntro: updatedEpisode.skipIntro,
        skipRepeat: updatedEpisode.skipRepeat,
        existSubtitles: updatedEpisode.subtitles,
        newSubtitles: [],
      });
      toast.success("Изменения сохранены");
    } catch (e) {
      toast.error("Ошибка изменения эпизода");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      episodeData,
      isLoading,
    },
    actions: {
      changeEpisodeDataHandler,
      onChangePoster,
      changeNewSubtitlesHandler,
      removeExistSubtitlesHandler,
      saveChangesHandler,
    },
  };
};
