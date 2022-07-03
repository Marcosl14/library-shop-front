<template>
  <main>
    <div class="main-container">
      <h1>Pepe !!!</h1>
      <div class="product-items-container">
        <div class="wrapper">
          <div class="img-container">
            <img class="product-img" :src="item.photo" />
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>{{ itemTitle }}</h1>
              <h2>{{ itemDescription }}</h2>
            </div>
            <div class="product-price-btn">
              <h2>${{ item.priceWithDiscount }}</h2>
              <div v-if="item.discount > 0" class="item-discount-container">
                <h3 class="normal-price">${{ item.price }}</h3>
                <h3 class="discount">%{{ item.discount }}</h3>
              </div>
              <button type="button" @click="addToCart()">Comprar</button>
            </div>
            <h1>falta incrementar cantidad de unidades a comprar</h1>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import itemService from "../services/itemsService";
import cartService from "../services/cartService";

const TYPE = "item";

export default {
  data() {
    return {
      error: "",
      item: {},
      quantity: 1,
    };
  },
  computed: {
    itemTitle() {
      const itemTitle = this.item.title;
      if (itemTitle) {
        return `${itemTitle.charAt(0).toUpperCase() + itemTitle.slice(1)}!`;
      }
      return "";
    },
    itemDescription() {
      const itemDescription = this.item.description;
      if (itemDescription) {
        return `${
          itemDescription.charAt(0).toUpperCase() + itemDescription.slice(1)
        }!`;
      }
      return "";
    },
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
    addToCart() {
      cartService
        .add(TYPE, parseInt(this.item.id), parseInt(this.quantity))
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
