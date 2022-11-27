<template>
  <q-page class="flex flex-center">
    <div style=" padding: 10px 0px 10px 0px; background-color: blanchedalmond; width:100%;color: green;" class="flex justify-center text-h5">Herzlich willkommen</div>

    <q-dialog v-model="hinweis_dialog" v-if="notice.status == 'on'">
      <q-card style="width: 65vw; ">
        <q-card-action>
          <div class="flex flex-center text-h5" style="color:cadetblue;">Hinweis</div>

        </q-card-action>
        <q-separator></q-separator>
        <q-card-selections>
          <div class="q-pa-lg flex flex-center" >
            <div>
                {{ notice.description }}
              </div>
          </div>
        </q-card-selections>
      </q-card>

    </q-dialog>

    <!-- <q-img src="/img/koto/home.png"></q-img>

    <q-img src="/img/koto/sushimenu.png"></q-img>
    <q-img src="/img/koto/warmEssen.png"></q-img> -->

    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { WebApi } from "/src/apis/WebApi";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: 'IndexPage',
  setup(){
    const notice = ref({})
    axios.get(`${WebApi.server}/getNotice/homePage`).then((response) =>{
      notice.value = response.data
    })
    return{
      hinweis_dialog:ref(true),
      notice,
    }
  }
})
</script>
