/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import categoriesService from "../services/categoriesService";
import itemsService from "../services/itemsService";
import offersService from "../services/offersService";
import userService from "../services/userService";
import cartService from "../services/cartService";

import router from "../router/index.js";

export default createStore({
  state: {
    items: [],
    categories: [],
    offers: [],
    cart: {},
    userData: {},
  },
  getters: {
    getUserData: (state) => {
      return state.userData;
    },
    userExists: (state) => {
      if (
        state.userData.firstname &&
        state.userData.lastname &&
        state.userData.email &&
        state.userData.phone
      ) {
        return true;
      }
      return false;
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
    getCart: (state) => {
      return state.cart;
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
    setCart(state) {
      cartService
        .getCurrentCart()
        .then((res) => {
          this.state.cart = res.data;
        })
        .catch((err) => {
          router.push({ name: "log-in" });
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
    addOrUpdateCartItem(state, { type, productId, quantity }) {
      cartService
        .addOrUpdate(type, productId, quantity)
        .then(() => {
          if (type == "item" && state.cart.cartItems) {
            const itemIndex = state.cart.cartItems.findIndex((cartItem) => {
              return cartItem.item.id == productId;
            });
            state.cart.cartItems[itemIndex].quantity = quantity;
          }
          if (type == "offer" && state.cart.cartOffers) {
            const offerIndex = state.cart.cartOffers.findIndex((cartOffer) => {
              return cartOffer.offer.id == productId;
            });
            state.cart.cartOffers[offerIndex].quantity = quantity;
          }
          router.push({ name: "cart" });
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
    removeItemFromCart(state, data) {
      const type = data.type;
      const type_id = data.type_id;
      cartService
        .remove(type, type_id)
        .then(() => {
          if (type == "item" && state.cart.cartItems) {
            const itemIndex = state.cart.cartItems.findIndex((item) => {
              return item.id == type_id;
            });
            state.cart.cartItems.splice(itemIndex, 1);
          }
          if (type == "offer" && state.cart.cartOffers) {
            const offerIndex = state.cart.cartOffers.findIndex((offer) => {
              return offer.id == type_id;
            });
            state.cart.cartOffers.splice(offerIndex, 1);
          }
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
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
