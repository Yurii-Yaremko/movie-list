import React from "react";
import { Link } from "react-router-dom";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  imdbRating?: string;
}

interface FavoritesProps {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, toggleFavorite }) => {
  return (
    <section>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet!</p>
      ) : (
        <ul className="movie-list">
          {favorites.map((movie) => (
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
                className="remove-favorite"
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favorites;
