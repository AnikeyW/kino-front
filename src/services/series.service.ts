import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";

export const seriesService = {
  async getSeries(): Promise<ISeries[]> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + "series?skip=0&take=20",
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeriesBySlug(slug: string): Promise<ISeries | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `series/bySlug/${slug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getSeasonByOrder(
    seasonOrder: number,
    seriesSlug: string,
  ): Promise<ISeason | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `season/${seasonOrder}?series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getEpisodeByOrder(
    episodeOrder: number,
    seasonOrder: number,
    seriesSlug: string,
  ): Promise<IEpisode | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `episode/byOrder/${episodeOrder}?season_order=${seasonOrder}&series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getAllEpisodesBySeriesSlug(
    seriesSlug: string,
  ): Promise<IEpisode[] | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `episode/getAll/?series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },
};
