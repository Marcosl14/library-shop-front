import axios from "axios";
import constants from "./zServiceConstants";

const APIclient = axios.create({
  baseURL: constants.url,
});

export default {
  getData(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return APIclient.get(`/users`, config);
  },

  login(email, password) {
    return APIclient.post(`auth/login`, { email, password });
  },

  register(email, password, passwordConfirmation, firstname, lastname, phone) {
    return APIclient.post(`auth/register`, {
      email,
      password,
      passwordConfirmation,
      firstname,
      lastname,
      phone,
    });
  },

  confirmRegistration(registryUUID) {
    return APIclient.post(`auth/confirm-registration`, { registryUUID });
  },
};
