import React, { useState } from "react";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  imdbRating?: string;
}

interface AddMovieProps {
  onAddMovie: (movie: Movie) => void;
}

const AddMovie: React.FC<AddMovieProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !year) {
      alert("Title and Year are required!");
      return;
    }

    const newMovie: Movie = {
      Title: title,
      Year: year,
      imdbID: `custom-${Date.now()}`,
      Poster: poster || "https://via.placeholder.com/150",
      imdbRating: rating || "N/A",
    };

    onAddMovie(newMovie);
    setTitle("");
    setYear("");
    setPoster("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add New Movie</h2>
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
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
