require('dotenv').config();

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetails {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Poster: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}?i=${id}&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  return (
    <div className="movie-details">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
      />
      <h2>
        {movie.Title} ({movie.Year})
      </h2>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
      <p>
        <strong>IMDB Rating:</strong> {movie.imdbRating}
      </p>
    </div>
  );
};

export default MovieDetails;
