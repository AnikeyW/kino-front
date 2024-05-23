import React, { ChangeEvent, useState } from "react";
import { CreateEpisodeDto } from "@/services/series.service";
import { useRouter } from "next/navigation";
import { IEpisode } from "@/components/series/Series.types";
import $api from "@/http";
import { AxiosError, AxiosProgressEvent } from "axios";

export const useAddEpisode = (episodes: IEpisode[], seasonId: number) => {
  const router = useRouter();
  const [episodeData, setEpisodeData] = useState<CreateEpisodeDto>({
    title: `Эпизод ${episodes.length + 1}`,
    description: "",
    order: episodes.length + 1,
    seasonId: seasonId,
    releaseDate: "01.01.2011",
    video: null,
    skipIntro: null,
    skipCredits: null,
    skipRepeat: null,
    subtitles: [],
  });
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    isUploading: false,
    percent: 0,
  });

  const changeSubtitlesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setEpisodeData({
        ...episodeData,
        subtitles: [...Array.from(e.target.files)],
      });
    }
  };

  const onChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setEpisodeData({ ...episodeData, video: e.target.files[0] });
    }
  };

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof episodeData,
  ) => {
    setEpisodeData({ ...episodeData, [field]: e.target.value });
  };

  const addEpisodeHandler = async () => {
    if (!episodeData.video) {
      setError("Добавь видео");
      return;
    }

    const formData = new FormData();

    formData.append("title", episodeData.title);
    formData.append("description", episodeData.description);
    formData.append("order", episodeData.order.toString());
    formData.append("seasonId", episodeData.seasonId.toString());
    formData.append("releaseDate", episodeData.releaseDate.toString());
    formData.append("video", episodeData.video!);
    episodeData.subtitles.forEach((sub) => {
      formData.append("subtitles", sub);
    });
    if (episodeData.skipCredits) {
      formData.append("skipCredits", episodeData.skipCredits.toString());
    }
    if (episodeData.skipRepeat) {
      formData.append("skipRepeat", episodeData.skipRepeat.toString());
    }
    if (episodeData.skipIntro) {
      formData.append("skipIntro", episodeData.skipIntro.toString());
    }

    setUploadProgress((prev) => ({ ...prev, isUploading: true }));
    setError("");

    $api
      .post(process.env.NEXT_PUBLIC_SERVER_URL_API + "episode", formData, {
        onUploadProgress: (e: AxiosProgressEvent) => {
          const total = e.total || 1;
          const percentCompleted = Math.round((e.loaded * 100) / total);
          setUploadProgress((prev) => ({ ...prev, percent: percentCompleted }));
        },
      })
      .then(() => {
        console.log("ok");
        setEpisodeData({
          title: `Эпизод ${episodes.length + 1}`,
          description: "",
          order: episodes.length + 1,
          seasonId: seasonId,
          video: null,
          releaseDate: "01.01.2011",
          skipRepeat: null,
          skipCredits: null,
          skipIntro: null,
          subtitles: [],
        });
        router.refresh();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setError(err.message);
        }
        console.error(err);
      })
      .finally(() => {
        setUploadProgress((prev) => ({ ...prev, isUploading: false }));
      });
  };

  return {
    actions: {
      addEpisodeHandler,
      changeEpisodeDataHandler,
      onChangeVideo,
      changeSubtitlesHandler,
    },
    data: {
      error,
      uploadProgress,
      episodeData,
    },
  };
};
