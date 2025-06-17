import axios from "axios";

const baseUrl = "http://localhost:3434/persons";

const get = () => axios.get(baseUrl).then((res) => res.data);

const post = (newContact) =>
  axios.post(baseUrl, newContact).then((res) => res.data);

const update = (id, num) =>
  axios.put(`${baseUrl}/${id}`, num).then((res) => res.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  get,
  post,
  update,
  remove,
};
