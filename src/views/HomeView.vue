<template>
  <main>
    <div class="main-container">
      <h1>Combos en oferta!!!</h1>
      <div class="offer-items-container">
        <OfferItem v-for="offer in offers" :key="offer.id" :offer="offer" />
        <!-- comment: falta el tachar el precio del producto y poner el precio nuevo con descuento-->
      </div>
    </div>
  </main>
</template>

<script>
// import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import OfferItem from "../components/OfferItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    OfferItem,
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
