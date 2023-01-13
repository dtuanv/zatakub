<template>

  <q-page class="q-pa-lg">
    <div class="flex flex-center text-h5">
      <div v-if="this.$route.params.discountCodeId == 0">
        Thêm mã code
      </div>
      <div v-else>
        Chỉnh sửa code khuyến mãi
      </div>

    </div>

    <div class="flex flex-center">
      <div style="max-width:300px">
        <q-form @submit="saveCodeDiscount">
          <div class="row" v-if="code.status != undefined">
            <div style="align-self: center;color:green" v-if="code.status == 'valid'">Còn hiệu lực</div>

            <div style="align-self: center;color:red" v-else>Hết hiệu lực</div>

            <div>
              <q-btn flat :label="code.status == 'valid' ? 'Stop' : 'Mở Code'"
                :color="code.status == 'valid' ? 'negative' : 'positive'"
                @click="changeDiscountCodeSatus(code)"></q-btn>
            </div>
          </div>
          <div style="" class="row q-mt-sm q-col-gutter-md">

            <div class="col-5">
              <q-input outlined label="Tên Code" v-model="code.description" lazy-rules
                :rules="[val => !!val || 'Field is required']"></q-input>

            </div>

            <div class="col-5">
              <q-input outlined label="Số lượng" v-model.number="code.quantity" type="number"
                :rules="[val => (0 < val && val < 1000) || 'Vui lòng nhập lại Số lượng code']"></q-input>

            </div>

          </div>

          <div class="row q-mt-md q-col-gutter-md">


            <div v-if="input_DiscontPercent" class=" col-5 ">
              <q-input outlined v-model.number="code.discount" label="Giảm giá %" type="number"
                :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']" />


            </div>
            <div v-else class="col-5">
              <q-input outlined label="giảm giá money" v-model.number="code.discount" type="number"
                :rules="[val => (0 < val && val < 20000000) || 'Vui lòng nhập lại money giảm giá']"></q-input>


            </div>
            <div class="col-5">
              <q-btn label="Change" @click="changeInputDiscount"></q-btn>
            </div>
          </div>




          <div class="row q-mt-md q-col-gutter-md">
            <div class="col-5">
              <q-btn to="/admin/discountCode" label="Quay lại"></q-btn>

            </div>
            <div class="col-1"></div>
            <div class="col-5 ">
              <q-btn label="Lưu" color="positive" type="submit"></q-btn>
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
import { useRoute, useRouter } from "vue-router";


const code = ref({})
export default {

  setup() {
    const route = useRoute();

    const $q = useQuasar();

    const $store = useStore();


    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });


    if (route.params.discountCodeId == 0) {
      code.value = {}
    } else {

      axios.get(`${WebApi.server}/discountCodeBy/` + route.params.discountCodeId,
        {
          headers: {
            Authorization: "Bearer " + jwt.value,
          },
          withCredentials: true,
        }
      ).then(response => {
        code.value = response.data

        console.log("code.value ", code.value)
      })
    }
    return {
      jwt,
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
    saveCodeDiscount() {

      code.value.status = 'valid'
      console.log("save Code Discount", code.value)

      axios.post(`${WebApi.server}/saveDiscountCode`, code.value,

        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }
      ).then(() => {
        this.$router.push("/admin/discountCode")
        console.log("code discount save!")
      })
    },
    changeDiscountCodeSatus(code) {
      if (code.status == 'valid') {
        code.status = 'invalid'


        axios.post(`${WebApi.server}/saveDiscountCode`, code,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(() => {
          // this.$router.push("/admin/discountCode")
          // console.log("code discount save!")

          this.$q.notify({
            message: 'Đã cập nhập Code ',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`
          })
        })

      } else {
        code.status = 'valid'
        axios.post(`${WebApi.server}/saveDiscountCode`, code,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(() => {
          this.$q.notify({
            message: 'Đã cập nhập Code ',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`
          })

        })


      }
    }
  }
}
</script>
