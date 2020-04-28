const API_KEY = process.env.REACT_APP_API_KEY;

export function searchShowByTitle(searchTerm) {
  return fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&type=series&apikey=${API_KEY}`
  ).then(response => response.json());
}
export function getShowDetails(showId) {
  return fetch(
    `http://www.omdbapi.com/?i=${showId}&apikey=${API_KEY}`
  ).then(response => response.json());
}
export function getShowEpisodes(show) {
  const calls = new Array(Number(show.totalSeasons))
    .fill(1)
    .map((season, idx) => {
      return fetch(
        `http://www.omdbapi.com/?i=${show.imdbID}&season=${idx +
          1}&apikey=${API_KEY}`
      )
        .then(response => response.json())
        .then(seasonResult => {
          return {
            ...seasonResult,
            Episodes: seasonResult.Episodes.map(episode => {
              return { ...episode, Season: seasonResult.Season };
            })
          };
        });
    });
  return Promise.all(calls);
}
