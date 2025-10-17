import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  getAll: async () => {
    return await axios.get(BASE_URL).then((res) => res);
  },
  getAddress: async (id) => {
    return await axios.get(`${BASE_URL}/${id}`).then((res) => res);
  },
  create: async (body) => {
    return await axios.post(BASE_URL, body).then((res) => res);
  },
  update: async ({ id, body }) => {
    return await axios.put(`${BASE_URL}/${id}`, body).then((res) => res);
  },
  delete: async (id) => {
    return await axios.delete(`${BASE_URL}/${id}`).then((res) => res);
  },
};
