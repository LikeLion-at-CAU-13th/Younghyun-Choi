import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const baseURL = "https://week12-api-1cc7.onrender.com/api/questions";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  // 문제 받아오기
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(baseURL);
      setQuestions(response.data);

      const initialAnswers = response.data.map((q) => ({
        id: q.id,
        answer: "",
        correct: null,
      }));
      setUserAnswers(initialAnswers);
    };
    fetchQuestions();
  }, []);

  const saveAnswers = (questionId, answer) => {
    setUserAnswers((prev) =>
      prev.map((item) => (item.id === questionId ? { ...item, answer } : item))
    );
  };

  const submitAnswers = async () => {
    const response = await axios.post(
      "https://week12-api-1cc7.onrender.com/api/answers",
      {
        answers: userAnswers.map(({ id, answer }) => ({ id, answer })),
      }
    );

    const updatedAnswers = userAnswers.map((answer) => {
      const result = response.data.results.find((res) => res.id === answer.id);
      return {
        ...answer,
        correct: result ? result.correct : null,
      };
    });

    setUserAnswers(updatedAnswers);

    const correctCount = updatedAnswers.filter((a) => a.correct).length;

    navigate(`/result?score=${correctCount}`);
  };

  return (
    <QuizDom>
      <Title onClick={goHome}>🏠</Title>
      <Title>Quiz Page 🦁</Title>
      <ul>
        {questions.map((q) => {
          const answerObject = userAnswers.find((a) => a.id === q.id);
          return (
            <div key={q.id}>
              <Question>
                Q{q.id + 1}. {q.question}
              </Question>
              <ul>
                {q.answers.map((answer, idx) => (
                  <li key={idx}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={answer}
                        checked={
                          answerObject ? answerObject.answer === answer : false
                        }
                        onChange={() => saveAnswers(q.id, answer)}
                      />
                      {answer}

                      {answerObject && answerObject.correct !== null && (
                        <span>
                          {answerObject.correct &&
                          answerObject.answer === answer
                            ? "✅"
                            : answerObject.answer === answer
                            ? "❌"
                            : ""}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </ul>
      <SubmitButton onClick={submitAnswers}>제출</SubmitButton>
    </QuizDom>
  );
};

export default QuizPage;

const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;
`;

const QuizDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
  padding: 50px;
  height: 80%;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  label {
    display: flex;
    gap: 8px;
    cursor: pointer;
  }
`;

const Question = styled.p`
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  align-self: center;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #9ecfff;
    transform: scale(1.1);
  }
`;
