<template>

  <q-page class="q-pa-lg">
    <div class="flex flex-center text-h5">Thêm mã code</div>




    <div class="flex flex-center">
      <div style="max-width:300px">
        <q-form @submit="saveCodeDiscount">
          <div style="" class="row q-mt-sm q-col-gutter-md">
          <div class="col-5">
            <q-input outlined label="Tên Code" v-model="code.description" lazy-rules :rules="[val => !!val || 'Field is required']"></q-input>

          </div>

          <div class="col-5">
            <q-input outlined label="Số lượng" v-model.number="code.quantity" type="number"

              :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại Số lượng code']"
            ></q-input>

          </div>

        </div>

        <div class="row q-mt-md q-col-gutter-md">


          <div  v-if="input_DiscontPercent" class=" col-5 ">
            <q-input outlined v-model.number="code.discount"  label="Giảm giá %" type="number"

              :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']" />


          </div>
          <div  v-else class="col-5">
            <q-input outlined label="giảm giá money" v-model.number="code.discount"
            type="number"

              :rules="[val => (0 < val && val < 20000000) || 'Vui lòng nhập lại money giảm giá']"
            ></q-input>


          </div>
          <div class="col-5">
              <q-btn label="Change" @click="changeInputDiscount"></q-btn>
          </div>
        </div>


        <div class="row q-mt-md q-col-gutter-md">
          <div class="col-5">
            <q-btn label="Quay lại"></q-btn>

          </div>
          <div class="col-1"></div>
          <div class="col-5 " >
            <q-btn label="Lưu" color="positive" type="submit" ></q-btn>
          </div>
        </div>
        </q-form>


      </div>

    </div>
    <!-- div class="row q-mt-sm q-col-gutter-lg" -->

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
      input_DiscontPercent: ref(false),
    }
  },
  methods: {
    changeInputDiscount() {
      if (this.input_DiscontPercent == false) {
        this.input_DiscontPercent = true
      } else {
        this.input_DiscontPercent = false
      }
    },
    saveCodeDiscount(){
      console.log("save Code Discount", code.value)

      axios.post(`${WebApi.server}/saveCodeDiscount`, code.value).then(() => {
        console.log("code discount save!")
      })
    }
  }
}
</script>
