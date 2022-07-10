<template>
  <main>
    <div class="main-container">
      <h1>Hola {{ userData.firstname }} {{ userData.lastname }}!</h1>
      <div class="user-panel">
        <div class="user-panel-container">
          <h2>Datos de usuario:</h2>
          <button @click="changeToEditPasswordView()">
            Cambiar Contraseña
          </button>
          <button @click="changeToEditEmailView()">Cambiar Email</button>
          <button @click="changeToUserInformationView()">
            Editar Datos Personales
          </button>
          <br />

          <h2>Ver compras realizadas:</h2>
          <button @click="changeToSeePurchasesView()">Ver compras</button>
          <br />

          <h2>Eliminar usuario:</h2>
          <button @click="changeToDeleteUserView()">
            Eliminar ésta cuenta
          </button>
          <br />

          <h2>Cerrar sesión:</h2>
          <button @click="userLogout">Cerrar Sesión</button>
          <br />
        </div>

        <div class="side-panel-container">
          <div v-if="passwordChangeView">
            <h2>Cambiar contraseña</h2>
            <div class="form-container">
              <div>
                <form class="form" action="" @submit.prevent="onSubmit">
                  <br />
                  <h3>
                    Ten en cuenta que al confirmar el cambio, se cerrará tu
                    sesión y deberás logearte nuevamente con la nueva contraseña
                  </h3>
                  <br />
                  <label for="password-input">Contraseña</label>
                  <input
                    type="password"
                    name="password-input"
                    v-model="password"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes(
                          'PASSWORD_AND_NEWPASSWORD_MUST_BE_DIFFERENT'
                        )
                      "
                    >
                      La nueva contraseña debe ser diferente a la actual.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('WRONG_PASSWORD')"
                    >
                      La contraseña ingresada no es válida.
                    </label>
                  </transition>

                  <label for="new-password-input">Nueva Contraseña</label>
                  <input
                    type="password"
                    name="new-password-input"
                    v-model="newPassword"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes('PASSWORDS_MISSING: SPECIAL_CHARACTER')
                      "
                    >
                      La contraseña debe tener al menos 1 caracter especial.
                      Ejemplo: $%&/()=.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes('PASSWORDS_MISSING: LOWER_CASE_LETTER')
                      "
                    >
                      La contraseña debe tener al menos 1 letra minúscula.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes('PASSWORD_MISSING: UPPER_CASE_LETTER')
                      "
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
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('PASSWORD_MAX_LENGTH: 16')"
                    >
                      La contraseña debe tener como máximo 16 caracteres.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('PASSWORD_MIN_LENGTH: 8')"
                    >
                      La contraseña debe tener como mínimo 8 caracteres.
                    </label>
                  </transition>

                  <label for="new-password-confirmation-input"
                    >Confirmar Nueva Contraseña</label
                  >
                  <input
                    type="password"
                    name="new-password-confirmation-input"
                    v-model="newPasswordConfirmation"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes('PASSWORD_CONFIRMATION_NOT_MATCHING')
                      "
                    >
                      La nueva contraseña y la confirmación de la nueva
                      contraseña, deben conincidir.
                    </label>
                  </transition>

                  <br />
                  <div class="button-container">
                    <button @click="confirmPasswordChange()">Confirmar</button>
                    <button @click="backToMainView()">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div v-if="changeEmailView">
            <h2>Cambiar cuenta de email</h2>
            <div class="form-container">
              <div>
                <form class="form" action="" @submit.prevent="onSubmit">
                  <label for="email-input">Nuevo email</label>
                  <input type="text" name="email-input" v-model="email" />
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
                      El email debe contener como máximo 100 caracteres.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="
                        error.includes(
                          'OLDEMAIL_AND_NEWEMAIL_MUST_BE_DIFFERENT'
                        )
                      "
                    >
                      La nueva cuenta de email debe ser diferente a la anterior.
                    </label>
                  </transition>

                  <label for="email-confirmation-input"
                    >Confirmar nuevo email</label
                  >
                  <input
                    type="text"
                    name="email-confirmation-input"
                    v-model="emailChange"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('EMAIL_CONFIRMATION_NOT_MATCHING')"
                    >
                      El email no coincide con la confirmación de email.
                    </label>
                  </transition>

                  <br />
                  <div class="button-container">
                    <button @click="changeEmail()">Confirmar</button>
                    <button @click="backToMainView()">Cancelar</button>
                  </div>
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('EMAIL_CHANGE_ALREADY_IN_PROGRESS')"
                    >
                      Ya existe un cambio de email en proceso para éste usuario.
                    </label>
                  </transition>
                </form>
              </div>
            </div>
          </div>

          <div v-if="emailSentView">
            <h2>Cambiar cuenta de email</h2>
            <div class="form-container">
              <div>
                <form class="form" action="" @submit.prevent="onSubmit">
                  <h3>
                    Pronto recibirás un mail en tu nueva cuenta, para confirmar
                    el cambio.
                  </h3>
                  <h3>
                    La proxima vez que te loguees lo debera hacer con tu
                    password actual, y tu nueva cuenta de email.
                  </h3>
                  <div class="button-container">
                    <button @click="backToMainView()">Aceptar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div v-if="userInformationView">
            <h2>Editar datos personales</h2>
            <div class="form-container">
              <div>
                <form class="form" action="" @submit.prevent="onSubmit">
                  <label for="firstName-input">Nombre</label>
                  <input
                    type="text"
                    name="firstName-input"
                    v-model="firstName"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('EMPTY_FIRSTNAME_FIELD')"
                    >
                      El campo nombre se encuentra vacío.
                    </label>
                  </transition>

                  <label for="lastName-input">Apellido</label>
                  <input type="text" name="lastName-input" v-model="lastName" />
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('EMPTY_LASTNAME_FIELD')"
                    >
                      El campo apellido se encuentra vacío.
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
                      v-if="error.includes('LASTNAME_MIN_LENGTH: 3')"
                    >
                      El apellido debe tener como mínimo 3 caracteres.
                    </label>
                  </transition>

                  <label for="phone-input">Teléfono</label>
                  <input
                    type="phone"
                    name="phone-input"
                    v-model="phoneNumber"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('INVALID_PHONE_NUMBER')"
                    >
                      El teléfono ingresado es inválido. Ejemplo: 3564589725.
                    </label>
                  </transition>

                  <br />
                  <div class="button-container">
                    <button @click="changeUserData()">Confirmar</button>
                    <button @click="backToMainView()">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div v-if="purchasesView">
            <h2>Compras que has realizado:</h2>
            <ul>
              <li v-for="purchase in purchases" :key="purchase.id">
                <p>Fecha: {{ purchase.purchasedAt.split("T")[0] }}</p>
                <ul v-if="purchase.cartItems.length > 0">
                  <li v-for="product in purchase.cartItems" :key="product.id">
                    <p>
                      Producto:
                      {{ product.item.title }}
                    </p>
                    <p>Cantidad: {{ product.quantity }}</p>
                    <p>Precio: {{ product.item.priceWithDiscount }}</p>
                  </li>
                </ul>
                <ul v-if="purchase.cartOffers">
                  <li v-for="product in purchase.cartOffers" :key="product.id">
                    <p>
                      Oferta:
                      {{ product.offer.title }}
                    </p>
                    <p>Cantidad: {{ product.quantity }}</p>
                    <p>Precio: {{ product.offer.priceWithDiscount }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div v-if="deleteUserView">
            <h2>Estás seguro que deseas eliminar ésta cuenta?</h2>
            <div class="form-container">
              <div>
                <form class="form" action="" @submit.prevent="onSubmit">
                  <label for="email-input">Email</label>
                  <input type="text" name="email-input" v-model="email" />
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
                      v-if="error.includes('USER_NOT_FOUND')"
                    >
                      El usuario ingresado no está registrado.
                    </label>
                  </transition>

                  <label for="password-input">Contraseña</label>
                  <input
                    type="password"
                    name="password-input"
                    v-model="password"
                  />
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('EMPTY_PASSWORD_FIELD')"
                    >
                      El campo contraseña se encuentra vacìo.
                    </label>
                  </transition>
                  <transition>
                    <label
                      class="error-label"
                      v-if="error.includes('WRONG_PASSWORD')"
                    >
                      La contraseña ingresada no es válida.
                    </label>
                  </transition>

                  <br />
                  <div class="button-container">
                    <button @click="deleteUser()">Confirmar</button>
                    <button @click="backToMainView()">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userService from "../services/userService";
import purchasesService from "../services/purchasesService";

export default {
  data() {
    return {
      passwordChangeView: false,
      changeEmailView: false,
      emailSentView: false,
      userInformationView: false,
      purchasesView: false,
      deleteUserView: false,
      email: "",
      emailChange: "",
      password: "",
      error: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      newPassword: "",
      newPasswordConfirmation: "",
      purchases: [],
    };
  },
  computed: {
    ...mapGetters({
      userData: "getUserData",
    }),
  },
  methods: {
    ...mapActions(["logout", "clearUserData", "editUserData"]),
    userLogout() {
      this.logout();
      this.$router.push({ name: "offers" });
    },
    backToMainView() {
      this.passwordChangeView = false;
      this.userInformationView = false;
      this.changeEmailView = false;
      this.emailSentView = false;
      this.purchasesView = false;
      this.deleteUserView = false;
      this.email = "";
      this.emailChange = "";
      this.password = "";
      this.error = "";
      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";
      this.newPassword = "";
      this.newPasswordConfirmation = "";
    },
    changeToEditPasswordView() {
      this.backToMainView();
      this.passwordChangeView = true;
    },
    changeToEditEmailView() {
      this.backToMainView();
      this.changeEmailView = true;
    },
    changeToUserInformationView() {
      this.backToMainView();
      this.userInformationView = true;
    },
    changeToDeleteUserView() {
      this.backToMainView();
      this.deleteUserView = true;
    },

    confirmPasswordChange() {
      userService
        .changePassword(
          this.password,
          this.newPassword,
          this.newPasswordConfirmation
        )
        .then(() => {
          this.userLogout();
        })
        .catch((err) => {
          console.log(err);
          const statusCode = err.response.data.statusCode;
          const errorMessage = err.response.data.message;

          if (
            statusCode != 400 ||
            statusCode != 401 ||
            statusCode != 403 ||
            statusCode != 409
          ) {
            console.log(statusCode, errorMessage);
          }

          this.error = errorMessage;
        });
    },

    changeEmail() {
      userService
        .changeEmailAccount(this.email, this.emailChange)
        .then(() => {
          this.backToMainView();
          this.emailSentView = true;
        })
        .catch((err) => {
          console.log(err);
          const statusCode = err.response.data.statusCode;
          const errorMessage = err.response.data.message;

          if (statusCode != 400 || statusCode != 401) {
            console.log(statusCode, errorMessage);
          }

          this.error = errorMessage;
        });
    },

    changeUserData() {
      const firstname = this.firstName.toLowerCase();
      const lastname = this.lastName.toLowerCase();
      const phoneNumber = `+549${this.phoneNumber}`;

      userService
        .changeUserData(firstname, lastname, phoneNumber)
        .then(() => {
          this.editUserData({ firstname, lastname, phoneNumber });
          this.backToMainView();
        })
        .catch((err) => {
          console.log(err);
          const statusCode = err.response.data.statusCode;
          const errorMessage = err.response.data.message;

          if (statusCode != 400 || statusCode != 401) {
            console.log(statusCode, errorMessage);
          }
          this.error = errorMessage;
        });
    },

    deleteUser() {
      userService
        .remove(this.password, this.email)
        .then(() => {
          this.$router.push({ name: "offers" });
          localStorage.removeItem("token");
          this.clearUserData();
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

    changeToSeePurchasesView() {
      this.backToMainView();
      this.purchasesView = true;

      purchasesService
        .getUserPurchases()
        .then((res) => {
          this.purchases = res.data;
        })
        .catch((err) => {
          if (err.response.data) {
            const statusCode = err.response.data.statusCode;
            const errorMessage = err.response.data.message;
            if (statusCode != 400 || statusCode != 409) {
              console.log(statusCode, errorMessage);
            }
            this.error = errorMessage;
          } else {
            console.log(err);
          }
        });
    },
  },
};
</script>

<style scoped>
.main-container h1 {
  margin-bottom: 0.5em;
}

.user-panel {
  display: flex;
  flex-direction: row;
}

.user-panel-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-right: 50px;
}

.side-panel-container {
  width: 80%;
}

.form-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-container div {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
}

.form input {
  width: 50%;
}

.button-container {
  display: flex;
  flex-direction: row;
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
