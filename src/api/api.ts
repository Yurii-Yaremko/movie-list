require('dotenv').config();

export const fetchMovies = async (query: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}?s=${query}&apikey=${process.env.API_KEY}`);
    if (!response.ok) throw new Error("Error fetching movies");
    const data = await response.json();

    if (!data.Search) return [];

    const detailedMovies = await Promise.all(
      data.Search.map(async (movie: any) => {
        const detailsResponse = await fetch(
          `${process.env.BASE_URL}?i=${movie.imdbID}&apikey=${process.env.API_KEY}`
        );
        if (!detailsResponse.ok)
          throw new Error("Error fetching movie details");
        const details = await detailsResponse.json();
        return {
          Title: details.Title,
          Year: details.Year,
          imdbID: details.imdbID,
          Poster: details.Poster,
          imdbRating: details.imdbRating,
          Released: details.Released,
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error(error);
    return [];
  }
};
