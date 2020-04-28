import React, { useEffect, useState } from "react";
import { getWatchList } from "../stats";
import Episodes from "./Episodes";

export default function Stats(props) {
  const { seasons } = props;
  const [watchListLength, setWatchListLength] = useState(10);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    setWatchList(getWatchList(seasons, watchListLength));
  }, [seasons, watchListLength]);

  return (
    <div className="showDetails">
      <h1>Watch list</h1>
      <label>
        I want to watch the top{" "}
        <input
          value={watchListLength}
          onChange={e => setWatchListLength(e.target.value)}
        />{" "}
        episodes
      </label>
      <Episodes seasons={watchList} />
    </div>
  );
}
