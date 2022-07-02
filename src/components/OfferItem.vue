<template>
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
        <button type="button" @click="buy(offer.id)">Comprar</button>
      </div>
      <h1>falta tachar el precio</h1>
    </div>
  </div>
  <!-- <p>{{ offer }}</p> -->
  <!-- <br /> -->
</template>

<script>
export default {
  name: "OfferItem",
  props: {
    offer: {
      required: true,
    },
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
    buy(id) {
      this.$router.push(`/oferta/${id}`);
    },
  },
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

/* 
.offer-img {
  float: left;
  height: 420px;
  width: 327px;
}

.offer-img img {
  border-radius: 7px 0 0 7px;
}

.offer-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.offer-text {
  height: 300px;
  width: 327px;
}

.offer-text h1 {
  margin: 0 0 0 38px;
  padding-top: 52px;
  font-size: 34px;
  color: #474747;
}

.offer-text h1,
.offer-price-btn p {
  font-family: "Bentham", serif;
}

.offer-text h2 {
  margin: 0 0 47px 38px;
  font-size: 13px;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #d2d2d2;
  letter-spacing: 0.2em;
}

.offer-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: "Playfair Display", serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.offer-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.offer-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: "Trocchi", serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 50px;
  font-family: "Suranna", serif;
  font-size: 34px;
}

.offer-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 176px;
  margin: 0 40px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9cebd5;
  cursor: pointer;
  outline: none;
}

.offer-price-btn button:hover {
  background-color: #79b0a1;
} */

/* .item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
} */
</style>
