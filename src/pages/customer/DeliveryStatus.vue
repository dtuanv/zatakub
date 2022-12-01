<template>
  <q-page class="q-pa-md">
    	<div class="" >
        <div class="text-h5 flex flex-center " style="width:100%" >
          Theo dõi đơn hàng của tôi
        </div>
        <div class="flex flex-center q-mt-lg" >
          <q-input  style="width:30rem" v-model="deliveryNum" :rules="deliveryNumValidate" label="Nhập mã số đơn hàng" rounded outlined >
            <template v-slot:append>
              <q-btn flat icon="search" />
        </template>
      </q-input>
        </div>
      </div>
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

  export default{

    setup(){
      const deliveryNum = ref()
      return{
        deliveryNum,
        deliveryNumValidate: [
        (val) =>
          (val !== null &&
            val !== "" &&
            !!val &&
            val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?.*$/g)) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Vui lòng nhập đúng số đơn ạ!",
        // (val) =>
        //   (val.charAt(0) == 0 && !!val) || "Bitte geben Sie die richtige Telefonnummer mit 0 am Anfang ein",

      ],
      }
    }
  }
</script>
