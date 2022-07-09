<template>
  <main>
    <div class="main-container">
      <h1>Comprar éste producto !!!</h1>
      <div class="product-items-container">
        <ProductComponent
          :product="item"
          :quantityEnabled="true"
          :currentQuantity="quantity"
          :type="'item'"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ProductComponent from "../components/ProductComponent.vue";
import itemService from "../services/itemsService";

export default {
  components: {
    ProductComponent,
  },
  data() {
    return {
      item: {},
      quantity: 1,
    };
  },
  methods: {
    findProduct() {
      itemService
        .getOne(this.$route.params.id)
        .then((res) => {
          this.item = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
  },
  created: function () {
    this.findProduct();
    this.quantity = parseInt(this.$route.params.quantity) || 1;
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

.wrapper {
  display: flex;
  flex-direction: row;

  height: 350px;
  width: 100%;
  border-radius: var(--border-radius);

  margin-bottom: 1rem;

  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.img-container {
  width: 350px;
}

.product-img {
  height: 100%;

  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.product-info {
  margin-left: 0.5em;
}

.item-discount-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.item-discount-container h3:first-of-type {
  margin-right: 10px;
}

.normal-price {
  color: var(--color-brown);
  text-decoration: line-through;
}

.discount {
  color: var(--color-black);
  background-color: var(--color-green);
}
</style>
