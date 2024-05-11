import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import $api from "@/http";

export interface CreateSeriesDto {
  title: string;
  description: string;
  releaseYear: string;
  poster: File;
}

export interface EditSeriesDto {
  title: string;
  description: string;
  releaseYear: string;
  poster: File | string;
}

export interface CreateSeasonDto {
  title: string;
  description: string;
  seriesId: number;
  order: number;
  poster: File | null;
}

export interface EditSeasonDto {
  title: string;
  description: string;
  order: string;
  poster: File | string;
}

export interface CreateEpisodeDto {
  title: string;
  description: string;
  order: number;
  skipRepeat?: number | null;
  skipIntro?: number | null;
  skipCredits?: number | null;
  seasonId: number;
  releaseDate: number;
  poster: File | null;
  video: File | null;
}

export const seriesService = {
  async addEpisode(data: CreateEpisodeDto) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("order", data.order.toString());
      formData.append("seasonId", data.seasonId.toString());
      formData.append("releaseDate", data.releaseDate.toString());
      formData.append("poster", data.poster!);
      formData.append("video", data.video!);
      if (data.skipCredits) {
        formData.append("skipCredits", data.skipCredits.toString());
      }
      if (data.skipRepeat) {
        formData.append("skipRepeat", data.skipRepeat.toString());
      }
      if (data.skipIntro) {
        formData.append("skipIntro", data.skipIntro.toString());
      }

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "episode",
        formData,
      );
    } catch (e) {
      console.log(e);
    }
  },

  async addSeason(data: CreateSeasonDto) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("seriesId", data.seriesId.toString());
      formData.append("order", data.order.toString());
      formData.append("poster", data.poster!);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "season",
        formData,
      );
    } catch (e) {
      console.log(e);
    }
  },

  async addSeries(data: CreateSeriesDto) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("releaseYear", data.releaseYear);
      formData.append("poster", data.poster);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "series",
        formData,
      );
    } catch (e) {
      console.log(e);
    }
  },

  async editSeries(data: EditSeriesDto, seriesId: number) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("releaseYear", data.releaseYear);
      formData.append("poster", data.poster);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `series/${seriesId}`,
        formData,
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async editSeason(data: EditSeasonDto, seasonId: number) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("order", data.order);
      formData.append("poster", data.poster);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `season/${seasonId}`,
        formData,
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async getSeries(): Promise<ISeries[]> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + "series?skip=0&take=20",
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeriesById(seriesId: number): Promise<ISeries> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `series/${seriesId}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeasonByOrder(
    seasonOrder: number,
    seriesId: number,
  ): Promise<ISeason> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `season/${seasonOrder}?series_id=${seriesId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeasonById(seasonId: number, seriesId: number): Promise<ISeason> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `season/byId/${seasonId}?series_id=${seriesId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getEpisodeByOrder(
    episodeOrder: number,
    seasonOrder: number,
    seriesId: number,
  ): Promise<IEpisode> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `episode/${episodeOrder}?season_order=${seasonOrder}&series_id=${seriesId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getEpisodeById(episodeId: number): Promise<IEpisode> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `episode/byId/${episodeId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },
};
