import axios from "axios";
import constants from "./zServiceConstants";

const APIclient = axios.create({
  baseURL: constants.url,
});

const getUserToken = () => {
  const token = localStorage.getItem("token");

  if (!token || token == "") {
    return;
  }

  return token;
};

export default {
  getCurrentCart() {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.get(`/cart`, config);
  },

  add(type, product_id, quantity) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.post(`/cart`, { type, product_id, quantity }, config);
  },

  remove(type, product_id) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
      data: {
        type: type,
        type_id: product_id,
      },
    };

    return APIclient.delete(`/cart`, config);
  },
};
