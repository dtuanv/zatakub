<template>
  <q-page>
    <div class="q-mt-xl">

      <div class="justify-center flex">
        <q-img src="/img/shopping_cart.png" style="height: 140px; max-width: 150px" />
      </div>
      <div v-for="(item, index) in items" :key="index" :item="item">




        <div class="justify-center flex " v-if="item.quantity > 0">

          <div class="q-ma-sm row">

            <q-chip style="    height: 3rem;">
              <div class="column">
                <div>
                  <q-btn icon="add" @click="moreItem(item)" style="font-size: 8px;padding: 2px 5px;color:yellowgreen;"
                    flat></q-btn>
                </div>
                <div>
                  <q-btn icon="remove" @click="subtractItem(item)" flat
                    style="font-size: 8px;padding: 2px 5px;color:red"></q-btn>

                </div>
              </div>
              <div style="margin-right: 24px">{{ item.quantity }} x </div>
              <div>
                <q-avatar>
                  <img :src="'/img/upload/product/' + item.product.imageUrl">
                </q-avatar>
              </div>

              <div v-if="$q.platform.is.mobile">

                {{ getThreeWords(item.product.name) }}
                <!-- {{ item.product.name }} -->
                <q-badge> = {{ numberWithCommas(item.itemTotal) }} đ</q-badge>
              </div>
              <div v-else>
                {{ item.product.name }}
                <q-badge> = {{ numberWithCommas(item.itemTotal) }} đ</q-badge>
              </div>
            </q-chip>

            <div class="q-pt-sm">
              <q-btn @click.prevent="removeProductFromCart(item.product)" icon="delete" color="negative" dense
                flat></q-btn>

            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>

      <div class=" q-mt-lg " v-if="total > 0">




        <div class=" flex flex-center   ">
          <div class=""
            :style="totalCode < total ? 'text-decoration-line: line-through;text-decoration-color: red;' : ''">
            <div style="border: 4px solid cadetblue; color: coral; height: 3.9em;padding: 14px 7px;">
              Tổng: {{ numberWithCommas(total) }} đ.
            </div>


          </div>
          <!-- <div style="align-self: self-end"  :style="`${badgeNotice.sty}`">{{ badgeNotice.description }}</div> -->

          <div class="q-ml-lg">
            <q-input class="" outlined style="" label="Nhập mã" v-model="codeInput">
              <div>
                <q-badge floating>
                  <div style="z-index:200" :style="`${badgeNotice.sty}`">
                    {{ badgeNotice.description }}

                  </div>
                </q-badge>
              </div>

            </q-input>

          </div>
          <div>
            <q-btn style="text-transform: capitalize;max-width: 80px;" color="positive" label="kiểm tra mã"
              @click="checkCode" />
          </div>


        </div>

        <q-separator></q-separator>
        <div class="flex flex-center q-mt-sm  column">

          <div class="row q-ml-xl">

          </div>

        </div>

        <div class="justify-center flex q-mt-sm" v-if="checkCodeValid == 1">
          <div style="border: 4px solid red; color: black;height: 1.9em;padding: 0px 7px;">
            Đã thêm mã giảm giá! Tổng mới: {{ numberWithCommas(totalCode) }} đ

          </div>
        </div>


        <div>

          <div v-if="$store.state.cache.cart.length > 0" class="flex flex-center q-mb-xs" style="width:100%">
            <q-btn @click="dialog_bill = true" class="" label="Chốt đơn"
              style="color: goldenrod;text-transform: capitalize;border: 5px dashed rgba(211, 220, 50, .6);"
              flat></q-btn>
          </div>
        </div>



      </div>
      <!-- <div class=" q-mt-lg justify-center flex">Tổng: {{ numberWithCommas(cartTotalPrice) }} đ</div> -->
    </div>

    <q-form @submit="itemCheckOut" v-if="items.length > 0">
      <q-card class="q-pl-md q-pr-md q-mt-sm" v-if="dialog_bill">
        <q-card-section>
          <div class="text-h5 flex justify-center" style="font-family: cursive;color: cadetblue;">Thông tin khách hàng
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>

          <!-- Input Validation -->
          <div class="row">
            <q-input outlined filled v-model="customer.name" class="col-4" label="Họ và Tên" color="white" :rules="[
              (val) =>
                (!!val && val.length > 1 && val.match(/^([^0-9]*)$/)) || 'Xin vui lòng nhập đúng tên ạ',
            ]"></q-input>
            <div class="col-3"></div>
            <q-input  filled outlined v-model="customer.mobil" class="col-4 q-ml-sm" label="Số điện thoại" color="white"
              :rules="mobilRules"></q-input>

          </div>

          <div class="row q-mt-sm">
            <div class="col-4">
              <q-input filled outlined v-model="customer.address" label="Địa chỉ" color="white" lazy-rules
                :rules="addresseRules"></q-input>
            </div>
            <div class="col-3 q-ml-sm">
              <q-select label="Tỉnh Thành" use-input @filter="filterProvinces" filled square outlined
                v-model="provinceSelected" :options="provincesOptions" :option-label="(province) => province.name"   :rules="provinceRules"/>
            </div>

            <div class="col-3 q-ml-sm">
              <q-select label="Quận Huyện" filled square outlined v-model="districtSelected" :options="districtsOptions"
                :option-label="(district) => district.name" :rules="districtRules" />
            </div>

          </div>
          <div class="row">
            <q-input  class="col-4" filled outlined label="Ghi chú" v-model="customer.note" autogrow />
            <div></div>
          </div>


        </q-card-actions>
      </q-card>
      <!-- Payment beginn -->

      <q-card class="q-pl-md q-pr-mg q-mt-sm" v-if="dialog_bill">
        <q-card-section>
          <div class="text-h5 flex justify-center" style="font-family: cursive;color: cadetblue;">Hình Thức Thanh toán
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>
          <div v-if="expand_codPayment == false && expand_cardPayment == false" style="color:red;">*Vui lòng chọn hình
            thức thanh toán
          </div>
          <div class="row">
            <q-item clickable style="width:50%"
              :style="expand_codPayment == true && expand_cardPayment == false ? 'background-color: bisque;' : ''"
              class="column" @click="expand_codPayment = true, expand_cardPayment = false">
              <div class=" flex flex-center">
                <q-avatar>
                  <img src="/img/icon/codPayment.png" alt="">
                </q-avatar>
              </div>

              <div class="q-mt-xs flex flex-center">
                Trả tiền khi nhận hàng (COD)
              </div>
            </q-item>
            <q-item clickable style="width:50%" class="column"
              @click="expand_cardPayment = true, expand_codPayment = false"
              :style="expand_cardPayment == true && expand_codPayment == false ? 'background-color: bisque;' : ''">
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
          <div v-if="expand_codPayment == true && expand_cardPayment == false">
            <div>Ghi chú</div>
            <div>

              <q-input v-model="billInput.paymentNotice" filled autogrow />
            </div>
          </div>
          <div v-if="expand_cardPayment == true && expand_codPayment == false">
            <div class="column q-mt-lg">
              <div>Tên Tài Khoản : Đào Văn Oanh</div>
              <div>Số tài khoản: 198686868</div>
              <div>Ngân hàng : MB BANK</div>
              <div>Chi Nhánh: Gò Vấp</div>
            </div>
          </div>
        </q-card-actions>
        <q-card-actions>
          <div class="" style="width:100%">

            <div class="flex flex-center" v-if="expand_codPayment == true || expand_cardPayment == true">
              <div v-if="items.length > 0" style="display: flex; justify-content: flex-end;">
                <q-btn  type="submit" label="Đặt hàng" color="positive" style="font-family: 'Material Icons';width: 150px;"></q-btn>
              </div>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-form>
    <!-- Payment end -->

  </q-page>

