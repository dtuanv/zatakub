<template>
  <q-page padding class="flex justify-center">
    <!-- <q-dialog v-model="loginForm">
      <q-input label="User Name"></q-input>
    </q-dialog> -->
    <q-card class="q-mt-xl"
      :style="$q.screen.gt.sm ==true ? 'width:15vw; height:40vh; background-color:blanchedalmond;': 'width:60vw; background-color:blanchedalmond; height:40vh;'">
      <!-- <q-card  v-else style="width:15vw; height:40vh; background-color:blanchedalmond;"> -->
      <q-card-section>
        <div class="flex justify-center text-h4">Login</div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-input class="q-ml-sm q-mr-sm" v-model="user.userName" label="UserName"></q-input>
        <q-input class="q-ml-sm q-mr-sm" v-model="user.password" label="Password"></q-input>
        <q-input class="q-ml-sm q-mr-sm" v-model="code" label="Code"></q-input>

        <q-btn label="Create" type="submit" filled class="float-right" flat color="positive"></q-btn>

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
    // const route = useRoute();,
    const code = ref('')

    const loginForm = ref(true)
    return {
      loginForm,
      user,
      code,

      onSubmit() {

        if (code.value == 'chilijAdminwnoMoiduoc__koto##+#a__23555114DFGZHJH5784i3jejfkdksdjsdhsfhv') {
          axios({
            method: "post",
            url: `${WebApi.server}/onlyTuan/createNewUser`,
            // data: JSON.stringify(product),
            data: user.value,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              $q.notify({
                message: ' new User created',

                color: 'positive',
                avatar: `${WebApi.iconUrl}`,

              })
              // console.log("product saved");
              $router.replace("/")
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          $q.notify({
            message: "Code is not correct!!!",

            color: "negative",
            avatar: `${WebApi.iconUrl}`,

          });
        }

      }
    }
  }
  // name: 'PageName',
}
</script>
