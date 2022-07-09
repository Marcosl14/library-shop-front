<template>
  <main>
    <div class="main-container">
      <h1>Carrito!!!</h1>
      <div v-if="cartContainsProducts" class="product-items-container">
        <ProductComponent
          v-for="cartItem in cart.cartItems"
          :key="cartItem.item.id"
          :product="cartItem.item"
          :cartProductId="cartItem.id"
          :quantityEnabled="true"
          :deleteEnabled="true"
          :buyEnabled="false"
          :currentQuantity="parseInt(cartItem.quantity) || 1"
          :type="'item'"
        />
        <ProductComponent
          v-for="cartOffer in cart.cartOffers"
          :key="cartOffer.offer.id"
          :product="cartOffer.offer"
          :cartProductId="cartOffer.id"
          :quantityEnabled="true"
          :deleteEnabled="true"
          :buyEnabled="false"
          :currentQuantity="parseInt(cartOffer.quantity) || 1"
          :type="'offer'"
        />
      </div>
      <div v-else class="product-items-container">
        <h3>El carrito se encuentra vacío</h3>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import ProductComponent from "../components/ProductComponent.vue";

export default {
  components: { ProductComponent },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      userExists: "userExists",
    }),
    cartContainsProducts() {
      if (this.cart && this.cart.cartItems && this.cart.cartOffers) {
        return (
          this.cart.cartItems.length > 0 || this.cart.cartOffers.length > 0
        );
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(["setCart"]),
  },
  created: function () {
    this.setCart();
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
