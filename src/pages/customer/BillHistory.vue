<template>
  <q-page class="q-pa-sm">
    <div class="flex flex-center text-h5" style="border: 4px solid forestgreen; color: coral; height: 1.9em;">Lịch sử đơn hàng </div>


    <div :class="!$q.platform.is.mobile ? 'row' : ''">

      <div v-for="bill in billsCopy" :key="bill">
        <q-card class=" q-mt-md" :class="!$q.platform.is.mobile ? 'q-mr-md' : ''">

          <div :style="bill.status == 'unread' ? 'background-color:burlywood' : ''">
            <div :style="!$q.platform.is.mobile ? 'min-width:450px; min-height:350px;' : ''">
              <q-card-section>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section class="q-ml-sm">

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
import ItemInCardBox from "src/components/item/ItemInCardBox.vue";

import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const billsCopy = ref([])

export default {
  components: { ItemInCardBox },
  setup() {
    const customerId = localStorage.getItem("customerId")
    const bills = ref([])
    axios.get(`${WebApi.server}/getBillBy/custmerId/` + customerId).then(res => {
      bills.value = res.data

      billsCopy.value = [...bills.value]
      billsCopy.value= billsCopy.value.sort((a,b) => b.id - a.id)

      console.log("billsCopy.value ",billsCopy.value)
    })


    function numberWithCommas(x) {
      let round = Math.round(x)
      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    console.log("customerId ", customerId)
    return {
      bills,
      numberWithCommas,
      billsCopy
    }
  }
}
</script>
