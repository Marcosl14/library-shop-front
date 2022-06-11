<template>
  <main>
    <div class="main-container">
      <h1>Usuario!!!</h1>
      <!-- poner nombre usuario -->
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
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
