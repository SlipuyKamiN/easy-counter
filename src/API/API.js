//depID AKfycbzLYqAKXihEDLHI9JTa5UbNyhAyoKvCFBunM9zGCcdacXzYK4ou4dDrg1f3FkEcERvy
//URL https://script.google.com/macros/s/AKfycbzLYqAKXihEDLHI9JTa5UbNyhAyoKvCFBunM9zGCcdacXzYK4ou4dDrg1f3FkEcERvy/exec
//client ID 130643800831-mk108cl1avf3kbn88om45bpbajvo32gp.apps.googleusercontent.com

import axios from "axios";

const BASE_URL =
  "https://script.google.com/macros/s/AKfycbx0eB6IrszK668ritau-_rV2S6C9wlzBqH1K2VDxh0ZAQxBe5WJiegp43kMrIvjk9sM/exec";

export const getDataSheet = async () => {
  const data = await axios
    .get(BASE_URL)
    .then((res) => res.data)
    .catch(console.log);

  console.log(data);

  return data;
};

export const createAddress = async (body) => {
  const data = await axios
    .post(BASE_URL, body)
    .then((res) => res.body)
    .catch(console.log);

  return data;
};

export const updateAddress = async (id, body) => {
  const data = await axios
    .patch(BASE_URL, body)
    .then((res) => res.body)
    .catch(console.log);

  return data;
};

export const deleteAddress = async (id) => {
  const data = await axios
    .delete(BASE_URL, id)
    .then((res) => res.body)
    .catch(console.log);

  return data;
};
