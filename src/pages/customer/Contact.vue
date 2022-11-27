<template>
  <q-page padding class="flex justify-center q-mt-xl">
    <!-- content -->
    <q-card
      class="bg-img"
      :style="$q.screen.width > 450 && $q.screen.height > 700 ? 'background-color:bisque; width: 70vw; height: 45vh':' width: 70vw; height: 450px'">
      <q-card-section class="flex justify-center text-h4" style="color: darkorchid;">Kontakt</q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <q-form @submit="onSubmit" style="width:100%">
          <q-input class="q-ml-sm" label="Name" v-model="contact.name" style="width: 100%"></q-input>
          <q-input class="q-ml-sm" label="Telefon" v-model="contact.mobil" style="width: 100%"></q-input>
          <q-input class="q-mt-lg" style="width: 100%" v-model="contact.message" filled type="textarea"
            label="Nachricht" />
          <q-btn color="green" class="float-right q-mt-lg" type="submit" label="Submit"></q-btn>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { date } from "quasar";

// import productBox from "src/components/product/ProductBoxOrig.vue";
import { WebApi } from "/src/apis/WebApi";
const contact = ref({})
export default {
  // name: 'PageName',

  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();
    const today = Date.now();

    const time = date.formatDate(today, 'H:m')

    const day = date.formatDate(today, "DD-MM-YYYY");

    // const route = useRoute();
    return {
      contact,
      time,
      day,
    }
  },


  methods: {
    onSubmit() {
      // console.log("time value",time.value)
      // console.log("time ",time)
      axios({
        method: "post",
        url: `${WebApi.server}/saveContact`,
        // data: JSON.stringify(product),
        data: {
          // guestNum: (gue) => (gue.orGuestNum.value !=='' ? 15 : 12),
          name: contact.value.name,
          mobil: contact.value.mobil,
          message: contact.value.message,
          time: this.time,
          day: this.day,
          status: 2,
        },
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(() => {
          this.$q.notify({
            message: "wir haben Ihre Nachricht bekommen!",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,

          });
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

};
</script>
<style>
.bg-img{
  background-image:url("/img/ivbluete/ivblueteLogo.png");
}
</style>
