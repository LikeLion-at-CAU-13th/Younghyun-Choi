import React from "react";
import { useSetRecoilState } from "recoil";
import { departmentAtom, emailAtom, userNameAtom } from "../../recoil/atom";

const Form = ({ type, inputType }) => {
  const setUserName = useSetRecoilState(userNameAtom);
  const setEmail = useSetRecoilState(emailAtom);
  const setDepartment = useSetRecoilState(departmentAtom);

  const onChange = (e) => {
    const value = e.target.value;
    if (inputType === "이름") {
      setUserName(value);
    } else if (inputType === "이메일") {
      setEmail(value);
    } else if (inputType === "학과") {
      setDepartment(value);
    }
  };

  return (
    <>
      <div>{inputType}</div>
      <input type={type} onChange={onChange} />
    </>
  );
};

export default Form;
