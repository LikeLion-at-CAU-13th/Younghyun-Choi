import axios from "axios";
import { getAuthAxios } from "./authAxios";

const baseURL = "https://likelion-cau.r-e.kr";

export const signup = async (id, pw, name, age) => {
  const result = await axios.post(`${baseURL}/accounts/signup/`, {
    id,
    pw,
    name,
    age,
  });
  return result;
};

export const login = async (id, pw) => {
  const result = await axios.post(`${baseURL}/accounts/login/`, {
    id,
    pw,
  });
  return result.data;
};

export const getMyPage = async (token) => {
  const authAxios = getAuthAxios(token);
  const result = authAxios.get("/accounts/mypage");
  return result;
};

export const getNewRefreshToken = async () => {
  try {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    const result = await axios.post(
      `${baseURL}/accounts/refresh`,
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/"; // 강제 이동!
  }
};
