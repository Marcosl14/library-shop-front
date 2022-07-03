<template>
  <main>
    <div class="main-container">
      <h1>Productos!!!</h1>
      <div class="secondary-container">
        <div class="side-panel-container">
          <button @click="removeFilters()">Eliminar filtros</button>
          <br />
          <h3>Paginas:</h3>
          <div class="pages-container">
            <button :disabled="disabledReduceButton" @click="reducePage">
              -
            </button>
            <p>{{ items.meta.currentPage }}</p>
            <button :disabled="disabledIncreaseButton" @click="increasePage">
              +
            </button>
            <p>de {{ items.meta.totalPages }} páginas</p>
          </div>
          <br />
          <h3>Ordenar por:</h3>
          <select name="orderBy" v-model="orderBy" @change="setItemsFiltered()">
            <option value="title">Nombre</option>
            <option value="description">Descripción</option>
            <option value="brand">Marca</option>
          </select>
          <select name="orderBy" v-model="dir" @change="setItemsFiltered()">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <br />
          <h3>Categorias:</h3>
          <div class="categories-panel">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="product-items-container">
          <ProductComponent
            v-for="item in items.items"
            :key="item.id"
            :product="item"
            :type="'item'"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductComponent from "../components/ProductComponent.vue";
import { mapGetters, mapMutations } from "vuex";

const DEFAULT_ORDER_BY = "title";
const DEFAULT_DIR = "asc";
const DEFAULT_PAGE = 1;

export default {
  components: {
    ProductComponent,
  },
  data() {
    return {
      selectedCategory: "",
      orderBy: DEFAULT_ORDER_BY,
      dir: DEFAULT_DIR,
      page: DEFAULT_PAGE,
    };
  },
  computed: {
    ...mapGetters({
      items: "getItems",
      categories: "getCategories",
    }),
    disabledReduceButton() {
      if (this.page > 1) {
        return false;
      }
      return true;
    },
    disabledIncreaseButton() {
      if (this.page < this.items.meta.totalPages) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapMutations(["setItems", "setCategories", "setFilteredItems"]),
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.page = DEFAULT_PAGE;
      this.setItemsFiltered();
    },
    removeFilters() {
      this.selectedCategory = "";
      this.orderBy = DEFAULT_ORDER_BY;
      this.dir = DEFAULT_DIR;
      this.page = 1;
      this.setItems();
    },
    setItemsFiltered() {
      this.setFilteredItems({
        categoryId: this.selectedCategory,
        orderBy: this.orderBy,
        dir: this.dir,
        page: this.page,
      });
    },
    reducePage() {
      if (this.page > 1) {
        this.page--;
        this.setItemsFiltered();
      }
    },
    increasePage() {
      if (this.page < this.items.meta.totalPages) {
        this.page++;
        this.setItemsFiltered();
      }
    },
  },
  created: function () {
    this.setItems();
    this.setCategories();
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.secondary-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.side-panel-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-right: 20px;
}

.categories-panel {
  display: flex;
  flex-direction: column;
}

.pages-container {
  display: flex;
  flex-direction: row;
}

.product-items-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 85%;
}
</style>
