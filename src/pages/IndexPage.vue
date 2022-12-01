<template>
  <q-page class="flex flex-center">
    <div style=" padding: 10px 0px 10px 0px; background-color: blanchedalmond; width:100%;color: green;" class="flex justify-center text-h5">Xin Chào</div>

    <q-dialog v-model="hinweis_dialog" v-if="notice.status == 'on'">
      <q-card style="width: 65vw; ">
        <q-card-action>
          <div class="flex flex-center text-h5" style="color:cadetblue;">Thông Báo</div>

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
