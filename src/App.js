import React, { useState, useEffect, Fragment } from "react";
import { getShowDetails, getShowEpisodes } from "./api";
import Search from "./components/Search";
import Show from "./components/Show";

function App() {
  const [selectedShow, setSelectedShow] = useState(false);
  const [selectedShowDetails, setSelectedShowDetails] = useState({});
  const [selectedShowSeasons, setSelectedShowSeasons] = useState([]);

  useEffect(() => {
    if (selectedShow) {
      getShowDetails(selectedShow).then(res => {
        setSelectedShowDetails(res);
        getShowEpisodes(res).then(seasons => {
          setSelectedShowSeasons(seasons);
        });
      });
    }
  }, [selectedShow]);

  return (
    <Fragment>
    <div className="App">
      {!selectedShow && <Search selectShow={id => setSelectedShow(id)} />}
      {selectedShow && (
        <Show show={selectedShowDetails} seasons={selectedShowSeasons} close={() => setSelectedShow()} />
      )}
    </div>
    <footer>made by <a href="http://feelic.fr">@feelic</a></footer>
      </Fragment>
  );
}

export default App;
