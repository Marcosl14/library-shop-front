<template>
  <main>
    <div class="main-container">
      <h1>Iniciar Sesión!!!</h1>
      <div class="form-container">
        <div>
          <form class="form" action="" @submit.prevent="onSubmit">
            <label for="email-input">Email</label>
            <input type="text" name="email-input" v-model="email" />
            <label for="password-input">Contraseña</label>
            <input type="password" name="password-input" v-model="password" />
            <br />
            <input type="submit" value="Iniciar Sesión" @click="senddata()" />

            <label v-if="error == 'WRONG_PASSWORD'"
              >La contraseña ingresada es incorrecta
            </label>
          </form>
        </div>
        <div>
          <h3>O si todavìa no estás registrado:</h3>
          <RouterLink to="/registro-nuevo-usuario">Registrarse</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import userService from "../services/userService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    senddata() {
      // faltan validaciones y habilitar el boton solo cuando todo OK.
      // faltan definir los errores, por ejemplo si el ususario no existe, o cosas así...

      userService
        .login(this.email, this.password)
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          this.login({ email: this.email, password: this.password });
          this.$router.push({ name: "offers" });
        })
        .catch((err) => {
          console.log(err.response.data.statusCode, err.response.data.message);
          this.error = err.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.form-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-container div {
  width: 50%;
}

.form {
  display: flex;
  flex-direction: column;
}

.form input {
  width: 50%;
}
</style>
