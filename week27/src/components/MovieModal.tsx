import { useEffect } from 'react';
import { type MovieDetail } from '../types/movie.types';
import styled from "styled-components";

interface MovieModalProps {
    movie: MovieDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  useEffect(() => {

    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = prev || "unset";
    };
    
    }, [isOpen, onClose]);

    if (!isOpen || !movie) return null;


  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={onClose}> ✕ </ModalClose>
        
        <ModalBody>
          <ModalPoster src={posterUrl} alt={movie.title} />
          
          <ModalInfo>
            <h2>{movie.title}</h2>
            <ModalMeta>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>📅 {new Date(movie.release_date).getFullYear()}</span>
              <span>⏱️ {movie.runtime}분</span>
            </ModalMeta>
            
            <ModalGenres>
                {movie.genres?.map((g) => (
                    <GenreTag key={g.id}>{g.name}</GenreTag>
                ))}
            </ModalGenres>
            
            <ModalOverview>{movie.overview || "줄거리 정보가 없습니다."}</ModalOverview>
          </ModalInfo>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
`;

const ModalPoster = styled.img`
  width: 300px;
  border-radius: 8px;
`;

const ModalInfo = styled.div`
  flex: 1;
`;

const ModalMeta = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  font-size: 16px;
  color: #666;
`;

const ModalGenres = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const GenreTag = styled.div`
  background: #667eea;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const ModalOverview = styled.div`
  line-height: 1.6;
  color: #333;
`;
