<template>
  <main>
    <div class="main-container">
      <h1>Carrito!!!</h1>
      {{ cart }}
      <!-- poner nombre usuario -->
    </div>
  </main>
</template>

<script>
import cartService from "../services/cartService";

export default {
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
