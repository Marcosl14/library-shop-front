<template>
  <main>
    <div class="main-container">
      <h1>Comprar ésta oferta !!!</h1>
      <div class="product-offers-container">
        <ProductComponent
          :product="offer"
          :quantityEnabled="true"
          :currentQuantity="quantity"
          :type="'offer'"
        />
      </div>
    </div>
  </main>
</template>

<script>
import offerService from "../services/offersService";
import ProductComponent from "../components/ProductComponent.vue";

export default {
  components: {
    ProductComponent,
  },
  data() {
    return {
      offer: {},
      quantity: 1,
    };
  },
  methods: {
    findProduct() {
      offerService
        .getOne(this.$route.params.id)
        .then((res) => {
          this.offer = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
  },
  created: function () {
    this.findProduct();
    this.quantity = this.$route.params.quantity;
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.product-offers-container {
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

.offer-img {
  height: 100%;

  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.offer-info {
  width: 40%;
  margin-left: 0.5em;
  margin-right: 1em;
}

.offer-discount-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.offer-discount-container h3:first-of-type {
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
