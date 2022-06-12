import { createStore } from "vuex";
import itemsService from "../services/itemsService";
import offersService from "../services/offersService";
import userService from "../services/userService";

export default createStore({
  state: {
    items: [],
    offers: [],
    userData: {},
  },
  getters: {
    getItems: (state) => {
      return state.items;
    },
    getOffers: (state) => {
      return state.offers;
    },
    getUserData: (state) => {
      return state.userData;
    },
  },
  mutations: {
    setItems() {
      itemsService
        .getAll()
        .then((res) => {
          this.state.items = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setOffers() {
      offersService
        .getAll()
        .then((res) => {
          this.state.offers = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setUserData() {
      const token = localStorage.getItem("token");

      if (!token || token == "") {
        return;
      }

      userService
        .getData(token)
        .then((res) => {
          this.state.userData = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
  },
  actions: {
    login({ commit }) {
      commit("setUserData");
    },
    logout() {
      localStorage.removeItem("token");
      this.state.userData = {};
    },
  },
  modules: {},
});
