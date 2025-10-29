import { useState } from "react";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { useMovieDetail } from "./hooks/useMovieDetail";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import styled from "styled-components";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { movies, status, error } = useMovieSearch(searchQuery);
  const { movie, loading: detailLoading, error: detailError } = useMovieDetail(selectedId);

  const handleMovieSelect = (id: number): void => {
    setSelectedId(id);
  };

  const handleCloseModal = () => setSelectedId(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Homepage>
      <Header>
        <Title>🎬 Search Movie 🎬</Title>
        <Subtitle>전 세계의 영화 찾아보기</Subtitle>
      </Header>

      <Search>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="영화 제목을 입력하세요..."
        />
      </Search>

      <Content>
        {status === "loading" && (
          <StatusPage>
            <Spinner />
            <p>검색 중...</p>
          </StatusPage>
        )}

        {status === "error" && (
          <StatusPage>
            <p>⚠️ {error}</p>
          </StatusPage>
        )}

        {status === "success" && (
          <>
            {movies.length > 0 ? (
              <>
                <div>
                  <Result>총 {movies.length}개의 영화를 찾았습니다!</Result>
                </div>
                <MovieGrid>
                  {movies.map((m) => (
                    <MovieCard key={m.id} movie={m} onSelect={handleMovieSelect} />
                  ))}
                </MovieGrid>
              </>
            ) : (
              <StatusPage>
                <p>검색 결과가 없습니다</p>
              </StatusPage>
            )}
          </>
        )}

        {status === "idle" && (
          <StatusPage>
            <p>🔍 영화 제목을 입력해서 검색하세요</p>
          </StatusPage>
        )}
      </Content>

      {/* 상세 모달 */}
      <MovieModal
        movie={detailLoading || detailError ? null : movie}
        isOpen={selectedId !== null}
        onClose={handleCloseModal}
      />

      {/* 로딩/에러 시 모달 위 안내 문구 옵션 */}
      {selectedId !== null && (detailLoading || detailError) && (
        <OverlayNote>
          {detailLoading ? "상세 정보를 불러오는 중입니다..." : detailError}
        </OverlayNote>
      )}
    </Homepage>
  );
}

export default App;

/* 스타일은 기존 코드 그대로 사용해도 무방함 */
const Homepage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  padding: 20px;
  gap: 15px;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 1200;
  margin: 0;
`;
const Subtitle = styled.div`
  font-size: 18px;
  opacity: 0.9;
  margin: 8px 0 0 0;
`;
const Search = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  outline: none;
  transition: box-shadow 0.3s;
  &:focus {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Result = styled.div`
  color: white;
  text-align: center;
  font-size: 18px;
  margin-bottom: 25px;
  font-weight: 500;
`;
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
const StatusPage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: white;
  font-size: 20px;
`;
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  @keyframes spin { to { transform: rotate(360deg); } }
`;
const OverlayNote = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.95);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
`;