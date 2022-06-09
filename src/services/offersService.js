import axios from "axios";

const APIclient = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  getAll() {
    return APIclient.get(`/offers`);
  },
};
