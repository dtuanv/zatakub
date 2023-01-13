<template>
  <q-page class="q-mt-sm">
    <div class="flex flex-center" v-if="role === 'ADMIN'">
      <q-btn class=" btn hoverButton" style="width: 120px" flat label="Tin nhan" to="/admin/message">
        <div v-if="$q.screen.gt.sm == true">
          <q-badge color="red" floating transparent>
            {{ numUnread }}
          </q-badge>
        </div>
        <div v-else>
          <q-badge color="red" floating transparent>
            {{ numUnread }}
          </q-badge>
        </div>
      </q-btn>
    </div>
    <q-separator />
    <!-- Order ADMIN -->
    <div class="flex flex-center">
      <q-btn class="flex flex-center hoverButton" style="width: 120px" flat label="Order" @click="toOrderManagerPath(numUnreadBill)"  >
        <div v-if="$q.screen.gt.sm == true">
          <q-badge color="red" floating transparent>
            {{ numUnreadBill }}
          </q-badge>
        </div>
        <div v-else>
          <q-badge color="red" floating transparent>
            {{ numUnreadBill }}
          </q-badge>
        </div>
      </q-btn>
    </div>

    <q-separator />

    <!-- <q-btn v-if="role === 'ADMIN'" class="flex flex-center btn hoverButton" flat label="Admin Product" to="admin/product" />
    <q-btn  class="flex flex-center btn hoverButton" flat label="Admin Product" to="admin/product" /> -->
    <q-separator />
    <div>
      <q-separator />

    <q-btn class="flex flex-center btn hoverButton" flat label="Thong bao" to="admin/notice" />
    <q-separator />
    </div>
    <div class="flex flex-center col-12">
      <q-btn  flat label="Them ma code" to="/admin/discountCode"></q-btn>
    </div>
    <q-separator />



  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { WebApi } from "/src/apis/WebApi";
import { watch } from "vue";
import { date } from "quasar";
import { useStore } from "vuex";


const loggedIn = localStorage.getItem("user");
export default {
  setup() {
    const numUnread = ref(0)
    const numUnreadBill = ref(0)
    const route = useRoute();
    const $q = useQuasar();
    const $store = useStore();

    const router = useRouter();
    const today = Date.now();
    const formattedString = ref(date.formatDate(today, "DD-MM-YYYY"));



    const role = computed({
      get: () => $store.state.loginModule.role,
    });
const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });


    axios.get(`${WebApi.server}/countUnseenContact`,
       {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
    )
      .then(response => {
        numUnread.value = response.data;
      })
      .catch(err => {
        console.log(err);
      });



      axios.get(`${WebApi.server}/getNumUnreadBill`,
    {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
    ).then((re) => {
      numUnreadBill.value = re.data

    })
    // Reservation num
    // axios.get(`${WebApi.server}/admin/countUnreadBill/` + formattedString.value,
    //   //  {
    //   //       headers: {
    //   //         Authorization: "Bearer " + jwt.value,
    //   //       },
    //   //       withCredentials: true,
    //   //     }
    // )
    //   .then(response => {
    //     numUnreadBill.value = response.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    return {
      numUnread,
      numUnreadBill,
      role,
      logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("onlyAdmin");

        console.log("loggedIn logout", loggedIn);
        $q.notify({
          message: "logout",

          color: "positive",
          avatar: `${WebApi.iconUrl}`,

        });

        router.replace("/");
      },
    };
  },
  methods:{

    toOrderManagerPath(numUnread){
      this.$router.push('/admin/orderManager/numUnread/'+numUnread)
    }
  }
};
</script>
<style>
.btn {
  margin-bottom: 5px;
}
</style>
