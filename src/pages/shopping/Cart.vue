<template>
  <q-page>
    <div class="q-mt-xl">
    <div class="justify-center flex">
      <q-img
        src="/img/shopping_cart.png"
        style="height: 140px; max-width: 150px"
      />
    </div>
    <div v-for="(item, index) in items" :key="index" :item="item">
      <div class="justify-center flex row">
        <div class="q-ma-sm">{{ item.quantity }} x {{ item.product.name }}</div>
        <q-btn
          @click.prevent="removeProductFromCart(item.product)"
          icon="delete"
          color="negative"
          dense
          flat
        ></q-btn>
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
      <q-btn
        @click="dialog_bill = true"
        class=""
        label="Check Out"
        style="color: goldenrod"
      ></q-btn>
    </div>
  </div>
  <q-dialog v-model="dialog_bill" class="">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h4 flex justify-center">Delivery</div>
      </q-card-section>
      <q-separator />

      <q-card-actions vertical>
        <q-form @submit="itemCheckOut">
          <!-- Input Validation -->
          <q-input
            v-model="user.name"
            class="col-4"
            label="Name"
            color="white"
            :rules="[
              (val) =>
                (!!val && val.length > 1) || 'Please write a correct name',
            ]"
          ></q-input>
          <q-input
            v-model="user.adresse"
            class="col-4"
            label="Adresse"
            color="white"
            :rules="adresseRules"
          ></q-input>
          <q-input
            v-model="user.mobil"
            class="col-4"
            label="Mobil"
            color="white"
            :rules="mobilRules"
          ></q-input>
          <q-input label="Note" v-model="user.note" autogrow />
          <q-btn
            class="q-mt-lg float-right"
            label="Send"
            color="primary"
            type="submit"
            dense
          ></q-btn>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
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
const user = ref({});
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
      user,
      bill,
      items,
      hashmap,
      numberWithCommas,
      // input validation
      adresseRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Please write your adresse!!",
      ],
      mobilRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Please write a correct mobil",
        (val) =>
          (val.includes(0) && !!val) || "A Mobil nummer must start with a  0",
      ],
      //end Input validation
      dialog_bill: ref(false),

      itemCheckOut() {
        console.log("Check user : ", user.value);
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
            user: user.value,
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
    };
  },
  computed: {
    cartItems() {},
    cartTotalPrice() {
      return this.$store.getters["cache/cartTotalPrice"];
    },
  },
  methods: {
    removeProductFromCart(product) {
      this.$store.dispatch("cache/removeProductFromCart", product);
    },
    // removeProductFromCart(product){
    //   this.$store.dispatch("cache/removeProductFromCart", product)

    // },
  },
};
</script>
<style>
</style>
