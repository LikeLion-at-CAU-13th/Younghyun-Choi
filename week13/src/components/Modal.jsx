import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  departmentAtom,
  emailAtom,
  isSubmittedAtom,
  userNameAtom,
} from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./layout/common";

const Modal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const userName = useRecoilValue(userNameAtom);
  const email = useRecoilValue(emailAtom);
  const department = useRecoilValue(departmentAtom);
  const setSubmitted = useSetRecoilState(isSubmittedAtom);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    setSubmitted(true);
    setIsOpen(false);
    navigate("/mypage");
  };

  return (
    <Wrapper>
      <Box>
        <h3> 입력한 정보를 다시 한번 확인해주세요.</h3>
        <p> 이름 : {userName} </p>
        <p> 이메일 : {email} </p>
        <p> 학과 : {department} </p>
        <ButtonWrapper>
          <Button onClick={() => setIsOpen(false)}>취소</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  button {
    margin: 0 10px;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default Modal;
