import axios from "axios";

const API = "http://localhost:3000/permissions"; 

export const getPermissions = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createPermissions = async (data) => {
  const res = await axios.post(API, data); 
  return res.data;
};
