<template>
  <div class="wrapper">
    <div class="img-container">
      <img class="product-img" :src="item.item.photo" />
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>{{ itemTitle }}</h1>
        <h2>{{ itemDescription }}</h2>
      </div>
      <h2>${{ item.item.priceWithDiscount }}</h2>
      <div v-if="item.item.discount > 0" class="item-discount-container">
        <h3 class="normal-price">${{ item.item.price }}</h3>
        <h3 class="discount">%{{ item.item.discount }}</h3>
      </div>
      <h1>Cantidad: {{ item.quantity }}</h1>
      <h1>falta poder cambiar la cantidad</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartProductItem",
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    itemTitle() {
      const itemTitle = this.item.item.title;
      if (itemTitle) {
        return `${itemTitle.charAt(0).toUpperCase() + itemTitle.slice(1)}!`;
      }
      return "";
    },
    itemDescription() {
      const itemDescription = this.item.item.description;
      if (itemDescription) {
        return `${
          itemDescription.charAt(0).toUpperCase() + itemDescription.slice(1)
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
