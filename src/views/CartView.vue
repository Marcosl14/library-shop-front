<template>
  <main>
    <div class="main-container">
      <h1>Carrito!!!</h1>
      <div
        v-if="cartContainsProducts && !purchaseOK && !confirmPurchase"
        class="product-items-container"
      >
        <button @click="confirmPurchase = true">Comprar Carrito</button>
        <ProductComponent
          v-for="cartItem in cart.cartItems"
          :key="cartItem.item.id"
          :product="cartItem.item"
          :cartProductId="cartItem.id"
          :quantityEnabled="true"
          :buyEnabled="false"
          :currentQuantity="parseInt(cartItem.quantity) || 1"
          :type="'item'"
        />
        <ProductComponent
          v-for="cartOffer in cart.cartOffers"
          :key="cartOffer.offer.id"
          :product="cartOffer.offer"
          :cartProductId="cartOffer.id"
          :quantityEnabled="true"
          :buyEnabled="false"
          :currentQuantity="parseInt(cartOffer.quantity) || 1"
          :type="'offer'"
        />
        <button @click="confirmPurchase = true">Comprar Carrito</button>
      </div>
      <div v-if="confirmPurchase">
        <h3>Está seguro que desea confirmar la compra del carrito?</h3>
        <h4>
          Ni bien recibamos los detalles de la compra, nos estaremos comunicando
          con vos para informate cuándo tengamos listo y pedido y los métodos de
          pago.
        </h4>
        <button @click="purchaseThisCart()">Aceptar</button>
        <button @click="confirmPurchase = false">Cancelar</button>
      </div>
      <div v-if="purchaseOK">
        <h3>
          Muchas gracias por tu compra!. Pronto nos comunicaremos contigo!.
        </h3>
      </div>
      <div
        v-if="!cartContainsProducts && !purchaseOK"
        class="product-items-container"
      >
        <h3>El carrito se encuentra vacío</h3>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import ProductComponent from "../components/ProductComponent.vue";

import purchaseService from "../services/purchaseService";

export default {
  components: { ProductComponent },
  data() {
    return {
      error: "",
      purchaseOK: false,
      confirmPurchase: false,
    };
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      userExists: "userExists",
    }),
    cartContainsProducts() {
      if (this.cart && this.cart.cartItems && this.cart.cartOffers) {
        return (
          this.cart.cartItems.length > 0 || this.cart.cartOffers.length > 0
        );
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(["setCart", "purchaseCart"]),
    ...mapActions(["clearCart"]),
    purchaseThisCart() {
      purchaseService
        .purchaseCart()
        .then(() => {
          this.clearCart();
          this.purchaseOK = true;
          this.confirmPurchase = false;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
    goToConfirmPurchase() {
      this.confirmPurchase = true;
    },
  },
  created: function () {
    this.setCart();
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
