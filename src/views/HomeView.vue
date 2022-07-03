<template>
  <main>
    <div class="main-container">
      <h1>Combos en oferta!!!</h1>
      <div class="offer-items-container">
        <ProductComponent
          v-for="offer in offers"
          :key="offer.id"
          :product="offer"
          :type="'offer'"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ProductComponent from "../components/ProductComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductComponent,
  },
  computed: {
    ...mapGetters({
      offers: "getOffers",
    }),
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.offer-items-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
