import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  imdbRating?: string;
}

interface EditMovieProps {
  movies: Movie[];
  onEditMovie: (movie: Movie) => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movies, onEditMovie }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const movie = movies.find((movie) => movie.imdbID === id);
    if (movie) {
      setTitle(movie.Title);
      setYear(movie.Year);
      setPoster(movie.Poster);
      setRating(movie.imdbRating || "");
    }
  }, [id, movies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !year) {
      alert("Title and Year are required!");
      return;
    }

    const updatedMovie: Movie = {
      Title: title,
      Year: year,
      imdbID: id!,
      Poster: poster || "https://via.placeholder.com/150",
      imdbRating: rating || "N/A",
    };

    onEditMovie(updatedMovie);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="edit-movie-form">
      <h2>Edit Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Poster URL (optional)"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />
      <input
        type="text"
        placeholder="IMDB Rating (optional)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default EditMovie;