</template>
<script>
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { priceCalculator, getThreeWords } from "/src/logic/logic.js";

import { useQuasar } from "quasar";
import mapActions from "vuex";
import { date } from "quasar"

import addresses from "/src/apis/addresses.json"


import isEmpty from "/src/logic/logic.js"

const codes = [
  { description: 'A', discount: 30, status: 'valid' },
  { description: 'B', discount: 20, status: 'valid' },
  { description: 'C', discount: 10, status: 'invalid' },
  { description: 'M', discount: 10000, status: 'valid' },
  { description: 'N', discount: 10000, status: 'invalid' },
]

const billInput = ref({});
const customer = ref({});
const badgeNotice = ref(
  { description: 'Bạn có mã giảm giá không?', sty: 'color: black;background-color: antiquewhite;' }
)
export default {
  name: "Cart",
  setup() {

    const provinces = addresses.provinces

    const districts = addresses.districts

    const provinceSelected = ref({})

    const districtSelected = ref({})

    const districtsOptions = ref(districts)
    const provincesOptions = ref(provinces)

    console.log(" provinces ", provinces)
    const $q = useQuasar();
    const product = ref({});
    const $store = useStore();
    const router = useRouter();
    var hashmap = new Map();

    const today = Date.now();

    const todayFormated = ref(date.formatDate(today, "DD-MM-YYYY"))

    const codeInput = ref('')

    const priceCalculators = new priceCalculator()


    const items = computed({
      get: () => $store.state.cache.cart,
    });

    const total = ref(computed({
      get: () => $store.getters['cache/cartTotalPrice']
    }))
    //  const total = $store.getters['cache/cartTotalPrice']
    // console.log("items ",items)
    // console.log("$store.state.cache.cart ",$store.state.cache.cart)

    function numberWithCommas(x) {
      let round = Math.round(x)
      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function removeAccents(str) {
      return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');

    }

    function isObjectEmpty(obj){
      return Object.keys(obj).length === 0
    }

    const totalCode = ref()
    const checkCodeValid = ref(2)
    const usedCode = ref({})

    return {
      districts,
      isObjectEmpty,
      districtsOptions,
      provincesOptions,
      provinceSelected,
      districtSelected,
      codes,
      checkCodeValid,
      getThreeWords,
      usedCode,
      badgeNotice,
      totalCode,
      total,
      product,
      customer,
      billInput,
      items,
      hashmap,
      dialog_payment: ref(true),
      expand_codPayment: ref(false),
      expand_cardPayment: ref(false),
      removeAccents,
      numberWithCommas,
      codeInput,
      provinces,
      todayFormated,
      // input validation
      addresseRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Xin vui lòng nhập địa chỉ của bạn!!",

        (val) =>
          (val.length > 4) || "Xin vui lòng nhập đày đủ địa chỉ của bạn!!",
      ],
      mobilRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Xin vui lòng nhập số điện thoại ạ",
        // (val) =>
        //   (val.includes(0) && !!val) || "Xin vui lòng nhập SĐT bắt đầu bằng 0 ạ",

        (val) =>
          (val.charAt(0) == 0 && !!val) || "Xin vui lòng nhập SĐT bắt đầu bằng 0 ạ",

        (val) =>
          (val.length < 12) || "SĐT quá dài, xin vui lòng nhập đúng SĐT ạ!",

        (val) =>
          (val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?.*$/g)) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Xin vui lòng nhập đúng số điện thoại ạ",

        (val) => (val.match(/^[0-9]+$/)) || "Xin vui lòng nhập đúng SĐT ạ! "


      ],
      //end Input validation
      dialog_bill: ref(false),

      filterProvinces(val, update) {
        if (val === '') {
          update(() => {
            provincesOptions.value = provinces
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          // provincesOptions.value = provinces.filter(p => p.name.toLowerCase().indexOf(needle) > -1)
          provincesOptions.value = provinces.filter(p => removeAccents(p.name).toLowerCase().includes(removeAccents(needle).toLowerCase()))
        })
      },



      provinceRules: [
        (val) => (isObjectEmpty(val) != true) || "Xin vui lòng chọn tỉnh thành ạ"
      ],


      districtRules: [
        (val) => (isObjectEmpty(val) != true) || "Xin vui lòng chọn quận huyện ạ"
      ],




    };
  },

  computed: {

    cartItems() { },
    cartTotalPrice() {
      return this.$store.getters["cache/cartTotalPrice"];
    },
  },
  watch: {
    provinceSelected() {
      this.districtSelected = {}

      if (this.provinceSelected != null) {
        this.districtsOptions =
          this.districts.filter((district) => {
            return this.provinceSelected.id == district.province_id
          })


      }

    },
    total() {

      if (this.codeInput != undefined || this.codeInput != '') {
        this.checkCode()

      }
    }
  },
  methods: {

    saveCode() {
      axios.post(`${WebApi.server}/saveCode`, this.codes).then(
        console.log("save code", this.codes)
      )
    },
    checkCode() {

      // console.log("check Code")
      // if(isEmpty(customer.value.code)){
      //   console.log("empty")
      // }


      if (this.codeInput == '' || this.codeInput == undefined) {

        this.totalCode = this.total
        this.badgeNotice.description = '*Vui lòng nhập mã khuyến mãi ạ.'
        this.badgeNotice.sty = 'color: red;background-color: white;'
        this.checkCodeValid = 2
        this.usedCode.discount = 0
      } else {
        axios.get(`${WebApi.server}/getDiscountCodeByDescription/` + this.codeInput).then(re => {
          let dis = ''
          dis = re.data


          if (dis != undefined && dis.status === 'valid' && dis.quantity > 0) {
            if (dis.discount < 101) {
              this.totalCode = this.total * (1 - (dis.discount / 100));
              this.badgeNotice.description = 'Mã giảm giá ' + dis.discount + ' % đã áp dụng.'
              this.usedCode = dis
              this.usedCode.discount = dis.discount;

              console.log("dis ",dis)
              // customer.value.code = this.codeInput
            } else {
              this.totalCode = this.total - dis.discount
              this.badgeNotice.description = 'Mã giảm giá ' + this.numberWithCommas(dis.discount) + 'đ đã áp dụng.'
              this.usedCode = dis
              this.usedCode.discount = dis.discount

            }

            this.badgeNotice.sty = '    color: forestgreen; background-color: antiquewhite;'
            this.checkCodeValid = 1
          } else {

            this.totalCode = this.total
            this.badgeNotice.description = '*Mã giảm giá sai hoặc đã hết hạn.'
            this.badgeNotice.sty = 'color: red;background-color: white;'
            this.checkCodeValid = 2
            this.usedCode.discount = 0


          }

        }
        )

      }



      // let dis = this.codes.find(c => {
      //   return c.description === customer.value.code && c.status === 'valid'
      // })




    },
    subtractItem(item) {
      if (item.quantity > 0) {
        this.$store.dispatch("cache/changeNumItemInCart", {
          product: item.product,
          quantity: item.quantity,
          action: 'SUBTRACT'
        });
      }
      else {
        this.$q.notify({
          message: "Số lượng phải lớn hơn 0",
          color: "negative",
          avatar: `${WebApi.iconUrl}`,
        });
      }

    },



    moreItem(item) {
      // let countItem = item.quantity + 1

      this.$store.dispatch("cache/changeNumItemInCart", {
        product: item.product,
        quantity: item.quantity,
        action: 'ADD'
      });

    },

    removeProductFromCart(product) {
      this.$store.dispatch("cache/removeProductFromCart", product);
    },




    itemCheckOut() {
      // this.dialog_bill = false
      // this.dialog_payment = true


      // console.log("item ", this.items)
      // console.log("Check user : ", customer.value);
      if(this.usedCode.discount == undefined){
        this.usedCode.discount = 0
      }

      let bill = {}

      bill.itemSet = this.items

      bill.customerDto = customer.value

      bill.customerDto.address = bill.customerDto.address + ' , ' + this.districtSelected.name + ' , Tỉnh ' + this.provinceSelected.name

      bill.discountCode = this.usedCode.discount

      bill.status = 'unread'

      if (this.expand_cardPayment == true) {
        bill.paymentMethod = 'card'
      }
      if (this.expand_codPayment == true) {
        bill.paymentMethod = 'cash'
      }
      bill.paymentNotice = billInput.value.paymentNotice


      console.log("total ", this.total)


      if (this.totalCode == undefined) {
        this.totalCode = Math.round(this.total)
      }

      bill.total = Math.round(this.total)

      bill.totalCode = Math.round(this.totalCode)

      if (bill.discountCode > 0) {
        bill.codeInput = this.codeInput

        console.log("this.usedCode  > 0", this.usedCode)

        this.usedCode.quantity = parseInt(this.usedCode.quantity)  - 1
        if(this.usedCode.quantity == 0){
          this.usedCode.status = 'invalid'
        }

        bill.discountCodeDto = this.usedCode

        console.log("this.usedCode  > 0 af", this.usedCode)

      }

      bill.orderDate = this.todayFormated

      console.log("totalCode ", this.totalCode)

      console.log("bill ", bill)



      axios.post(`${WebApi.server}/saveBillItem`, bill).then(() => {
        console.log("save BillItems")
      }
      ).catch(error => {
        console.log(error)
      })



    },
    // removeProductFromCart(product){
    //   this.$store.dispatch("cache/removeProductFromCart", product)

    // },
  },
};
</script>
<style>

</style>
