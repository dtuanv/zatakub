import { route } from "quasar/wrappers";
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
  // console.log("Store",store)
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
// console.log("Store ",store )
  console.log("storin route", store.state.loginModule.loggedIn)
  // console.log("storin route Roleeeee", store.state.loginModule.role)
  // console.log("storin role route", store.state.cache)

  // the vue router defines all of the routes for the application,
  //  and contains a function that runs before each route change
  //   to prevent unauthenticated users from accessing restricted routes.

            // test

  Router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = [
      "/",
      "/aboutMe",
      "/loginPage",
      "/product",
      "/reservation",
      "/contact",
      "/thank",
      "/register",
      "/impressung",
      "/datenschutzErklaerung",
      "/onlyAdmin/createNewUser",
      "/shopping",
      "/deliveryStatus",
    ];
    const authRequired = !publicPages.includes(to.path);
    // const loggedIn = localStorage.getItem("user");
    // const tokenLocal = localStorage.getItem("onlyAdmin");

    if (
      authRequired && !store.state.loginModule.loggedIn )
     {
      return next("/loginPage");
    }
    // if (
    //   authRequired &&
    //   tokenLocal != "sdhushfuihdufhsidiasjdjsakd???=*ÄÖLkksaijd.s"
    // ) {
    //   return next("/loginPage");
    // }
    // if (authRequired && !loggedIn) {
    //   if (tokenLocal !== 1) {
    //     return next("/loginPage");
    //   }
    // }
    // if (authRequired && !loggedIn && token !== 1) {
    //   return next('/login');
    // }

    next();
  });

  // testend

  return Router;
});
