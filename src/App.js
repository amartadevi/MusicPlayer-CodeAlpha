import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    setisLoading(true);
    try {
      let data = await fetch(
        `https://v1.nocodeapi.com/amartadevi/spotify/tfMzRTecsVwgoPNb/search?q=${
          keyword === "" ? "Trending" : keyword
        }&type=track`
      );
      let converteddata = await data.json();
      console.log(converteddata.tracks.items);
      setTracks(converteddata.tracks.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setisLoading(false);
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Music Player
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success fw-bold">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {isLoading ? (
          <div className="row">
            <div className="col-12 py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={`row${keyword === "" ? "" : " d-none"}`}>
              <div className="col-12 py-3 text-center">
                <h1 className="fw-bold text-white">Music Player</h1>
              </div>
            </div>
            <div className="row">
              {tracks.map((element) => {
                return (
                  <div key={element.id} className="col-lg-3 col-md-6 py-2 setproperty">
                    <div className="card ">
                      <img
                        src={element.album.images[0].url}
                        className="card-img-top"
                        alt="Album Cover"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{element.name}</h5>
                        <p className="card-text">
                          Artist: {element.album.artists[0].name}
                        </p>
                        <p className="card-text">
                          Release Date: {element.album.release_date}
                        </p>
                        <audio
                          src={element.preview_url}
                          controls
                          className="w-100"
                        ></audio>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
