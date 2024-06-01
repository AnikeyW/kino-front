import React, { ChangeEvent, useState } from "react";
import { EditSeasonDto, seriesService } from "@/services/series.service";
import { ISeason } from "@/components/series/Series.types";
import { toast } from "react-hot-toast";

export const useEditSeason = (seasonDetails: ISeason) => {
  const [seasonData, setSeasonData] = useState<EditSeasonDto>({
    title: seasonDetails.title,
    description: seasonDetails.description,
    order: seasonDetails.order.toString(),
    poster: seasonDetails.poster,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSeasonData({ ...seasonData, poster: e.target.files[0] });
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === "string") {
          setPosterPreviewSrc(img.result);
        }
      };
      img.readAsDataURL(e.target.files[0]);
    }
  };

  const changeSeasonDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof seasonData,
  ) => {
    setSeasonData({ ...seasonData, [field]: e.target.value });
  };

  const saveChangesHandler = async () => {
    try {
      setIsLoading(true);
      const updatedSeason = await seriesService.editSeason(
        seasonData,
        seasonDetails.id,
      );
      setSeasonData(updatedSeason);
      toast.success("Изменения сохранены");
    } catch (e) {
      toast.error("Ошибка редактирования сезона");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      seasonData,
      posterPreviewSrc,
      isLoading,
    },
    actions: {
      onChangePicture,
      changeSeasonDataHandler,
      saveChangesHandler,
    },
  };
};
