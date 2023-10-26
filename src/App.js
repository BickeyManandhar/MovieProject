import { useEffect, useState } from "react";
import API_Key from "./apikey.json";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=${API_Key.api_key}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    //console.log(response);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  },[]);
  return (
    <div className="app">
      <h1>Movie Project</h1>
      <h1>Developed By Bickey</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchInput)} />
      </div>
      {/* here "?" in "movies?.length" will make sure "movies" is not null or undefined. if we do not put "?" then it may result in runtime error if we try to access length of null/undefined object*/}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Sorry, no movies found.</h2>
        </div>
      )}
    </div>
  );
};

export default App;
