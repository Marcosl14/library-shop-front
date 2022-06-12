import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import ContactView from "../views/ContactView.vue";
import UserView from "../views/UserView.vue";
import LogInView from "../views/LogInView.vue";
import CartView from "../views/CartView.vue";
import RegisterView from "../views/RegisterView.vue";
import ConfirmRegistration from "../views/ConfirmRegistration.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "offers",
      component: HomeView,
    },
    {
      path: "/productos",
      name: "products",
      component: ProductsView,
    },
    {
      path: "/contacto",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/usuario",
      name: "user",
      component: UserView,
    },
    {
      path: "/iniciar-sesion",
      name: "log-in",
      component: LogInView,
    },
    {
      path: "/carrito",
      name: "cart",
      component: CartView,
    },
    {
      path: "/registro-nuevo-usuario",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/confirmar/:id",
      name: "confirm-registration",
      component: ConfirmRegistration,
    },
    // {
    //   path: "/productos",
    //   name: "products",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/ProductsView.vue"),
    // },
  ],
});

export default router;
