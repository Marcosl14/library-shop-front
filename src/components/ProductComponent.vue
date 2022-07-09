<template>
  <div class="wrapper">
    <div class="img-container">
      <img class="product-img" :src="product.photo" />
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>{{ productTitle }}</h1>
        <h2>{{ productDescription }}</h2>
      </div>
      <h2>${{ product.priceWithDiscount }}</h2>
      <div v-if="product.discount > 0" class="product-discount-container">
        <h3 class="normal-price">${{ product.price }}</h3>
        <h3 class="discount">%{{ product.discount }}</h3>
      </div>

      <div v-if="quantityEnabled" class="quantity-container">
        <h3>Cantidad:</h3>
        <input
          type="number"
          name="quantity"
          v-model="quantity"
          min="1"
          @keypress="blockChars($event)"
        />
        <button type="button" @click="addQuantity()">+</button>
        <button
          type="button"
          @click="substractQuantity()"
          :disabled="quantity <= 1"
        >
          -
        </button>
      </div>

      <div v-if="deleteEnabled" class="product-price-btn">
        <button type="button" @click="removeFromCart()">Eliminar</button>
      </div>

      <div v-if="buyEnabled && quantityEnabled" class="product-price-btn">
        <button type="button" @click="addToCart()">Comprar</button>
      </div>

      <div v-if="buyEnabled && !quantityEnabled" class="product-price-btn">
        <button type="button" @click="buy()">Comprar</button>
      </div>

      <div v-if="!buyEnabled && quantityEnabled" class="product-price-btn">
        <button type="button" @click="buy()">Ver Producto</button>
      </div>
    </div>
    <div v-if="type == 'offer'" class="product-elements">
      <h2>Ésta oferta consiste en:</h2>
      <ul>
        <li v-for="offerItem in product.offerItems" :key="offerItem.id">
          {{ offerItem.quantity }} unidades de {{ offerItem.item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cartService from "../services/cartService";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "ProductComponent",
  data() {
    return {
      error: "",
      quantity: this.currentQuantity,
    };
  },
  props: {
    product: {
      required: true,
    },
    cartProductId: {
      type: String,
      required: false,
    },
    quantityEnabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    deleteEnabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    buyEnabled: {
      type: Boolean,
      default: true,
      required: false,
    },
    currentQuantity: {
      type: Number,
      default: 1,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      userExists: "userExists",
    }),
    productTitle() {
      const productTitle = this.product.title;
      if (productTitle) {
        return `${
          productTitle.charAt(0).toUpperCase() + productTitle.slice(1)
        }!`;
      }
      return "";
    },
    productDescription() {
      const productDescription = this.product.description;
      if (productDescription) {
        return `${
          productDescription.charAt(0).toUpperCase() +
          productDescription.slice(1)
        }!`;
      }
      return "";
    },
  },
  methods: {
    ...mapMutations(["removeItemFromCart"]),
    buy() {
      if (this.type == "offer") {
        this.$router.push(`/oferta/${this.product.id}/${this.quantity}`);
      }
      if (this.type == "item") {
        this.$router.push(`/producto/${this.product.id}/${this.quantity}`);
      }
    },
    addToCart() {
      if (this.userExists) {
        if (this.quantity > 0) {
          cartService
            .add(this.type, parseInt(this.product.id), parseInt(this.quantity))
            .then(() => {
              this.$router.push({ name: "cart" });
            })
            .catch((err) => {
              console.log(
                err.response.data.statusCode,
                err.response.data.message
              );
              this.error = err.response.data.message;
            });
        } else {
          this.quantity = 1;
        }
      } else {
        this.$router.push({ name: "log-in" });
      }
    },
    removeFromCart() {
      const type = this.type;
      const type_id = parseInt(this.cartProductId);
      this.removeItemFromCart({ type, type_id });
    },
    blockChars(event) {
      event = event ? event : window.event;
      var charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      }
    },
    addQuantity() {
      this.quantity++;
    },
    substractQuantity() {
      this.quantity--;
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

.product-img {
  height: 100%;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.product-info {
  width: 40%;
  margin-left: 0.5em;
  margin-right: 1em;
}

.product-discount-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.product-discount-container h3:first-of-type {
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* 
.product-img {
  float: left;
  height: 420px;
  width: 327px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 300px;
  width: 327px;
}

.product-text h1 {
  margin: 0 0 0 38px;
  padding-top: 52px;
  font-size: 34px;
  color: #474747;
}

.product-text h1,
.product-price-btn p {
  font-family: "Bentham", serif;
}

.product-text h2 {
  margin: 0 0 47px 38px;
  font-size: 13px;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #d2d2d2;
  letter-spacing: 0.2em;
}

.product-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: "Playfair Display", serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
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

.product-price-btn button {
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

.product-price-btn button:hover {
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
