<template>
  <main>
    <div class="main-container">
      <h1>Productos!!!</h1>
      <div class="product-items-container">
        <ProductItem v-for="item in items.items" :key="item.id" :item="item" />
        <!-- comment: falta el paginado -->
        <!-- comment: falta el tachar el precio del producto y poner el precio nuevo con descuento-->
        <!-- falta filtrar por categorias -->
      </div>
    </div>
  </main>
</template>

<script>
import ProductItem from "../components/ProductItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductItem,
  },
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
