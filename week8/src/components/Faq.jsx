import React, { useState } from "react";
import styled from "styled-components";

const FaqSection = styled.section`
  margin: 100px auto;
  text-align: center;

  h1 {
    font-size: 70px;
    color: white;
    margin-bottom: 100px;
  }
`;

const Accordion = styled.ul`
  width: 100%;
  max-width: 1200px;
  margin: 60px auto;
`;

const AccordionItem = styled.li`
  list-style: none;
  width: 100%;
  padding: 5px;
`;

const Question = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  background: #303030;
  margin-bottom: 2px;
  cursor: pointer;
  position: relative;

  &::after {
    content: "${({ $isActive }) => ($isActive ? "−" : "+")}";
    font-size: 40px;
    position: absolute;
    right: 20px;
    transition: 0.3s;
  }
`;

const Answer = styled.div`
  background: #3b3b3b;
  font-size: 22px;
  line-height: 1.6;
  text-align: left;
  padding: ${({ $isActive }) => ($isActive ? "30px 20px" : "0 20px")};
  max-height: ${({ $isActive }) => ($isActive ? "600px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const FaqList = [
  {
    question: "요즘 가장 재미있는 일이 무엇인가요?",
    answer:
      "개발에 진심으로 빠져들게 되었다는 것입니다. 프론트엔드 과제가 특히 잘 맞아요.",
  },
  {
    question: "인생의 목표가 무엇인가요?",
    answer:
      "미국 대학원 졸업 후, 해외 경험을 쌓고 한국에서도 훌륭한 개발자가 되고 싶어요.",
  },
  {
    question: "동아리 4개에 전공 공부, 밴드까지 하면 힘들진 않으신가요?",
    answer: "좋으면 힘들지 않아요. 동아리 활동이 오히려 저를 회복시켜줘요!",
  },
  {
    question: "제일 좋아하는 글귀가 무엇인가요?",
    answer: "La vie est belle. (인생은 아름답다)",
  },
  {
    question: "요즘 실천하고 싶은 것이 있나요?",
    answer: "매일 아침 7시에 일어나 운동하고 하루를 잘 보내는 것이 목표예요.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <FaqSection id="faq">
      <h1>자주하는 질문.</h1>
      <Accordion>
        {FaqList.map((item, i) => (
          <AccordionItem key={i}>
            <Question
              $isActive={activeIndex === i}
              onClick={() => toggleIndex(i)}
            >
              {item.question}
            </Question>
            <Answer $isActive={activeIndex === i}>{item.answer}</Answer>
          </AccordionItem>
        ))}
      </Accordion>
    </FaqSection>
  );
}
