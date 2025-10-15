import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  getAll: async () => {
    axios.get(BASE_URL);
  },
  getAddress: async (id) => {
    axios.get(`${BASE_URL}/${id}`);
  },
  create: async (body) => {
    return await axios
      .post(BASE_URL, body)
      .then((res) => res.data)
      .catch(console.log);
  },
  update: async (id, body) => {
    return await axios
      .put(`${BASE_URL}/${id}`, body)
      .then((res) => res.data)
      .catch(console.log);
  },
  delete: async (id) => {
    return await axios
      .delete(`${BASE_URL}/${id}`)
      .then((res) => res.data)
      .catch(console.log);
  },
};
