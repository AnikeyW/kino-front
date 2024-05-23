export interface ISeries {
  id: number;
  title: string;
  poster: string;
  releaseYear: number;
  description: string;
  seasons: ISeasonWithoutEpisodes[];
}

export type ISeriesWithoutSeasons = Omit<ISeries, "seasons">;

export interface ISeason {
  id: number;
  title: string;
  description: string;
  order: number;
  poster: string;
  seriesId: number;
  episodes: IEpisode[];
}

export type ISeasonWithoutEpisodes = Omit<ISeason, "episodes">;

export interface ISubtitle {
  id: number;
  src: string;
  episodeId: number;
}

export interface IEpisode {
  id: number;
  title: string;
  description: string;
  order: number;
  skipRepeat: number | null;
  skipIntro: number | null;
  skipCredits: number | null;
  seasonId: number;
  views: number;
  duration: number;
  poster: string;
  thumbnails: string[];
  isProcessing: boolean;
  srcHls: string;
  srcDash: string;
  releaseDate: string;
  subtitles: ISubtitle[];
}
