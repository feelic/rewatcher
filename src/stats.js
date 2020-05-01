export function getGlobalAverageEpisodeScore(seasons) {
  const episodes = getAllEpisodes(seasons);

  return getAverageEpisodeScore(episodes);
}

export function getAverageEpisodeScoreBySeason(seasons) {
  return seasons.map(season => {
    return {
      average: getAverageEpisodeScore(season.Episodes),
      season: season.Season
    };
  });
}

export function getTopEpisodesByScore(seasons, top = 10) {
  const episodes = getAllEpisodes(seasons);
  const sortedEpisodes = episodes.sort((a, b) => {
    if (a.imdbRating > b.imdbRating) {
      return -1;
    }
    if (a.imdbRating < b.imdbRating) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  return sortedEpisodes.slice(0, top);
}

export function getAllEpisodes(seasons) {
  return seasons
    .map(season => {
      return season.Episodes;
    })
    .flat();
}

export function getAverageEpisodeScore(episodes) {
  const total = episodes.reduce((acc, episode) => {
    const score = Number(episode.imdbRating)

    if (isNaN(score)) {
      return acc;
    }
    return (acc += score);
  }, 0);

  return Math.round((total / episodes.length) * 100) / 100;
}

export function getWatchListByNumber(seasons, numberOfEpisodes) {
  const topEpisodes = getTopEpisodesByScore(seasons, numberOfEpisodes).map(
    episode => episode.imdbID
  );

  return seasons
    .map(season => {
      return {
        ...season,
        Episodes: season.Episodes.filter(episode =>
          topEpisodes.includes(episode.imdbID)
        )
      };
    })
    .filter(season => season.Episodes.length > 0);
}

export function getWatchListByThreshold(seasons, threshold) {
  return seasons
    .map(season => {
      return {
        ...season,
        Episodes: season.Episodes.filter(episode =>
          episode.imdbRating >= threshold
        )
      };
    })
    .filter(season => season.Episodes.length > 0);
}

export function getEstimatedRuntime (seasons, show) {
  const episodeRuntime = Number(show.Runtime.split(' ')[0]);

  if (isNaN(episodeRuntime)) {
    return 'n/a';
  }

  const totalRuntime = seasons.reduce((prev, curr)=> {
    return prev + (curr.Episodes.length * episodeRuntime)
  }, 0)

  return Math.round((totalRuntime / 60) * 10) / 10 + ' hours';
}
