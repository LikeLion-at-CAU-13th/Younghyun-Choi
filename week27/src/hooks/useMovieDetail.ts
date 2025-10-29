import { useState, useEffect } from "react";
import axios from "axios";
import type { MovieDetail } from "../types/movie.types";

interface DetailApiResponse {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  runtime: number;
  genres: { id: number; name: string }[];
  popularity: number;
}

interface UseMovieDetailReturn {
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

export const useMovieDetail = (movieId: number | null): UseMovieDetailReturn => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    const controller = new AbortController();

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<DetailApiResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "ko-KR",
            },
            signal: controller.signal,
          }
        );

        const data = res.data;
        const mapped: MovieDetail = {
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
          release_date: data.release_date,
          popularity: data.popularity,
          overview: data.overview,
          runtime: data.runtime,
          genres: data.genres,
        };

        setMovie(mapped);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        setError("영화 정보를 불러올 수 없습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    return () => controller.abort();
  }, [movieId]);

  return { movie, loading, error };
};