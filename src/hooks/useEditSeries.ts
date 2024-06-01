import React, { ChangeEvent, useState } from "react";
import { EditSeriesDto, seriesService } from "@/services/series.service";
import { ISeries } from "@/components/series/Series.types";
import { toast } from "react-hot-toast";

export const useEditSeries = (seriesDetails: ISeries) => {
  const [seriesData, setSeriesData] = useState<EditSeriesDto>({
    title: seriesDetails.title,
    description: seriesDetails.description,
    releaseYear: seriesDetails.releaseYear.toString(),
    poster: seriesDetails.poster,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [isChangesSaving, setIsChangesSaving] = useState(false);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof seriesData,
  ) => {
    setSeriesData({ ...seriesData, [field]: e.target.value });
  };

  const saveChangesHandler = async () => {
    try {
      setIsChangesSaving(true);
      const updatedSeries = await seriesService.editSeries(
        seriesData,
        seriesDetails.id,
      );
      setSeriesData(updatedSeries);
      toast.success("Изменения сохранены");
    } catch (e) {
      console.error(e);
      toast("Ошибка при сохранении изменения");
    } finally {
      setIsChangesSaving(false);
    }
  };

  return {
    data: {
      seriesData,
      posterPreviewSrc,
      isChangesSaving,
    },
    actions: {
      onChangePicture,
      changeSeriesDataHandler,
      saveChangesHandler,
    },
  };
};
