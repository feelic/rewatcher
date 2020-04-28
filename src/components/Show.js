import React, { useState } from "react";
import "./Show.css";
import Stats from "./Stats";
import Episodes from "./Episodes";
import Watchlist from "./Watchlist";

import { getGlobalAverageEpisodeScore } from "../stats";

export default function Show(props) {
  const { show, seasons, close } = props;
  const [openPanel, setOpenPanel] = useState("stats");
  const globalAverage = getGlobalAverageEpisodeScore(seasons);

  return (
    <div className="showView">
      <div className="header">
        <div>
          <h1>{show.Title}</h1>
          <p>{show.Runtime} - {show.Genre} - {show.Type} {show.Year}</p>
          <p>{show.Actors}...</p>
          <p>Average episode score: <b>{globalAverage.toString()}</b></p>
          <p>Written by: <b>{show.Writer}</b></p>
          <p className="showPlot">{show.Plot}</p>
        </div>
        <img className="poster" src={show.Poster} alt={show.Title} />
        <button className="closeButton" onClick={close}>
          X
        </button>
      </div>
      <div className="tabButtons">
        {["stats", "episodes", "watchlist"].map(tab => {
          return (
            <button
              key={tab}
              className={(openPanel === tab && "active") || ""}
              onClick={() => setOpenPanel(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
      {openPanel === "stats" && <Stats seasons={seasons} />}
      {openPanel === "watchlist" && <Watchlist seasons={seasons} />}
      {openPanel === "episodes" && (
        <div className="showDetails">
          <h1>All episodes</h1>
          <Episodes seasons={seasons} />
        </div>
      )}
    </div>
  );
}
