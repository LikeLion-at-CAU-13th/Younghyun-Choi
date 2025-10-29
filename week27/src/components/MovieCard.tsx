import styled from "styled-components";
import type { Movie } from "../types/movie.types";

interface MovieCardProps {
  movie: Movie;
  onSelect: (id: number) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  // 포스터 이미지 URL (null 처리)
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <Card onClick={() => onSelect(movie.id)}>
      <PosterImg src={posterUrl} alt={movie.title} />
      <CardInfo>
        <CardTitle>{movie.title}</CardTitle>
        <CardMeta>
          <CardRating>
            ⭐ {movie.vote_average && movie.vote_average.toFixed(1)}
          </CardRating>
          <CardRating>
            {movie.release_date && new Date(movie.release_date).getFullYear()}
          </CardRating>
        </CardMeta>
      </CardInfo>
    </Card>
  );
};

export default MovieCard;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PosterImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardInfo = styled.div`
  padding: 12px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

const CardRating = styled.div`
  color: #f5c518;
  font-weight: 500;
`;
