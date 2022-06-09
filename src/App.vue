<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/pepe">Contactos</RouterLink>
      </nav>
    </div>
    <div>
      <nav>
        <RouterLink to="/otro">{{ userName }}</RouterLink>
        <!-- acá va a ir el carrito -->
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  methods: {
    ...mapMutations(["setItems", "setOffers", "setUserData"]),
  },
  computed: {
    ...mapGetters({
      userData: "getUserData",
    }),
    userName() {
      const firstname = this.userData.firstname;
      if (firstname) {
        return `Bienvenido ${
          firstname.charAt(0).toUpperCase() + firstname.slice(1)
        }!`;
      }
      return "";
    },
  },
  created: function () {
    this.setItems();
    this.setOffers();
    this.setUserData();
  },
};
</script>

<style>
@import "@/assets/base.css";

#app {
  margin: 0 auto;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: var(--color-black);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    border-color: var(--color-green);
    background-color: var(--color-green);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  border-color: var(--color-pink);
  background-color: var(--color-pink);
}

nav a {
  display: inline-block;

  margin-right: 0.5rem;
  padding: 0.5rem 0.5rem;

  border-style: solid;
  border-width: 1px;
  border-color: var(--color-black);
  border-radius: 5px;
}

nav div {
  height: 100%;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px;
    padding: 0px;
  }

  #app {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100vw;
  }

  header {
    display: flex;
    flex-direction: row;
    place-items: center;
    justify-content: space-between;

    width: 100vw;
    padding: 0.5rem 1rem;
  }

  header div:last-of-type {
    margin-right: 1em;
  }

  main {
    width: 100vw;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    margin-top: 0;

    display: flex;
    flex-direction: row;
  }
}
</style>
