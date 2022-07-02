<template>
  <main>
    <div class="main-container">
      <h1>Pepe !!!</h1>
      <div class="product-offers-container">
        <div class="wrapper">
          <div class="img-container">
            <img class="offer-img" :src="offer.photo" />
          </div>
          <div class="offer-info">
            <div class="offer-text">
              <h1>{{ offerTitle }}</h1>
              <h2>{{ offerDescription }}</h2>
            </div>
            <div class="offer-price-btn">
              <h3>{{ offer.priceWithDiscount }}$</h3>
              <button type="button" @click="addToCart()">Comprar</button>
            </div>
            <h1>falta incrementar cantidad de unidades a comprar</h1>
            <h1>falta tachar el precio</h1>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import offerService from "../services/offersService";
import cartService from "../services/cartService";

const TYPE = "offer";

export default {
  data() {
    return {
      error: "",
      offer: {},
      quantity: 1,
    };
  },
  computed: {
    offerTitle() {
      const offerTitle = this.offer.title;
      if (offerTitle) {
        return `${offerTitle.charAt(0).toUpperCase() + offerTitle.slice(1)}!`;
      }
      return "";
    },
    offerDescription() {
      const offerDescription = this.offer.description;
      if (offerDescription) {
        return `${
          offerDescription.charAt(0).toUpperCase() + offerDescription.slice(1)
        }!`;
      }
      return "";
    },
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
    addToCart() {
      cartService
        .add(TYPE, parseInt(this.offer.id), parseInt(this.quantity))
        .then(() => {
          this.$router.push({ name: "cart" });
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
  },
  created: function () {
    this.findProduct();
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
  margin-left: 0.5em;
}
</style>
