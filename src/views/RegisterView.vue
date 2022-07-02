<template>
  <main>
    <div class="main-container">
      <h1>Registro!!!</h1>
      <div class="form-container" v-if="!confirmed">
        <div>
          <form class="form" action="" @submit.prevent="onSubmit">
            <label for="firstname-input">Nombre</label>
            <input type="text" name="firstname-input" v-model="firstname" />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('FIRSTNAME_MIN_LENGTH: 3')"
              >
                El nombre debe tener al menos 3 caracteres.
              </label>
            </transition>
            <transition
              ><label
                class="error-label"
                v-if="error.includes('FIRSTNAME_MAX_LENGTH: 16')"
              >
                El nombre debe tener como máximo 16 caracteres.
              </label>
            </transition>
            <transition>
              <label
                class="error-label"
                v-if="error.includes('FIRSTNAME_MUST_BE_STRING')"
              >
                Nombre no válido.
              </label>
            </transition>

            <label for="lastname-input">Apellido</label>
            <input type="text" name="lastname-input" v-model="lastname" />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('LASTNAME_MIN_LENGTH: 3')"
              >
                El apellido debe tener al menos 3 caracteres.
              </label>
            </transition>
            <transition>
              <label
                class="error-label"
                v-if="error.includes('LASTNAME_MAX_LENGTH: 16')"
              >
                El apellido debe tener como máximo 16 caracteres.
              </label>
            </transition>
            <transition>
              <label
                class="error-label"
                v-if="error.includes('LASTNAME_MUST_BE_STRING')"
              >
                Apellido no válido.
              </label>
            </transition>

            <label for="phone-input">Numero de Teléfono</label>
            <input type="number" name="phone-input" v-model="phone" />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('INVALID_PHONE_NUMBER')"
              >
                El número telefónico no es válido. Ejemplo: 3564589725.
              </label>
            </transition>

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

            <label for="password-input">Contraseña</label>
            <input type="password" name="password-input" v-model="password" />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('PASSWORDS_MISSING: SPECIAL_CHARACTER')"
              >
                La contraseña debe tener al menos 1 caracter especial. Ejemplo:
                $%&/()=.
              </label>
            </transition>
            <transition
              ><label
                class="error-label"
                v-if="error.includes('PASSWORDS_MISSING: LOWER_CASE_LETTER')"
              >
                La contraseña debe tener al menos 1 letra minúscula.
              </label>
            </transition>
            <transition
              ><label
                class="error-label"
                v-if="error.includes('PASSWORD_MISSING: UPPER_CASE_LETTER')"
              >
                La contraseña debe tener al menos 1 letra mayúscula.
              </label>
            </transition>

            <transition>
              <label
                class="error-label"
                v-if="error.includes('PASSWORD_MISSING: NUMBER')"
              >
                La contraseña debe tener al menos 1 número.
              </label>
            </transition>

            <transition
              ><label
                class="error-label"
                v-if="error.includes('PASSWORD_MAX_LENGTH: 16')"
              >
                La contraseña debe tener como máximo 16 caracteres.
              </label>
            </transition>

            <transition
              ><label
                class="error-label"
                v-if="error.includes('PASSWORD_MIN_LENGTH: 8')"
              >
                La contraseña debe tener como mínimo 8 caracteres.
              </label>
            </transition>

            <label for="password-confirmation-input">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="password-confirmation-input"
              v-model="passwordConfirmation"
            />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('PASSWORD_CONFIRMATION_NOT_MATCHING')"
              >
                La contraseña y la confirmación de la misma, no coinciden.
              </label>
            </transition>

            <br />
            <input type="submit" value="Registrarme!" @click="senddata()" />

            <br />
            <transition>
              <label
                class="error-label"
                v-if="error.includes('USER_ALREADY_REGISTERED')"
                >El usuario ya existe.
              </label>
            </transition>
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
