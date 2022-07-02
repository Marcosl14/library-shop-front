<template>
  <main>
    <div class="main-container">
      <h1>Recuperar Contraseña!!!</h1>
      <div class="form-container" v-if="!confirmed">
        <div>
          <form class="form" action="" @submit.prevent="onSubmit">
            <label for="email-input">Email</label>
            <input type="email" name="email-input" v-model="email" />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('EMAIL_NOT_VALID')"
              >
                El email ingresado no es válido.
              </label>
            </transition>
            <transition>
              <label
                class="error-label"
                v-if="error.includes('EMAIL_MAX_LENGTH: 100')"
              >
                El email ingresado no es válido.
              </label>
            </transition>

            <br />
            <input type="submit" value="Registrarme!" @click="senddata()" />
          </form>
        </div>
      </div>
      <div class="register-container" v-else>
        <h1>Pronto te llegará un mail con una nueva contraseña!!!</h1>
        <h2>La necesitarás para iniciar sesión</h2>
        <h2>
          Si deseas modificar ésta contraseña, luego de iniciar sesión deberás
          ir al panel de usuario -> Cambiar Contraseña
        </h2>
      </div>
    </div>
  </main>
</template>

<script>
import userService from "../services/userService";

export default {
  data() {
    return {
      email: "",
      error: "",
      confirmed: false,
    };
  },
  methods: {
    senddata() {
      userService
        .passwordForgotten(this.email)
        .then(() => {
          this.confirmed = true;
        })
        .catch((err) => {
          const statusCode = err.response.data.statusCode;
          const errorMessage = err.response.data.message;
          if (statusCode != 400 || statusCode != 409) {
            console.log(statusCode, errorMessage);
          }
          this.error = errorMessage;
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

.error-label {
  color: var(--color-red);
}

.v-enter-from {
  transform: translateX(-200px);
  opacity: 0;
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-from {
  opacity: 1;
}

.v-leave-active {
  transition: all 0.5s ease-in;
}

.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
