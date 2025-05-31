import axios from "axios";

export const baseURL = "https://week11-server.onrender.com";

// export const baseURL = process.env.REACT_APP_API_URL;

export const getPerPage = async (page) => {
  const response = await axios.get(`${baseURL}/lionlist?page=${page}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/lionlist?page=0`);
  return response.data;
};

export const getGenderUser = async (gender) => {
  const response = await axios.get(`${baseURL}/lionlist?gender=${gender}`);
  return response.data;
};

export const getPartUser = async (part) => {
  const response = await axios.get(`${baseURL}/lionlist?part=${part}`);
  return response.data;
}
