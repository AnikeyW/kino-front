import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { CreateSeasonDto, seriesService } from "@/services/series.service";
import { ISeasonWithoutEpisodes } from "@/components/series/Series.types";
import { toast } from "react-hot-toast";

export const useAddSeason = (
  seasons: ISeasonWithoutEpisodes[],
  seriesId: number,
  closeModal: () => void,
) => {
  const router = useRouter();
  const [seasonData, setSeasonData] = useState<CreateSeasonDto>({
    title: `Сезон ${seasons.length + 1}`,
    description: "",
    order: seasons.length + 1,
    poster: null,
    seriesId: seriesId,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
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
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof seasonData,
  ) => {
    setSeasonData({ ...seasonData, [field]: e.target.value });
  };

  const addSeasonHandler = async () => {
    try {
      if (!seasonData.poster) {
        setError("Добавь постер");
        return;
      }
      setIsLoading(true);
      const response = await seriesService.addSeason(seasonData);
      setSeasonData({
        title: "",
        description: "",
        order: seasons.length + 1,
        poster: null,
        seriesId: seriesId,
      });
      setPosterPreviewSrc("");
      router.refresh();
      closeModal();
      toast.success("Сезон успешно добавлен");
    } catch (e) {
      console.log(e);
      toast.error("Ошибка при добавлении сезона");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      seasonData,
      posterPreviewSrc,
      error,
      isLoading,
    },
    actions: {
      onChangePicture,
      changeSeasonDataHandler,
      addSeasonHandler,
    },
  };
};
