import {
  IEpisode,
  ISeries,
  QualityResolutionType,
} from "@/components/series/Series.types";

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  if (hours === 0 && minutes === 0) {
    return `0:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else if (hours === 0) {
    return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else {
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  }
};

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  return (
    parsedDate.getDate().toString().padStart(2, "0") +
    "." +
    (parsedDate.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    parsedDate.getFullYear()
  );
};

export const formatTimeHhMm = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}ч ${minutes}мин`;
  } else {
    return `${minutes}мин`;
  }
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getQualityName = (
  qualityResolution: QualityResolutionType,
): string => {
  const qualities = {
    240: "240p",
    320: "320p",
    480: "480p",
    720: "HD",
    1080: "FullHD",
    1440: "2K",
    2160: "4K",
    4320: "8K",
  };

  return qualities[qualityResolution];
};

export const subLabelFromSubSrc = (subSrc: string): string => {
  return (
    subSrc
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      ?.split(".")[0]
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Sub"
  );
};

export const createPlaylist = (seriesInfo: ISeries, episodes: IEpisode[]) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL_STATIC!.split("/api/static/")[0] + "/";

  const playlist: any = [];

  seriesInfo.seasons
    .sort((a, b) => a.order - b.order)
    .forEach((season) => {
      const playlistSeason: any = {
        title: `Сезон ${season.order}`,
        folder: [],
      };
      const seasonEpisodes = episodes.filter(
        (episode) => episode.seasonId === season.id,
      );

      seasonEpisodes
        .sort((a, b) => a.order - b.order)
        .forEach((episode) => {
          const playlistFile: Record<string, string | number> = {};

          playlistFile.id = episode.id;

          playlistFile.title = episode.title;

          const videoName = episode.srcHls.replace(/\\/g, "/").split("/")[1];
          playlistFile.file = `${baseUrl}{v1}/${videoName}/{v2}`;

          playlistFile.poster = `${process.env.NEXT_PUBLIC_SERVER_URL_STATIC}${episode.poster.replace(/\\/g, "/")}`;

          playlistFile.update_skipIntro = episode.skipIntro
            ? episode.skipIntro
            : 99999;

          playlistFile.update_skipIntroEnd = episode.skipIntroEnd
            ? episode.skipIntroEnd
            : 999999;

          playlistFile.update_skipRepeat = episode.skipRepeat
            ? episode.skipRepeat
            : 0;

          playlistFile.update_skipRepeatEnd = episode.skipRepeatEnd
            ? episode.skipRepeatEnd
            : 0;

          playlistFile.update_skipCredits = episode.skipCredits
            ? episode.skipCredits
            : 99999;

          if (episode.subtitles.length > 0) {
            let subtitlesSrc = "";

            episode.subtitles.forEach((sub, index) => {
              const subLabel = subLabelFromSubSrc(sub.src);
              if (index === episode.subtitles.length - 1) {
                subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src.replace(/\\/g, "/")}`;
              } else {
                subtitlesSrc += `[${subLabel}]${process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.subtitles[index].src.replace(/\\/g, "/")},`;
              }
            });

            playlistFile.subtitle = subtitlesSrc;
          }

          if (episode.defaultSubtitle) {
            playlistFile.default_subtitle = subLabelFromSubSrc(
              episode.defaultSubtitle,
            );
          }

          playlistSeason.folder.push(playlistFile);
        });

      playlist.push(playlistSeason);
    });

  return playlist;
};
