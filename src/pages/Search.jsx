import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import "./MovieGrid.css"

const Search = () => {
  const [searchParams] = useSearchParams()
  const [moviesResults, setMoviesResults] = useState([])
  const query = searchParams.get("q")

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMoviesResults(data.results);
  };

  useEffect(()=>{
    const UrlSearch = `${searchURL}?${apiKey}&query=${query}`;

    getSearchedMovies(UrlSearch);
  },[query])

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
        <div className="movies-container">
          {moviesResults.length === 0 && <p>Carregando...</p>}
          {moviesResults.length > 0 && 
            moviesResults.map((movie) => <MovieCard key={movie.id} movie={movie}/> )}
        </div>
    </div>
  )
}

export default Search