import React, { useEffect, useState } from "react";
import {
  getWatchListByNumber,
  getWatchListByThreshold,
  getEstimatedRuntime
} from "../stats";
import Episodes from "./Episodes";
import "./Watchlist.css";

export default function Watchlist(props) {
  const { seasons, show } = props;
  const [calculationMode, setCalculationMode] = useState("length");
  const [watchListLength, setWatchListLength] = useState(10);
  const [scoreThreshold, setScoreThreshold] = useState(9);
  const [watchList, setWatchList] = useState([]);
  const estimatedRuntime = getEstimatedRuntime(watchList, show);

  useEffect(() => {
    setCalculationMode("threshold");
  }, [seasons, scoreThreshold]);
  useEffect(() => {
    setCalculationMode("length");
  }, [seasons, watchListLength]);
  useEffect(() => {
    if (calculationMode === "length") {
      setWatchList(getWatchListByNumber(seasons, watchListLength));
    }
    if (calculationMode === "threshold") {
      setWatchList(getWatchListByThreshold(seasons, scoreThreshold));
    }
  }, [seasons, calculationMode, watchListLength, scoreThreshold]);

  const thresholdListTitle = `All episodes with a score of at least ${scoreThreshold}`;
  const numberListTitle = `Top ${watchListLength} best episodes`;
  const watchListTitle =
    (calculationMode === "threshold" && thresholdListTitle) || numberListTitle;

  return (
    <div className="showDetails">
      <h1>Watch list</h1>
      <div className="watchListCalculationModes">
      <div className="calculationModeOr">I want to watch</div>
        <div className="calculationMode">
           the top{" "}
          <input
            value={watchListLength}
            onChange={e => setWatchListLength(e.target.value)}
          />{" "}
          episodes
        </div>
        <div className="calculationModeOr">or</div>
        <div className="calculationMode">
          all episodes with a score of at least{" "}
          <input
            value={scoreThreshold}
            onChange={e => setScoreThreshold(e.target.value)}
          />
        </div>
      </div>
      <h2>{watchListTitle}</h2>
      <p>Estimated runtime: {estimatedRuntime}</p>
      <Episodes seasons={watchList} />
    </div>
  );
}
