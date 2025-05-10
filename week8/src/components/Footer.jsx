import React from "react";
import styled from "styled-components";

const FooterSection = styled.footer`
  padding: 60px 10%;
  color: rgba(255, 255, 255, 0.7);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 100px;
  margin-left: 200px;
`;

const FooterLinks = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  list-style: none;

  li:not(:last-child) {
    padding-right: 20px;
    border-right: 1px solid #eee;
  }

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
  }
`;

const SocialLinks = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 30px;
  list-style: none;

  a {
    font-size: 40px;
    color: white;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterSection>
      <FooterContent>
        <FooterLinks>
          <li>
            <a href="https://velog.io/@aintaboutblues/posts">Velog</a>
          </li>
          <li>
            <a href="https://blog.naver.com/benzity">Naver Blog</a>
          </li>
          <li>
            <a href="https://mportal.cau.ac.kr/main.do">Chungang Univ</a>
          </li>
        </FooterLinks>

        <SocialLinks>
          <li>
            <a href="https://www.instagram.com/aintaboutblues/">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100011504325557">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/Benzity">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://open.spotify.com/user/31zjjquq2nawvwi3zfrisaosorva?si=969c958ed08b4e78">
              <i className="fa-brands fa-spotify"></i>
            </a>
          </li>
        </SocialLinks>

        <Copyright>
          Copyright © 2025 Younghyun Choi. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterSection>
  );
}
