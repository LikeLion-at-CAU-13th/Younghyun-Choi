import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(/assets/CHOIYOUNGHYUN.JPG) center no-repeat;
  background-size: cover;
  padding: 10px 8%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #111 100%);
    pointer-events: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 70px;
  list-style: none;

  li a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    &:hover {
      color: #ff0a16;
    }
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
`;

const MainTitle = styled.h1`
  margin-bottom: 50px;
  font-size: 60px;
`;

const SubTitle = styled.p`
  margin-bottom: 40px;
  font-size: 25px;
`;

const LangButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  padding: 10px 20px;
  margin-right: 10px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const LoginButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 10px 20px;

  &:hover {
    background-color: white;
    color: rgb(65, 49, 81);
  }
`;

const InfoButton = styled.button`
  background-color: #e50914;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 40px;
  transition: all 0.3s ease;

  a {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    text-decoration: none;
  }

  &:hover {
    background-color: #ff0a16;
    transform: scale(1.25);
  }
`;

export default function Header() {
  return (
    <HeaderContainer id="home">
      <Nav>
        <a href="#home">
          <Logo src="/assets/logo.png" alt="logo" />
        </a>
        <NavLinks>
          <li>
            <a href="#home">홈</a>
          </li>
          <li>
            <a href="#about">소개</a>
          </li>
          <li>
            <a href="#archive">아카이브</a>
          </li>
          <li>
            <a href="#hobby">취미</a>
          </li>
          <li>
            <a href="#faq">자주하는 질문</a>
          </li>
        </NavLinks>
        <div>
          <LangButton>
            <i className="fa-solid fa-globe"></i> 한국어{" "}
            <i className="fa-solid fa-caret-down"></i>
          </LangButton>
          <LoginButton>로그인</LoginButton>
        </div>
      </Nav>

      <HeaderContent>
        <MainTitle>
          <strong>안녕하세요,</strong>
        </MainTitle>
        <SubTitle>
          멋쟁이사자처럼 13기 프론트엔드 아기사자 <strong>최영현</strong>입니다.
        </SubTitle>
        <InfoButton>
          <a href="#about">더 알아보기</a>
        </InfoButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
