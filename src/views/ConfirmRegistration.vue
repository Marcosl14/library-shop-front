<template>
  <main>
    <div class="main-container">
      <div v-if="confirmed">
        <h1>Has sido registrad@ correctamente!!!</h1>
        <button @click="backToLogin">Iniciar sesión</button>
      </div>

      <h1 v-if="error == 'USER_ALREADY_REGISTERED'">
        Este usuari@ ya ha sido registrad@!!!
      </h1>

      <h1 v-if="error == 'WRONG_REGISTRY_UUID'">
        El código de registro ha caducado...
      </h1>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import userService from "../services/userService";

export default {
  data() {
    return {
      confirmed: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
  },
  methods: {
    check() {
      userService
        .confirmRegistration(this.$route.params.id)
        .then(() => {
          this.confirmed = true;
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
    backToLogin() {
      this.$router.push({ name: "log-in" });
    },
  },
  created: function () {
    this.check();
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
