import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import {
  CreateSeasonDto,
  CreateSeriesDto,
  seriesService,
} from "@/services/series.service";
import { toast } from "react-hot-toast";

export const useAddSeries = (closeModal: () => void) => {
  const router = useRouter();
  const [seriesData, setSeriesData] = useState<CreateSeriesDto>({
    title: ``,
    description: "",
    releaseYear: 2011,
    poster: null,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setSeriesData({ ...seriesData, poster: e.target.files[0] });
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

  const changeSeriesDataHandler = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof seriesData,
  ) => {
    setSeriesData({ ...seriesData, [field]: e.target.value });
  };

  const addSeriesHandler = async () => {
    try {
      if (!seriesData.poster) {
        setError("Добавь постер");
        return;
      }
      setIsLoading(true);
      const response = await seriesService.addSeries(seriesData);
      setSeriesData({
        title: "",
        description: "",
        poster: null,
        releaseYear: 2011,
      });
      setPosterPreviewSrc("");
      router.refresh();
      closeModal();
      toast.success("Сериал успешно добавлен");
    } catch (e) {
      console.log(e);
      toast.error("Ошибка при добавлении сериала");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      seriesData,
      posterPreviewSrc,
      error,
      isLoading,
    },
    actions: {
      onChangePicture,
      changeSeriesDataHandler,
      addSeriesHandler,
    },
  };
};
