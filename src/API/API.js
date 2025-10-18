import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  getAll: async (config) => {
    return axios.get(BASE_URL, config);
  },
  getAddress: async (id, config) => {
    if (!id) throw new Error("ID missed");
    return axios.get(`${BASE_URL}/${id}`, config);
  },
  create: async (body, config) => {
    if (!body) throw new Error("body missed");
    return axios.post(BASE_URL, body, config);
  },
  update: async ({ id, body }, config) => {
    if (!id || !body) throw new Error("ID or body missed");
    return axios.put(`${BASE_URL}/${id}`, body, config);
  },
  delete: async (id, config) => {
    if (!id) throw new Error("ID missed");
    return axios.delete(`${BASE_URL}/${id}`, config);
  },
};
