import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background: linear-gradient(180deg, #141414, black);
  width: 60%;
  max-width: 900px;
  border-radius: 5px;
  margin: 100px auto;
  color: white;
`;

const CloseButton = styled.button`
  margin: 20px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background-color: #141414;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0px -130px 80px #141414;
`;

const ModalDesc = styled.div`
  padding: 20px;
`;

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
}) {
  return (
    <ModalWrapper $isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle style={{ backgroundImage: `url(${imageUrl})` }} />
        <ModalDesc>
          <h2>{title}</h2>
          <p>{description}</p>
        </ModalDesc>
      </ModalContent>
    </ModalWrapper>
  );
}
