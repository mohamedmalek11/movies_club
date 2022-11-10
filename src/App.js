import "./App.css";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

function App() {
  const API_URL = "http://www.omdbapi.com/?apikey=ab9ea110";

  const [movies, setMovies] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}`);
    const data = await responce.json();
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className="search">
        <input
          placeholder="search for movie"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchInput)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard key={movie.imdbID} movies={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
