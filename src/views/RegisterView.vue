<template>
  <main>
    <div class="main-container">
      <h1>Registro!!!</h1>
      <div class="form-container" v-if="!confirmed">
        <div>
          <form class="form" action="" @submit.prevent="onSubmit">
            <label for="firstname-input">Nombre</label>
            <input type="text" name="firstname-input" v-model="firstname" />

            <label for="lastname-input">Apellido</label>
            <input type="text" name="lastname-input" v-model="lastname" />

            <label for="phone-input">Numero de Teléfono</label>
            <input type="number" name="phone-input" v-model="phone" />

            <label for="email-input">Email</label>
            <input type="email" name="email-input" v-model="email" />

            <label for="password-input">Contraseña</label>
            <input type="password" name="password-input" v-model="password" />

            <label for="password-confirmation-input"
              >Confirmar Contraseña</label
            >
            <input
              type="password"
              name="password-confirmation-input"
              v-model="passwordConfirmation"
            />

            <br />
            <input type="submit" value="Registrarme!" @click="senddata()" />
          </form>
        </div>
        <div>
          <h3>Al registrarte podrás acceder a:</h3>
          <!-- completar -->
        </div>
      </div>
      <div class="register-container" v-else>
        <h1>Fuiste registrad@ como usuari@!</h1>
        <h1>Pronto te llegará un mail para confirmar tu registro!!!</h1>
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
      passwordConfirmation: "",
      firstname: "",
      lastname: "",
      phone: "",
      error: "",
      confirmed: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    senddata() {
      // faltan validaciones y habilitar el boton solo cuando todo OK.
      // faltan definir los errores, por ejemplo si el ususario ya existe, o cosas así...

      const phoneNumber = `+549${this.phone}`;
      userService
        .register(
          this.email,
          this.password,
          this.passwordConfirmation,
          this.firstname.toLowerCase(),
          this.lastname.toLowerCase(),
          phoneNumber
        )
        .then(() => {
          this.confirmed = true;
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

.register-container {
  display: flex;
  flex-direction: column;
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
