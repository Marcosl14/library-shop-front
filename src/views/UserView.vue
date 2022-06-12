<template>
  <main>
    <div class="main-container">
      <h1>Usuario!!!</h1>
      <button @click="userLogout">Cerrar Sesión</button>
      <!-- poner nombre usuario -->
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    userLogout() {
      this.logout();
      this.$router.push({ name: "offers" });
    },
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
