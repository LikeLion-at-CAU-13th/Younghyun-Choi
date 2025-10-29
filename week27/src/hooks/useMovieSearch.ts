import { useState, useEffect } from "react";
import axios from "axios";
import { type Movie, type SearchStatus } from "../types/movie.types";
import type { ApiResponse } from "../types/api.types";

interface UseMovieSearchReturn {
  movies: Movie[];
  status: SearchStatus;
  error: string | null;
}

export const useMovieSearch = (query: string): UseMovieSearchReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const controller = new AbortController();

    const searchMovies = async () => {
      try {
        setStatus("loading");

        const response = await axios.get<ApiResponse>(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              query,
              language: "ko-KR",
            },
            signal: controller.signal,
          }
        );

        setMovies(response.data.results);
        setStatus("success");
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setStatus("error");
        setError("영화 검색 중 오류가 발생했습니다.");
        setMovies([]);
        console.error("API Error:", err);
      }
    };

    const timer = setTimeout(searchMovies, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { movies, status, error };
};