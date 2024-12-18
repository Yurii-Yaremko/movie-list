import React from "react";
import { Link } from "react-router-dom";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  imdbRating?: string;
}

interface SearchProps {
  movies: Movie[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  handleDeleteMovie: (imdbID: string) => void;
}

const Search: React.FC<SearchProps> = ({
  favorites,
  toggleFavorite,
  movies,
  handleDeleteMovie,
}) => {
  return (
    <>
      {movies.length === 0 ? (
        <p>No movies found. Try searching for something else!</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.Title}
                />
                <h3>{movie.Title}</h3>
              </Link>
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Rating:</strong> {movie.imdbRating || "N/A"}
              </p>

              <button
                onClick={() => toggleFavorite(movie)}
                className={
                  favorites.some((fav) => fav.imdbID === movie.imdbID)
                    ? "remove-favorite"
                    : "add-favorite"
                }
              >
                {favorites.some((fav) => fav.imdbID === movie.imdbID)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
              <Link to={`/editmovie/${movie.imdbID}`}>
                <button>Edit Movie</button>
              </Link>
              <button onClick={() => handleDeleteMovie(movie.imdbID)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
