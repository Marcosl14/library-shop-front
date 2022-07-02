/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import categoriesService from "../services/categoriesService";
import itemsService from "../services/itemsService";
import offersService from "../services/offersService";
import userService from "../services/userService";

export default createStore({
  state: {
    items: [],
    categories: [],
    offers: [],
    userData: {},
  },
  getters: {
    getUserData: (state) => {
      return state.userData;
    },
    getOffers: (state) => {
      return state.offers;
    },
    getItems: (state) => {
      return state.items;
    },
    getCategories: (state) => {
      return state.categories;
    },
  },
  mutations: {
    setUserData(state) {
      userService
        .getData()
        .then((res) => {
          this.state.userData = res.data;
          const firstname = this.state.userData.firstname;
          if (firstname) {
            this.state.userData.firstname =
              firstname.charAt(0).toUpperCase() + firstname.slice(1);
          }

          const lastname = this.state.userData.lastname;
          if (lastname) {
            this.state.userData.lastname =
              lastname.charAt(0).toUpperCase() + lastname.slice(1);
          }
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setOffers(state) {
      offersService
        .getAll()
        .then((res) => {
          this.state.offers = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setItems(state) {
      itemsService
        .getAll()
        .then((res) => {
          this.state.items = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setFilteredItems(state, params) {
      itemsService
        .getAll(params.categoryId, params.orderBy, params.dir, params.page)
        .then((res) => {
          this.state.items = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
    setCategories(state) {
      categoriesService
        .getAll()
        .then((res) => {
          this.state.categories = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
        });
    },
  },
  actions: {
    login(context) {
      context.commit("setUserData");
    },
    logout(context) {
      localStorage.removeItem("token");
      this.state.userData = {};
    },
    clearUserData(context) {
      this.state.userData = {};
    },
    editUserData(context, data) {
      this.state.userData.firstname =
        data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1);

      this.state.userData.lastname =
        data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1);

      this.state.userData.phone = data.phone;
    },
  },
  modules: {},
});
