<template>

  <q-page class="q-pa-lg">
    <div class="flex flex-center text-h5">Thêm mã code</div>




    <div class="flex flex-center">
      <div class="row justify-aroundt">
        <div class="col-4">
          <q-input outlined label="Tên Code" v-model="code.description"></q-input>

        </div>
        <div class="col-2"></div>
        <div class=" col-4 ">
          <q-input outlined v-model.number="code.discount" label="Giảm giá %" type="number"
            :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']" />
        </div>

        <div class="">
          <q-input outlined label="Số lượng" v-model="code.quantity"></q-input>

        </div>
      </div>

    </div>





    <div class="">

      <div style="width:100%" class="row flex flex-center q-mt-md">
        <div class="">
          <q-btn label="Quay lại"></q-btn>
        </div>
        <div class="col-2"></div>
        <div class="">
          <q-btn label="Lưu" color="positive"></q-btn>
        </div>

      </div>
    </div>



  </q-page>
</template>
<script>

import { priceCalculator } from "/src/logic/logic.js";
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import axios from "axios";
import { WebApi } from "/src/apis/WebApi";

const code = ref({})
export default {

  setup() {

    return {
      code,
    }
  }
}
</script>
