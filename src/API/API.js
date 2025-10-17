import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  getAll: async () => {
    return await axios.get(BASE_URL).then((res) => res);
  },
  getAddress: async (id) => {
    if (!id) throw new Error("ID missed");
    return await axios.get(`${BASE_URL}/${id}`).then((res) => res);
  },
  create: async (body) => {
    if (!body) throw new Error("body missed");
    return await axios.post(BASE_URL, body).then((res) => res);
  },
  update: async ({ id, body }) => {
    if (!id || !body) throw new Error("ID or body missed");
    return await axios.put(`${BASE_URL}/${id}`, body).then((res) => res);
  },
  delete: async (id) => {
    if (!id) throw new Error("ID missed");
    return await axios.delete(`${BASE_URL}/${id}`).then((res) => res);
  },
};
