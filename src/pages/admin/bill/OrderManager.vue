<template>

  <q-page class="q-pa-md">
    <div class="flex flex-center text-h5 q-mb-md">Quản lý đơn hàng ZaTaKub</div>

    <div class="row">
      <div v-for="bill in bills" :key="bill">
        <div class="q-pa-sm" style="">
          <q-card style="min-width:400px; min-height:450px;"
            :style="bill.status == 'unread' ? 'background-color:burlywood' : ''">
            <q-card-section :style="bill.status == 'received' ? 'background-color:chartreuse' : 'background-color:brown'">
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
                <div>Ghi chú thanh toán : {{ bill.paymentNotice }}</div>
              </div>


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


                  <div class="flex flex-center"
                    style="border: 4px solid cadetblue; color: coral; height: 3.9em;padding: 14px 7px;">
                    <div
                      :style="bill.totalCode < bill.total ? 'text-decoration-line: line-through;text-decoration-color: red;' : ''">
                      Tổng: {{ numberWithCommas(bill.total) }} đ.
                    </div>
                    <div class="q-ml-sm">
                      Code đã nhập:{{ bill.codeInput }}
                    </div>

                  </div>


                </div>

                <div class="col-6">
                  <div class="flex flex-center"
                    style="border: 4px solid red; color: black;height: 3.9em;padding: 14px 7px;">
                    <div v-if="bill.discountCode > 100" style="color:blueviolet">
                      - {{ numberWithCommas(bill.discountCode) }} đ.
                    </div>
                    <div v-else>
                      - {{ bill.discountCode }} %
                    </div>
                    <div class="q-ml-sm">
                      = Tổng mới: {{ numberWithCommas(bill.totalCode) }} đ

                    </div>

                  </div>
                </div>

              </div>
            </q-card-actions>
          </q-card>
        </div>

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

const $q = useQuasar();



// server run automatish
function getBillData() {

  console.log("call")
  axios.get(`${WebApi.server}/allBill`).then((re) => {
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
    // bills.value.itemSet = bills.value.itemSet.sort((a,b) => a.id - b.id)
  })
  setTimeout(getBillData, 6000)
}

const bills = ref([])


function numberWithCommas(x) {
  let round = Math.round(x)
  return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import { WebApi } from "/src/apis/WebApi";
// import  {getAxios}  from "/src/apis/apiBackend.js";
export default {
  components: { ItemInCardBox },
  setup() {

    getBillData()

    return {

      bills,
      numberWithCommas,

    }
  },
  methods: {
    changeBillStatus(bill) {
      if (bill.status == 'unread') {
        bill.status = 'received'

      } else {
        bill.status = 'unread'
      }
      axios.post(`${WebApi.server}/saveBillItem`, bill).then(() => {
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
