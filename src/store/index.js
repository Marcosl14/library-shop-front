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
      // localStorage.setItem(
      //   "token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Im1hcmNvcy5naW9yZGFuby5sMTRAZ29vZ2xlbWFpbC5jb20iLCJyZWdpc3RyeVVVSUQiOiI0NzgwMmVkOC0wMTNmLTRiOWUtYTIyZC04ZWVkOWQ0ZWY1NTMiLCJpYXQiOjE2NTMxMzk2NzIsImV4cCI6MTY1MzEzOTczMn0.5UMTmGkHUrbEZF7ZvfKFfPrpxRkfpa-R6ueXfGzcJ0k"
      // );
      const token = localStorage.getItem("token");

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
    // getUserData() {
    //   // localStorage.setItem(
    //   //   "token",
    //   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Im1hcmNvcy5naW9yZGFuby5sMTRAZ29vZ2xlbWFpbC5jb20iLCJyZWdpc3RyeVVVSUQiOiI0NzgwMmVkOC0wMTNmLTRiOWUtYTIyZC04ZWVkOWQ0ZWY1NTMiLCJpYXQiOjE2NTMxMzk2NzIsImV4cCI6MTY1MzEzOTczMn0.5UMTmGkHUrbEZF7ZvfKFfPrpxRkfpa-R6ueXfGzcJ0k"
    //   // );
    //   const token = localStorage.getItem("token");
    //   userService
    //     .getData(token)
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data.statusCode, err.response.data.message);
    //     });
    // },
  },
  modules: {},
});
