<template>
  <main>
    <div class="main-container">
      <h1>Carrito!!!</h1>
      <div class="product-items-container">
        <CartProductItem
          v-for="item in cart.cartItems"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="product-items-container">
        <CartProductOffer
          v-for="offer in cart.cartOffers"
          :key="offer.id"
          :offer="offer"
        />
      </div>
    </div>
  </main>
</template>

<script>
import cartService from "../services/cartService";
import CartProductItem from "../components/CartProductItemComponent.vue";
import CartProductOffer from "../components/CartProductOfferComponent.vue";

export default {
  components: { CartProductItem, CartProductOffer },
  data() {
    return {
      error: "",
      cart: [],
    };
  },
  methods: {
    getCart() {
      cartService
        .getCurrentCart()
        .then((res) => {
          this.cart = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
  },
  created: function () {
    this.getCart();
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.product-items-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
