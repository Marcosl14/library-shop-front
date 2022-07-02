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
  getData() {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.get(`/users`, config);
  },

  login(email, password) {
    return APIclient.post(`/auth/login`, { email, password });
  },

  register(email, password, passwordConfirmation, firstname, lastname, phone) {
    return APIclient.post(`/auth/register`, {
      email,
      password,
      passwordConfirmation,
      firstname,
      lastname,
      phone,
    });
  },

  confirmRegistration(registryUUID) {
    return APIclient.post(`/auth/confirm-registration`, { registryUUID });
  },

  passwordForgotten(email) {
    return APIclient.patch(`/users/password_forgotten`, { email });
  },

  confirmEmailChange(emailChangeUUID) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.patch(
      `/users/email_change_confirmation`,
      { emailChangeUUID },
      config
    );
  },

  remove(password, email) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
      data: { email, password },
    };

    return APIclient.delete(`/users`, config);
  },

  changePassword(password, newPassword, newPasswordConfirmation) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.patch(
      `/users/password_change`,
      { password, newPassword, newPasswordConfirmation },
      config
    );
  },

  changeEmailAccount(email, emailConfirmation) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.post(
      `/users/email_change`,
      { email, emailConfirmation },
      config
    );
  },

  changeUserData(firstname, lastname, phone) {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };

    return APIclient.patch(
      `/users/user_data`,
      { firstname, lastname, phone },
      config
    );
  },
};
