import axios from 'axios';

const API_URL = 'http://localhost:3000'; // JSON Server

export const getRoles = async () => {
  const res = await axios.get(`${API_URL}/roles?_expand=permissions`);
  return res.data;
};

export const createRole = async (role) => {
  const res = await axios.post(`${API_URL}/roles`, role);
  return res.data;
};

export const getPermissions = async () => {
  const res = await axios.get(`${API_URL}/permissions`);
  return res.data;
};
