<template>
  <q-page padding class="flex justify-center">
    <!-- <q-dialog v-model="loginForm">
      <q-input label="User Name"></q-input>
    </q-dialog> -->

    <q-card class="q-mt-xl"
      :style="$q.screen.width > 400 && $q.screen.height > 700 ? 'background-color:bisque; width: 30vw; height: 35vh':'background-color:bisque; width: 70vw; height: 250px'">
      <!-- <q-card  v-else style="width:15vw; height:40vh; background-color:blanchedalmond;"> -->
      <q-card-section>
        <div class="flex justify-center text-h4">Login</div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-input class="q-ml-sm q-mr-sm" v-model="user.userName" label="UserName"></q-input>
        <q-input class="q-ml-sm q-mr-sm" v-model="user.password" type="password" label="Password"></q-input>

        <q-btn label="Submit" type="submit" filled class="float-right" flat color="positive"></q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ReservationBox from "/src/components/ReservationBox.vue";

import { useQuasar } from "quasar";
import { date } from "quasar";
const user = ref({});
const userDb = ref({});

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();
    const route = useRoute();



    const loginForm = ref(true);
    return {
      loginForm,
      user,
      userDb,
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      // axios
      // .get(`${WebApi.server}/userAccount`)
      // .then((re) => {
      //   userDb.value = re.data;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });

      axios
        .get(
          `${WebApi.server}/userAccount/` +
          user.value.userName +
          "/" +
          user.value.password
        )
        .then((re) => {
          return (userDb.value = re.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // const token = jwt.sign(userDb.value, process.env.JWT_KEY);
      // console.log("token",token)

      if (
        user.value.userName != undefined &&
        user.value.password != undefined
      ) {
        if (
          user.value.userName === userDb.value.userName &&
          user.value.password === userDb.value.password
        ) {

          // window.localStorage.setItem("admin", JSON.stringify(userDb.value));
          window.localStorage.setItem("user", JSON.stringify(userDb.value));
          window.localStorage.setItem("onlyAdmin", 'sdhushfuihdufhsidiasjdjsakd???=*ÄÖLkksaijd.s');
          if(userDb.value.userName == 'admin' || userDb.value.userName == 'tuan'){
            this.$store.dispatch('cache/setRole', 'ADMIN')
          }
          else{
            this.$store.dispatch('cache/setRole', 'USER')

          }
          this.$store.dispatch('cache/setToken', 'hgfdhhjfdskfsdfkslfkdslfjdsfjkjdskfdsjfkdsjfkdsjfkdsjfkdsjf')

          this.$q.notify({
            message: "welcome Admin",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,

          });
          user.value.userName = '',
            user.value.password = '',
            this.$router.replace("/admin")
        }
        else {
          this.$q.notify({
            message: "Password or Username is not correct",

            color: "negative",
            avatar: `${WebApi.iconUrl}`,

          });

        }
      }
      else {
        this.$q.notify({
          message: "Biite geben Sie Password und Username ein ",

          color: "negative",
          avatar: `${WebApi.iconUrl}`,

        });
      }

    },
  },
  // name: 'PageName',
};
</script>
