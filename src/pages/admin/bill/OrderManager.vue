<template>

  <q-page class="q-pa-md">
    <div v-if="numChange > 0" class="row flex flex-center">

      <div style="align-self:center;border: 4px solid cadetblue; color: coral; height: 2.9em;padding: 7px 7px">Có {{
        numChange
      }} đơn mới ! </div>
      <div class="q-ml-sm"><q-btn icon="restart_alt" color="positive" @click="reloadPage"></q-btn></div>
    </div>
    <div class="flex flex-center text-h5 q-mb-md">
      <div v-if="isBillAWeek == 'true'">
        Quản lý đơn hàng ZaTaKub từ: {{ lastWeek }} đến : {{ todayFormated }}

      </div>
      <div v-else>
        Tất cả đơn của Zatakub
      </div>
      <div v-if="isBillAWeek == 'true'" style="margin-left:100px">
        <q-btn label="All" @click="getAllBill()"></q-btn>
      </div>

      <div v-else style="margin-left:100px">
        <q-btn label="A Week" @click="getBillInAWeek()"></q-btn>
      </div>

    </div>

    <div class="row q-mb-md ">
      <div v-if="!$q.platform.is.mobile" class="col-1"></div>
      <div class="col-11">
        <q-btn class=" q-mr-md" style="text-transform: capitalize;" label="Only New Bill"
          @click="setOnlyNewBill"></q-btn>
        <q-btn :class="!$q.platform.is.mobile ? 'q-mr-md' : 'q-mr-sm'" style="text-transform: capitalize;"
          label="Received bill" @click="setReceivedBill"></q-btn>
        <q-btn style="text-transform: capitalize;" label="All Bill" @Click="setAllBill"></q-btn>
      </div>

    </div>
    <div class="row ">

      <div v-for="bill in bills" :key="bill">
        <q-card  class=" q-mt-md" :class="!$q.platform.is.mobile ? 'q-mr-md' :'' ">
          <q-btn v-if="dev == 'yes'" icon="delete" color="negative" @click="deleteBillBy(bill)"></q-btn>

          <div :style="bill.status == 'unread' ? 'background-color:burlywood' : ''" >
            <div :style="!$q.platform.is.mobile ? 'min-width:545px; min-height:418px;' : ''">
              <q-card-section
                :style="bill.status == 'received' ? 'background-color:chartreuse' : 'background-color:brown'">
                <div v-if="bill.status == 'unread'" class="flex flex-center text-h5">
                  <div style="color:white">

                    Đơn mới ! Chưa Xem...
                  </div>
                  <div class="q-ml-sm">
                    <q-btn label="Nhận đơn" color="positive" @click="changeBillStatus(bill)"></q-btn>
                  </div>
                </div>
                <div v-else class="flex flex-center text-h5">
                  <div>
                    Đã nhận đơn!!
                  </div>
                  <div class="q-ml-xl">
                    <q-btn label="Chưa nhận" color="negative" @click="changeBillStatus(bill)"></q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section>

                <div>Tên: {{ bill.customerDto.name }}</div>
                <div>SĐT: {{ bill.customerDto.mobil }}</div>

                <div>Địa chỉ: {{ bill.customerDto.address }}</div>
                <div>Ghi chú đ/c: {{ bill.customerDto.note }}</div>
                <div class="row">
                  <div v-if="bill.paymentMethod == 'card'">Thanh toán chuyển khoản.</div>
                  <div v-else>Thanh toán Code.</div>
                  <div v-if="bill.paymentNotice != undefined">Ghi chú thanh toán : {{ bill.paymentNotice }}</div>
                </div>

                <div>Ngày đặt hàng: {{ bill.orderDate }}</div>


              </q-card-section>
              <q-separator></q-separator>

              <q-card-actions>
                <div class="row">
                  <div>
                    <div v-for="item in bill.itemSet" :key="item">
                      <div class="">
                        <itemInCardBox :item="item">

                        </itemInCardBox>
                      </div>
                    </div>
                  </div>
                </div>


              </q-card-actions>

              <q-separator></q-separator>

              <q-card-actions>
                <div style="width:100%" class="row">

                  <div class="col-6">


                    <div class="flex flex-center" style="border: 4px solid cadetblue; color: coral; height: 3.9em;"
                      :style="$q.platform.is.mobile ? 'padding: 0px 0px' : 'padding: 14px 7px;'">
                      <div
                        :style="bill.totalCode < bill.total ? 'text-decoration-line: line-through;text-decoration-color: red;' : ''">
                        Tổng: {{ numberWithCommas(bill.total) }} đ.
                      </div>
                      <div class="q-ml-sm" v-if="bill.codeInput != '' && bill.codeInput != undefined">
                        Code đã nhập:{{ bill.codeInput }}
                      </div>

                    </div>


                  </div>

                  <div v-if="bill.discountCode > 0" class="col-6">
                    <div class="flex flex-center" style="border: 4px solid red; color: black;height: 3.9em;"
                      :style="$q.platform.is.mobile ? 'padding: 0px 0px' : 'padding: 14px 7px;'">
                      <div v-if="bill.discountCode > 100" style="color:blueviolet">
                        - {{ numberWithCommas(bill.discountCode) }} đ.
                      </div>
                      <div v-else>
                        - {{ bill.discountCode }} %
                      </div>
                      <div v-if="$q.platform.is.mobile" class="">
                        Tổng mới: {{ numberWithCommas(bill.totalCode) }} đ

                      </div>

                      <div v-else class="q-ml-sm">
                        = Tổng mới: {{ numberWithCommas(bill.totalCode) }} đ

                      </div>

                    </div>
                  </div>

                </div>
              </q-card-actions>

            </div>
          </div>


        </q-card>


      </div>

    </div>


  </q-page>
