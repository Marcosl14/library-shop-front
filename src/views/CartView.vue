<template>
  <main>
    <div class="main-container">
      <h1>Carrito!!!</h1>
      <div class="product-items-container">
        <ProductComponent
          v-for="cartItem in cart.cartItems"
          :key="cartItem.item.id"
          :product="cartItem.item"
          :cartProductId="cartItem.id"
          :quantityEnabled="true"
          :deleteEnabled="true"
          :buyEnabled="false"
          :currentQuantity="cartItem.quantity"
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
          :currentQuantity="cartOffer.quantity"
          :type="'offer'"
        />
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
    }),
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
