<template>
  <main>
    <div class="main-container">
      <div v-if="confirmed">
        <h1>Tu cuenta de Email ha sido validada correctamente!!!</h1>
        <button @click="backToLogin">Iniciar sesión</button>
      </div>

      <h1 v-if="error == 'EMAIL_CHANGE_ALREADY_CONFIRMED'">
        Este cambio de email ya ha sido confirmado!!!
      </h1>

      <h1 v-if="error == 'EMAIL_CHANGE_NOT_VALID'">
        El cambio de email no es válido
      </h1>

      <h1 v-if="error == 'EMPTY_REGISTRATION_IDENTIFIER'">
        No se encuentra el código de validación
      </h1>

      <h1 v-if="error == 'VALUE_IS_NOT_UUID'">
        El código de validación ingresado no es válido
      </h1>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import userService from "../services/userService";

export default {
  data() {
    return {
      confirmed: false,
      error: "",
    };
  },
  methods: {
    ...mapActions(["logout"]),
    check() {
      userService
        .confirmEmailChange(this.$route.params.id)
        .then(() => {
          this.logout();
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