</template>

<script>

import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import axios from "axios";
import ItemInCardBox from "src/components/item/ItemInCardBox.vue";
import productBox from "src/components/product/ProductBox.vue";
import { WebApi } from "/src/apis/WebApi";
import { useRoute, useRouter } from "vue-router";

import { date } from "quasar"



const $q = useQuasar();
const numUnreadBill = ref(0)

const billsCopy = ref([])

// const dev = computed({
//       get: () => $store.state.loginModule.dev,
//     });


const bills = ref([])


function numberWithCommas(x) {
  let round = Math.round(x)
  return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// import  {getAxios}  from "/src/apis/apiBackend.js";
export default {
  components: { ItemInCardBox },
  setup() {
    const numChange = ref(0)

    const route = useRoute()

    const $store = useStore();

const dev = localStorage.getItem('DEV');
console.log("dev ",dev)


    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });


    const today = Date.now();

    const isBillAWeek = ref('true')

    const todayFormated = ref(date.formatDate(today, "DD-MM-YYYY"))


    Date.prototype.subtractDays = function (days) {
      var dateIn = new Date(this.valueOf());
      dateIn.setDate(dateIn.getDate() - days);
      return dateIn;
    };
    var dateNowOrig = new Date();

    const lastWeek = date.formatDate(dateNowOrig.subtractDays(7), "DD-MM-YYYY")

    console.log("nextWEEK ", lastWeek)

    // /getBillAWeek/from/08-01-2023/to/25-01-2023
    function getBillData() {

      axios.get(`${WebApi.server}/getBillAWeek/from/` + lastWeek + '/to/' + todayFormated.value,

        {
          headers: {
            Authorization: "Bearer " + jwt.value,
          },
          withCredentials: true,
        }
      ).then((re) => {
        bills.value = re.data.sort((a, b) => b.id - a.id)
        bills.value = bills.value.sort((a, b) => {
          let stA = a.status.toUpperCase()
          let stB = b.status.toUpperCase()

          if (stA > stB) {
            return -1;
          }
          if (stA < stB) {
            return 1
          }
          return 0

        })
        bills.value.forEach(b => {
          b.itemSet = b.itemSet.sort((a, b) => a.id - b.id)
        })



        billsCopy.value = [...bills.value]
        // bills.value.itemSet = bills.value.itemSet.sort((a,b) => a.id - b.id)
      })

      // setTimeout(getBillData, 60000)
    }


    // server run automatish
    // allbill begin
    // function getBillData() {

    //   axios.get(`${WebApi.server}/allBill`).then((re) => {
    //     bills.value = re.data.sort((a, b) => b.id - a.id)
    //     bills.value = bills.value.sort((a, b) => {
    //       let stA = a.status.toUpperCase()
    //       let stB = b.status.toUpperCase()

    //       if (stA > stB) {
    //         return -1;
    //       }
    //       if (stA < stB) {
    //         return 1
    //       }
    //       return 0

    //     })
    //     bills.value.forEach(b => {
    //       b.itemSet = b.itemSet.sort((a, b) => a.id - b.id)
    //     })



    //     billsCopy.value = [...bills.value]
    //     // bills.value.itemSet = bills.value.itemSet.sort((a,b) => a.id - b.id)
    //   })

    //   // setTimeout(getBillData, 60000)
    // }
    // all bill end


    function getNumUnreadBillF() {

      axios.get(`${WebApi.server}/getNumUnreadBill`,

        {
          headers: {
            Authorization: "Bearer " + jwt.value,
          },
          withCredentials: true,
        }
      ).then((re) => {
        numUnreadBill.value = re.data

        if (numUnreadBill.value > route.params.numUnread) {
          numChange.value = numUnreadBill.value - route.params.numUnread
        }
      })

      setTimeout(getNumUnreadBillF, 3000)
    }


    getNumUnreadBillF()
    getBillData()
    return {
      jwt,
      dev,
      bills,
      numberWithCommas,
      billsCopy,
      numChange,
      lastWeek,
      todayFormated,
      isBillAWeek,
      getBillData,

    }
  },
  methods: {
    deleteBillBy(bill) {
      console.log("bill ", bill)
      axios.delete(`${WebApi.server}/deleteBillBy/` + bill.id,
        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }
      ).then((re) => {

        let indexB = bills.value.indexOf(bill)
        bills.value.splice(indexB, 1)
        this.$q.notify({
          message: 'Đã xóa 1 Bill',
          color: "positive",
          avatar: `${WebApi.iconUrl}`,
        })
      }).catch(err => {
        console.log(err)
      })
    },

    getBillInAWeek() {
      this.getBillData()

      this.$q.notify({
        message: 'Hiển thị đơn hàng trong 1 tuần qua',
        color: "positive",
        avatar: `${WebApi.iconUrl}`,
      })

      this.isBillAWeek = 'true'
    },
    getAllBill() {
      axios.get(`${WebApi.server}/allBill`,


        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }

      ).then((re) => {
        bills.value = re.data.sort((a, b) => b.id - a.id)
        bills.value = bills.value.sort((a, b) => {
          let stA = a.status.toUpperCase()
          let stB = b.status.toUpperCase()

          if (stA > stB) {
            return -1;
          }
          if (stA < stB) {
            return 1
          }
          return 0

        })
        bills.value.forEach(b => {
          b.itemSet = b.itemSet.sort((a, b) => a.id - b.id)
        })

        this.isBillAWeek = 'false'



        billsCopy.value = [...bills.value]
        // bills.value.itemSet = bills.value.itemSet.sort((a,b) => a.id - b.id)
      })

      this.$q.notify({
        message: 'Hiển thị tất cả đơn hàng',
        color: "positive",
        avatar: `${WebApi.iconUrl}`,
      })
    },
    reloadPage() {
      this.$router.push("/admin/orderManager/numUnread/" + numUnreadBill.value)
    },
    setOnlyNewBill() {

      bills.value = billsCopy.value.filter(b => {
        return b.status == 'unread'
      })
    },
    setReceivedBill() {
      bills.value = billsCopy.value.filter(b => {
        return b.status == 'received'
      })

    },
    setAllBill() {
      bills.value = billsCopy.value

    },
    changeBillStatus(bill) {
      if (bill.status == 'unread') {
        bill.status = 'received'

      } else {
        bill.status = 'unread'
      }
      axios.post(`${WebApi.server}/saveBillItem`, bill,

        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }
      ).then(() => {
        this.$q.notify({
          message: 'Đã cập nhật trạng thái của đơn hàng',
          color: "positive",
          avatar: `${WebApi.iconUrl}`,
        })


        setTimeout(sortBill, 1000);

        function sortBill() {
          bills.value = bills.value.sort((a, b) => {
            let stA = a.status.toUpperCase()
            let stB = b.status.toUpperCase()

            if (stA > stB) {
              return -1;
            }
            if (stA < stB) {
              return 1
            }
            return 0

          })
        }
      }
      )
    }
  }
}
</script>
