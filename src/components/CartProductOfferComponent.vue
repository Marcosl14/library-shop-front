<template>
  <div class="wrapper">
    <div class="img-container">
      <img class="offer-img" :src="offer.offer.photo" />
    </div>
    <div class="offer-info">
      <div class="offer-text">
        <h1>{{ offerTitle }}</h1>
        <h2>{{ offerDescription }}</h2>
      </div>
      <h2>${{ offer.offer.priceWithDiscount }}</h2>
      <div v-if="offer.offer.discount > 0" class="offer-discount-container">
        <h3 class="normal-price">${{ offer.offer.price }}</h3>
        <h3 class="discount">%{{ offer.offer.discount }}</h3>
      </div>
      <h1>Cantidad: {{ offer.quantity }}</h1>
      <h1>falta poder cambiar la cantidad</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartProductOffer",
  props: {
    offer: {
      required: true,
    },
  },
  computed: {
    offerTitle() {
      const offerTitle = this.offer.offer.title;
      if (offerTitle) {
        return `${offerTitle.charAt(0).toUpperCase() + offerTitle.slice(1)}!`;
      }
      return "";
    },
    offerDescription() {
      const offerDescription = this.offer.offer.description;
      if (offerDescription) {
        return `${
          offerDescription.charAt(0).toUpperCase() + offerDescription.slice(1)
        }!`;
      }
      return "";
    },
  },
  methods: {},
};
</script>

<style scoped>
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
