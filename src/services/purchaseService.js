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
  purchaseCart() {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.post(`/purchases`, {}, config);
  },
};
