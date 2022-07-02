import axios from "axios";
import constants from "./zServiceConstants";

const APIclient = axios.create({
  baseURL: constants.url,
});

export default {
  getAll() {
    return APIclient.get(`/offers`);
  },

  getOne(id) {
    return APIclient.get(`/offers/${id}`);
  },
};
