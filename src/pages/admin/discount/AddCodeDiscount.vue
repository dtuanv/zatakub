<template>

  <q-page class="q-ma-md">
    <div class="flex flex-center">Thêm mã code</div>
    <div>
      <div class="row">
        <q-input label="Tên Code" code.description ></q-input>
        <q-input v-model.number="code.discount" label="Giảm giá %" type="number"
        :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']"/>
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
  export default{

    setup(){

      return{
        code,
      }
    }
  }
</script>
