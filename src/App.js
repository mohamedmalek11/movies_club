import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

function App() {
  const API_URL = `http://www.omdbapi.com/?apikey=ab9ea110`;

  const [pageNumber, setpageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    searchMovies("love");
  }, []);

  //changing page data on changing page number
  useEffect(() => {
    searchInput ? searchMovies(searchInput) : searchMovies("love");
  }, [pageNumber]);

  const previousPage = () => {
    pageNumber === 1 ? setpageNumber(1) : setpageNumber(pageNumber - 1);
    searchInput ? searchMovies(searchInput) : searchMovies("love");
  };
  const NextPage = () => {
    setpageNumber(pageNumber + 1);
    searchInput ? searchMovies(searchInput) : searchMovies("love");
  };

  const searchMovies = async (title) => {
    //prevent crash if seaching for empty string
    if (title === "") {
      return;
    }
    //set loading indicator
    setisLoading(true);
    console.log(title);
    //get the new seraching data
    const responce = await fetch(`${API_URL}&s=${title}&page=${pageNumber}`);
    const data = await responce.json();
    setMovies(data.Search);
    setisLoading(false);
  };

  //html template
  return (
    <div className="app">
      <div className="header">
        <h1>Movie Club</h1>
        <div className="search">
          <input
            placeholder="search for movie"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => {
              searchMovies(searchInput);
              setpageNumber(1);
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="empty">
          <h2>Searching for movies</h2>
        </div>
      ) : (
        ""
      )}
      {movies?.length > 0 && isLoading === false ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard key={movie.imdbID} movies={movie} />;
          })}
          <div className="pages-buttons">
            <button onClick={previousPage}>previous page</button>
            <button onClick={NextPage}>Next page</button>
          </div>
        </div>
      ) : isLoading === false ? (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
