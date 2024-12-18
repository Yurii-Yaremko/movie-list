import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { fetchMovies } from "./api/api";
import Favorites from "./components/Favourites";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  imdbRating?: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const results = await fetchMovies(query);
    setMovies(results);
  };

  const handleAddMovie = async (newMovie: Movie) => {
    try {
      const response = await fetch("https://api.example.com/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const addedMovie = await response.json();
      setMovies((prevMovies) => [addedMovie, ...prevMovies]);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDeleteMovie = async (imdbID: string) => {
    try {
      const response = await fetch(`https://api.example.com/movies/${imdbID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.imdbID !== imdbID)
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEditMovie = async (updatedMovie: Movie) => {
    try {
      const response = await fetch(
        `https://api.example.com/movies/${updatedMovie.imdbID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedMovieFromAPI = await response.json();
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.imdbID === updatedMovieFromAPI.imdbID
            ? updatedMovieFromAPI
            : movie
        )
      );
    } catch (error) {
      console.error("Error editing movie:", error);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Movie List</h1>
        </header>
        <div>
          <Link to="/">
            <button onClick={() => setShowFavorites(false)}>
              Search Movies
            </button>
          </Link>
          <Link to="/favorites">
            <button onClick={() => setShowFavorites(true)}>Favorites</button>
          </Link>
          <Link to="/addmovie">
            <button>Add Movie</button>
          </Link>
        </div>
        {!showFavorites && (
          <>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
            />
            <button onClick={handleSearch}>Search</button>
          </>
        )}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showFavorites ? (
                    <Favorites
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                    />
                  ) : (
                    <Search
                      movies={movies}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      handleDeleteMovie={handleDeleteMovie}
                    />
                  )}
                </>
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/addmovie"
              element={<AddMovie onAddMovie={handleAddMovie} />}
            />
            <Route
              path="/editmovie/:id"
              element={
                <EditMovie movies={movies} onEditMovie={handleEditMovie} />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
