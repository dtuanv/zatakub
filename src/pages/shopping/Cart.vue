<template>
  <q-page>
    <div class="q-mt-xl">
      <div class="justify-center flex">
        <q-img src="/img/shopping_cart.png" style="height: 140px; max-width: 150px" />
      </div>
      <div v-for="(item, index) in items" :key="index" :item="item">




        <div class="justify-center flex ">
          <div class="q-ma-sm row">
            <q-chip>

              <div style="margin-right: 24px">{{ item.quantity }} x </div>
              <div>
                <q-avatar>
                  <img :src="'/img/' + item.product.imageUrl">
                </q-avatar>
              </div>

              <div>
                {{ item.product.name }}
              </div>
            </q-chip>

            <div>
              <q-btn @click.prevent="removeProductFromCart(item.product)" icon="delete" color="negative" dense
                flat></q-btn>

            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="q-ma-lg justify-center flex">Tổng: {{ numberWithCommas(cartTotalPrice) }} đ</div>
    </div>
    <div class="row">
      <div class="q-ml-lg">
        <q-btn to="/product" label="Back to Product"></q-btn>
      </div>
      <div class=""></div>
      <div v-if="$store.state.cache.cart.length > 0">
        <q-btn @click="dialog_bill = true" class="" label="Check Out" style="color: goldenrod"></q-btn>
      </div>
    </div>

      <q-card class="q-pa-md" v-if="dialog_bill">
        <q-card-section>
          <div class="text-h4 flex justify-center" style="font-family: cursive;color: cadetblue;">Thông tin khách hàng
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>
          <q-form @submit="itemCheckOut">
            <!-- Input Validation -->
            <q-input v-model="customer.name" class="col-4" label="Tên" color="white" :rules="[
              (val) =>
                (!!val && val.length > 1) || 'Xin vui lòng nhập đúng tên ạ',
            ]"></q-input>
            <q-input v-model="customer.adresse" class="col-4" label="Địa chỉ" color="white"
              :rules="adresseRules"></q-input>
            <q-input v-model="customer.mobil" class="col-4" label="SĐT" color="white" :rules="mobilRules"></q-input>
            <q-input label="Ghi chú" v-model="customer.note" autogrow />
            <q-btn class="q-mt-lg float-right" label="Gửi" color="primary" type="submit" dense></q-btn>
          </q-form>
        </q-card-actions>
      </q-card>
    <!-- Payment beginn -->

      <q-card class="q-pa-md" v-if="dialog_payment">
        <q-card-section>
          <div class="text-h4 flex justify-center" style="font-family: cursive;color: cadetblue;">Hình Thức Thanh toán
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical  >
          <div v-if="expand_codPayment == false && expand_cardPayment == false">*Vui lòng chọn hình thức thanh toán</div>
          <div class="row">
            <q-item clickable style="width:50%" :style="expand_codPayment == true && expand_cardPayment == false ? 'background-color: bisque;' :'' " class="column" @click="expand_codPayment = true,expand_cardPayment = false" >
              <div class=" flex flex-center">
                <q-avatar>
                  <img src="/img/icon/codPayment.png" alt="">
                </q-avatar>
              </div>

              <div class="q-mt-xs flex flex-center">
                Trả tiền khi nhận hàng (COD)
              </div>
            </q-item>
            <q-item clickable style="width:50%" class="column" @click="expand_cardPayment = true,expand_codPayment = false" :style="expand_cardPayment == true && expand_codPayment == false ? 'background-color: bisque;' :'' ">
              <div class="flex flex-center">
                <q-avatar>
                  <img src="/img/icon/cardPayment.png" alt="">
                </q-avatar>
              </div>

              <div class="q-mt-xs flex flex-center">
                Chuyển khoản ngân hàng
              </div>
            </q-item>
          </div>

        </q-card-actions>
        <q-separator />

        <q-card-actions vertical>
          <div v-if="expand_codPayment== true && expand_cardPayment == false">
            <div>Ghi chú</div>
            <div>
              <q-input v-model="customer.paymentNotice" filled autogrow />
            </div>
          </div>
          <div v-if="expand_cardPayment == true && expand_codPayment == false" >
            <div class="column q-mt-lg">
              <div>Tên Tài Khoản : Đào Văn Oanh</div>
              <div>Số tài khoản: 198686868</div>
              <div>Ngân hàng : MB BANK</div>
              <div>Chi Nhánh: Gò Vấp</div>
            </div>
          </div>
        </q-card-actions>
        <q-card-actions >
          <div class="row" style="width:100%">
            <div class="col-6">
              <q-btn label="Quay lại" color="negative"></q-btn>
            </div>
            <div class="col-6" v-if="expand_codPayment == true || expand_cardPayment == true">
              <div style="display: flex; justify-content: flex-end;">
                <q-btn  label="Đặt hàng" color="positive"></q-btn>
              </div>
            </div>
          </div>
        </q-card-actions>
      </q-card>

    <!-- Payment end -->

  </q-page>

