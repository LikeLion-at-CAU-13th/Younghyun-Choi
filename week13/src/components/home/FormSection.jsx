import React, { useContext } from "react";
import { Button, Wrapper } from "../layout/common";
import Form from "./Form";
import { ThemeColorContext } from "../../context/context";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../Modal";

const FormSection = () => {
  const mode = useContext(ThemeColorContext);
  const { setIsOpen } = useContext(ModalContext);

  const handleBtn = () => {
    setIsOpen(true);
  };

  return (
    <Wrapper>
      <Form type="home" inputType="이름" />
      <Form type="email" inputType="이메일" />
      <Form type="text" inputType="학과" />
      <Button mode={mode.button} onClick={handleBtn}>
        제출
      </Button>

      <Modal />
    </Wrapper>
  );
};

export default FormSection;
