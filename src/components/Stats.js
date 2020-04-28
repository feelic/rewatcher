import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./Stats.css";

import {
  getAverageEpisodeScoreBySeason,
  getTopEpisodesByScore
} from "../stats";
export default function Stats(props) {
  const { seasons } = props;

  const averageBySeason = getAverageEpisodeScoreBySeason(seasons);
  const topTenEpisodes = getTopEpisodesByScore(seasons);

  return (
    <div className="showDetails">
      <h1>Series statistics</h1>
      <div className="dashboard">
        <div className="widget">
          <h2>Average score by season</h2>
          <BarChart
            width={500}
            height={300}
            data={averageBySeason}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="season" />
            <YAxis domain={[0, 10]}/>
            <Tooltip />
            <Bar dataKey="average" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="widget">
          <h2>Top 10 episodes</h2>
          <ol>
            {topTenEpisodes.map(episode => {
              return (
                <li key={episode.imdbID}>
                  {episode.Title} ({episode.imdbRating})
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
