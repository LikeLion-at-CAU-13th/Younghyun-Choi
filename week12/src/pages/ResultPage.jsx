import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const ResultPage = () => {
  const [results, setResults] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const score = searchParams.get("score");

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(
        `https://week12-api-1cc7.onrender.com/api/result?score=${score}`
      );
      setResults(response.data);
    };
    fetchResults();
  }, [score]);

  return (
      <ResultDom>
        <Title onClick={goHome}>🏠</Title>
        <Title>Result Page 🦁</Title>
        {results ? (
          <>
            <h2>당신의 점수 : {results.score} / 5</h2>
            <p>{results.message}</p>
          </>
        ) : (
          <p>결과를 불러오는 중...</p>
        )}
      </ResultDom>
  );
};

export default ResultPage;


const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;
`;

const ResultDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
  padding: 50px;
  height: 80%;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;
