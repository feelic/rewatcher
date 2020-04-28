import React from "react";
export default function Episodes(props) {
  const { seasons } = props;

  return (
    <div>
      {seasons.map(season => {
        return (
          <div key={season.Season} className="season">
            <h2>Season {season.Season}</h2>
            <ul>
              {season.Episodes.map(episode => {
                return (
                  <li key={episode.imdbID} className="episode">
                    S{padNum(episode.Season)}E{padNum(episode.Episode)} -{" "}
                    {episode.Title} ({episode.imdbRating}){" "}
                    <i className="episodeDate">{episode.Released}</i>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function padNum(n) {
  return (n.length < 2 && `0${n}`) || n;
}
