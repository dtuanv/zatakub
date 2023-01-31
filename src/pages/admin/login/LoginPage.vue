<template>
  <q-page class="flex flex-center">



    <q-card class="q-pa-md" style="width: 60vw">
      <q-card-section>
        <div class="text-h5 flex flex-center">ADMIN</div>
      </q-card-section>

      <q-form @submit="submitLogin" @reset="resetForm" class="q-gutter-md">
        <q-input
          outlined
          v-model="username"
          label="Your username *"
          hint="Username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please write your userusername']"
        />

        <q-input
          outlined
          type="password"
          v-model="password"
          label="Your password *"
          hint="Password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please write your password']"
        />

        <div>
          <q-btn
            label="Login"
            type="submit"
            color="primary"
            :loading="isLoading"
            :disable="isLoading"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
      </q-form>
      <q-ajax-bar
        ref="ajaxBar"
        position="bottom"
        color="accent"
        size="10px"
        skip-hijack
      />
    </q-card>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { LoginRequest } from "src/services/LoginService";
import { setUserRoleInStorage } from "src/utils/LocalStorageUtils";
import { WebApi } from "/src/apis/WebApi";


export default {
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    const username = ref(null);
    const password = ref(null);
    const ajaxBar = ref(null);
    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });

    const isLoading = computed(() => {
      return $store.getters["IsLoadingModule/getIsLoadingStatus"];
    });

    const checkLoginStatus = () => {
      // const loginStatus = $store.getters["modules/getLoginStatus"];
      const loginStatus = $store.getters["loginModule/getLoginStatus"];
      // console.log("login status login: ", loginStatus);
      // console.log(" in Store: ", $store.getters);
      if (loginStatus.loggedIn) {
        // doLogout();
        $router.push("/");
        // $router.push({ name: "protectedPage" });
      }
    };
    checkLoginStatus();

    const notifyFailedLogin = () => {
      $q.notify({
        message: "Invalid username or password",
        color: "negative",
      });
    };

    const resetForm = () => {
      username.value = null;
      password.value = null;
    };

    const submitLogin = async () => {
      try {
        ajaxBar.value.start();
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        const loginRequest = new LoginRequest(username.value, password.value);
        await $store.dispatch("loginModule/doLogin", loginRequest);
        // $router.push("/product");

        // console.log("jwt in Login ," ,jwt.value)
        // test beginn
        {
          // window.localStorage.setItem("admin", JSON.stringify(userDb.value));
          // window.localStorage.setItem("user", username.value);
          // window.localStorage.setItem(
          //   "onlyAdmin",
          //   "sdhushfuihdufhsidiasjdjsakd???=*ÄÖLkksaijd.s"
          // );
          if (username.value == "admin" || username.value == "tuan") {
            $store.dispatch("cache/setRole", "ADMIN");

             setUserRoleInStorage("ADMIN");
          } else {
            console.log("user")
                setUserRoleInStorage("USER");

          }
          $store.dispatch(
            "cache/setToken",
            "hgfdhhjfdskfsdfkslfkdslfjdsfjkjdskfdsjfkdsjfkdsjfkdsjfkdsjf"
          );

          $q.notify({
            message: "welcome Admin",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          });
        }
        // test end
        $router.push("/admin");
      } catch (error) {
        console.log(error);
        notifyFailedLogin();
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
        ajaxBar.value.stop();
      }
    };

    return {
      username,
      password,
      resetForm,
      submitLogin,
      ajaxBar,
      isLoading,
    };
  },
};
</script>
