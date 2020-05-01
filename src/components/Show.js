import React, { useState } from "react";
import "./Show.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faHatWizard,
  faList,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";
import Stats from "./Stats";
import Episodes from "./Episodes";
import Watchlist from "./Watchlist";

import { getGlobalAverageEpisodeScore } from "../stats";

export default function Show(props) {
  const { show, seasons, close } = props;
  const [openPanel, setOpenPanel] = useState("Stats");
  const globalAverage = getGlobalAverageEpisodeScore(seasons);

  return (
    <div className="showView">
      <div className="header">
        <div>
          <div className="titleBar">
            <button className="closeButton" onClick={close}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <h1>{show.Title}</h1>
          </div>
          <p>
            {show.Runtime} - {show.Genre} - {show.Type} {show.Year}
          </p>
          <p>{show.Actors}...</p>
          <p>
            Average episode score: <b>{globalAverage.toString()}</b>
          </p>
          <p>
            Created by: <b>{show.Writer}</b>
          </p>
          <p className="showPlot">{show.Plot}</p>
        </div>
        <img className="poster" src={show.Poster} alt={show.Title} />
      </div>
      <div className="tabButtons">
        {[
          { id: "Stats", icon: faChartBar },
          { id: "Episodes", icon: faList },
          { id: "Watchlist", icon: faHatWizard }
        ].map(tab => {
          return (
            <button
              key={tab.id}
              className={(openPanel === tab.id && "active") || ""}
              onClick={() => setOpenPanel(tab.id)}
            >
              <FontAwesomeIcon icon={tab.icon} /> {tab.id}
            </button>
          );
        })}
      </div>
      {openPanel === "Stats" && <Stats seasons={seasons} />}
      {openPanel === "Watchlist" && <Watchlist show={show} seasons={seasons} />}
      {openPanel === "Episodes" && (
        <div className="showDetails">
          <h1>All episodes</h1>
          <Episodes seasons={seasons} />
        </div>
      )}
    </div>
  );
}