</template>
<script>
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

import { useQuasar } from "quasar";
import mapActions from "vuex";
import { DOMDirectiveTransforms } from "@vue/compiler-dom";
const bill = ref({});
const customer = ref({});
export default {
  name: "Cart",
  setup() {
    const $q = useQuasar();
    const product = ref({});
    const $store = useStore();
    const router = useRouter();
    var hashmap = new Map();
    // const $q = useQuasar();
    // const router = useRouter();
    // axios.get("http://localhost:8686/product")
    //     .then(response => {
    //     products.value = response.data;
    //     console.log(products.value);
    // })
    //     .catch(err => {
    //     console.log(err);
    // });
    const items = computed({
      get: () => $store.state.cache.cart,
    });

    // console.log("$store.state.cache.cart ",$store.state.cache.cart)

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return {
      product,
      customer,
      bill,
      items,
      hashmap,
      dialog_payment: ref(true),
      expand_codPayment: ref(false),
      expand_cardPayment: ref(false),
      numberWithCommas,
      // input validation
      adresseRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Xin vui lòng nhập địa chỉ của bạn!!",
      ],
      mobilRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Xin vui lòng nhập đúng số điện thoại ạ",
        (val) =>
          (val.includes(0) && !!val) || "Xin vui lòng nhập SĐT bắt đầu bằng 0 ạ",
      ],
      //end Input validation
      dialog_bill: ref(false),


    };
  },
  computed: {
    cartItems() { },
    cartTotalPrice() {
      return this.$store.getters["cache/cartTotalPrice"];
    },
  },
  methods: {
    removeProductFromCart(product) {
      this.$store.dispatch("cache/removeProductFromCart", product);
    },
    itemCheckOut() {
      this.dialog_bill = false
      this.dialog_payment = true
      console.log("Check user : ", customer.value);
      if ($store.state.cache.cart.length === 0) {
        router.replace("/product");
        $q.notify({
          message: "You have no items",

          color: "negative",
          avatar: `${WebApi.iconUrl}`,

        }).catch((err) => {
          console.log(err);
        });
        return;
      }

      // let product =[{}]
      // for(Object a : $store.state.cache.cart ){
      //   a.
      // }

      console.log("before Post request: ", $store.state.cache.cart);
      axios({
        method: "post",
        url: `${WebApi.server}/checkOut`,
        // data: JSON.stringify(product),

        data: {
          // name : $store.state.cache.cart.getName,
          customer: customer.value,
          product: $store.state.cache.cart,
          total: $store.getters["cache/cartTotalPrice"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          console.log("check Bill ", bill);

          $q.notify({
            message: "checkouted",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,

          });

          router.replace("/thank");
          $store.dispatch("cache/checkOut");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // removeProductFromCart(product){
    //   this.$store.dispatch("cache/removeProductFromCart", product)

    // },
  },
};
</script>
<style>

</style>
