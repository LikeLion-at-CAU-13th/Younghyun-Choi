import React from "react";
import styled from "styled-components";

const AboutSection = styled.section`
  margin-top: 60px;
  margin-bottom: 25px;
  font-size: 60px;

  h1 {
    font-size: 70px;
    color: white;
    margin-top: 100px;
    margin-bottom: 150px;
    text-align: center;
  }
`;

const AboutContainer = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
`;

const AboutPhoto = styled.img`
  width: 450px;
  height: 550px;
  object-fit: contain;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const AboutContent = styled.div`
  display: flex;
  font-size: 25px;
  margin-left: 70px;
`;

const AboutNames = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  margin-right: 20px;
  margin-bottom: 30px;
`;

const AboutDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export default function About() {
  return (
    <AboutSection id="about">
      <h1>저를 소개합니다.</h1>
      <AboutContainer>
        <AboutPhoto src="/assets/About-Photo.JPG" alt="소개 사진" />
        <AboutContent>
          <AboutNames>
            <p>이름</p>
            <p>생년월일</p>
            <p>혈액형</p>
            <p>MBTI</p>
            <p>학력</p>
            <p>ㅤ</p>
            <p>ㅤ</p>
            <p>ㅤ</p>
            <p>병력</p>
            <p>활동 동아리</p>
            <p>ㅤ</p>
            <p>ㅤ</p>
            <p>ㅤ</p>
            <p>좋아하는 음식</p>
            <p>좋아하는 가수</p>
            <p>여행해본 나라</p>
          </AboutNames>

          <AboutDescriptions>
            <p>최영현 (Caleb Choi)</p>
            <p>2002년 11월 20일 (24세)</p>
            <p>A형</p>
            <p>INTJ</p>
            <p>용인대덕초등학교 졸업 (2009-2014)</p>
            <p>용인대덕중학교 졸업 (2015-2017)</p>
            <p>김천고등학교 졸업 (2018-2020)</p>
            <p>중앙대학교 소프트웨어학부 재학 (2022~)</p>
            <p>대한민국 육군 카투사 만기전역 (2022.08~2024.02)</p>
            <p>멋쟁이사자처럼 프론트엔드 13기 아기사자 (2025)</p>
            <p>민중가요 밴드동아리 누리울림 37기 기타세션장 (2024)</p>
            <p>교환학생 언어교환 동아리 KOREA CLUB 2024-2 부회장 (2024)</p>
            <p>소프트웨어학부 밴드동아리 소울(Soul) 2기 회장 (2024)</p>
            <p>파스타, 초밥, 돈카츠</p>
            <p>John Mayer, Stevie Ray Vaughan, Oasis, 10cm, 적재</p>
            <p>
              일본, 중국, 태국, 카타르, 미국, 캐나다, 프랑스, 스위스, 헝가리,
            </p>
            <p>크로아티아, 슬로베니아, 독일, 오스트리아, 체코</p>
          </AboutDescriptions>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
}
