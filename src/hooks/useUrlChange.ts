"use client";
import { useEffect, useState } from "react";
import { EVENT_CHANGE_URL } from "@/constants";
import { usePathname } from "next/navigation";
import {
  IEpisode,
  ISeasonWithoutEpisodes,
  ISeries,
} from "@/components/series/Series.types";

export const useUrlChange = ({
  allEpisodes,
  seriesInfo,
  defaultEpisodeInfo,
}: {
  allEpisodes: IEpisode[];
  seriesInfo: ISeries;
  defaultEpisodeInfo: IEpisode;
}) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [info, setInfo] = useState<{
    episodeInfo: IEpisode;
    seasonInfo: ISeasonWithoutEpisodes | null;
  }>({ episodeInfo: defaultEpisodeInfo, seasonInfo: null });

  useEffect(() => {
    const match = currentPath.match(
      /\/series\/[^\/]+\/season\/(\d+)\/episode\/(\d+)/,
    );
    if (match) {
      const [_, seasonOrder, episodeOrder] = match;
      const season = seriesInfo.seasons.find(
        (season) => season.order === +seasonOrder,
      );
      const episodeInfo = allEpisodes.find(
        (episode) =>
          episode.order === +episodeOrder && episode.seasonId === season?.id,
      );
      setInfo({ seasonInfo: season!, episodeInfo: episodeInfo! });
    }
  }, [currentPath]);

  useEffect(() => {
    if (typeof window == "undefined") return;
    const handleUrlChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(EVENT_CHANGE_URL, handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener(EVENT_CHANGE_URL, handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return { ...info };
};
