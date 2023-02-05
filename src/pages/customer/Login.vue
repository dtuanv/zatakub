<template>
  <q-page padding class="flex justify-center">
    <!-- <q-dialog v-model="loginForm">
      <q-input label="User Name"></q-input>
    </q-dialog> -->

    <q-card class="q-mt-xl"
      :style="$q.platform.is.mobile  ? 'background-color:bisque; width: 70vw; height:28vh' : 'background-color:bisque; width: 20vw; height: 250px'">
      <!-- <q-card  v-else style="width:15vw; height:40vh; background-color:blanchedalmond;"> -->
      <q-card-section>
        <div class="flex justify-center text-h4">Đăng nhập</div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-input class="q-ml-sm q-mr-sm" v-model="user.username" label="Tài khoản"></q-input>
        <q-input class="q-ml-sm q-mr-sm" v-model="user.password" type="password" label="Mật khẩu"></q-input>

        <q-btn label="Submit" type="submit" filled class="float-right q-mt-md" flat color="positive"></q-btn>
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
      console.log("user ", this.user)
      axios.post(`${WebApi.server}/checkCustomerAccount`, this.user).then(re => {
        let customerId = re.data
        console.log("re ", re.data)

        if (customerId == 0) {
          this.$q.notify({
            message: "Tài khoản hoặc mật khẩu không đúng",
            color: "negative",
            avatar: `${WebApi.iconUrl}`,
          })
        }

        if (customerId > 0) {
          this.$q.notify({
            message: "Chào " + customerId,
            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          })

          localStorage.setItem("customerId", customerId)
          this.$router.push("/cusOrderManager")

        this.$store.dispatch("cache/customerLogin",customerId);




        }
      }).catch(err => console.log(err))
    },
  },
  // name: 'PageName',
};
</script>
