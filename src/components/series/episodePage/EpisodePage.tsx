import React, { FC } from "react";
import styles from "./EpisodePage.module.scss";
import { IEpisode, ISeason, ISeries } from "@/components/series/Series.types";
import IframePlayer from "@/components/iframePlayer/IramePlayer";
import EpisodePageTitle from "@/components/series/episodePage/episodePageTitle/EpisodePageTitle";
import EpisodeTitle from "@/components/series/episodePage/episodeTitle/EpisodeTitle";
import ReleaseDate from "@/components/series/episodePage/releaseDate/ReleaseDate";
import EpisodeDescription from "@/components/series/episodePage/episodeDescription/EpisodeDescription";
import SeasonEpisodes from "@/components/series/episodePage/seasonEpisodes/SeasonEpisodes";
import ShareBlock from "@/components/series/episodePage/shareBlock/ShareBlock";

interface Props {
  episode: IEpisode;
  seriesInfo: ISeries;
  allEpisodes: IEpisode[];
  seasonInfo: ISeason;
}

const EpisodePage: FC<Props> = ({
  episode,
  seriesInfo,
  allEpisodes,
  seasonInfo,
}) => {
  return (
    <article className={styles.root}>
      <div className={styles.episodeInfo}>
        <div className={styles.pageTitle}>
          <EpisodePageTitle
            episode={episode}
            seasonOrder={seasonInfo.order}
            seriesInfo={seriesInfo}
            allEpisodes={allEpisodes}
          />
        </div>

        <IframePlayer
          episode={episode}
          seriesSlug={seriesInfo.slug}
          allEpisodes={allEpisodes}
          seriesInfo={seriesInfo}
        />

        <div className={styles.socialShareAndReleaseDate}>
          <ShareBlock
            episode={episode}
            allEpisodes={allEpisodes}
            seriesInfo={seriesInfo}
            seasonOrder={seasonInfo.order}
          />
          <ReleaseDate
            episode={episode}
            allEpisodes={allEpisodes}
            seriesInfo={seriesInfo}
          />
        </div>

        <div className={styles.episodeTitle}>
          <EpisodeTitle
            episode={episode}
            allEpisodes={allEpisodes}
            seriesInfo={seriesInfo}
          />
        </div>

        <EpisodeDescription
          episode={episode}
          allEpisodes={allEpisodes}
          seriesInfo={seriesInfo}
        />
      </div>

      <SeasonEpisodes
        episode={episode}
        season={seasonInfo}
        seriesInfo={seriesInfo}
        allEpisodes={allEpisodes}
      />
    </article>
  );
};

export default EpisodePage;
