<template>
  <main>
    <div class="offer-items-container">
      <OfferItem v-for="offer in offers" :key="offer.id" :offer="offer" />
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
.offer-items-container {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
