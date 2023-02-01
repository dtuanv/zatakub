<template>

  <q-page class="q-pa-sm">
    <div>
      <div class="flex justify-end">
        <q-item clickable style="padding: 0px 0px" @click="logOut">
          <div class="row">
            <div class="">
              <q-item-section>
                <div style="padding: 0px 5px;;padding-top: 3px; ">Đăng xuất</div>
              </q-item-section>
            </div>
            <div class=" ">
              <q-item-section style="padding-right:0px" avatar>
                <q-icon name="logout" color="negative" />
              </q-item-section>
            </div>


          </div>

        </q-item>

      </div>
    </div>


    <div style="color:darkgoldenrod" class="flex flex-center text-h5">Xin chào ..
    </div>

    <div class="flex flex-center">
      <div style="">
        <q-list>
          <q-item clickable style="border: 5px solid cornflowerblue;">
            <q-item-section>
              <div class="flex flex-center">Đơn đã đặt</div>
            </q-item-section>
          </q-item>

          <q-item class="q-mt-sm" clickable style="border: 5px solid cornflowerblue;"
            @click="toMyaddress">
            <q-item-section>
              <div class="flex flex-center">Địa chỉ của tôi</div>
            </q-item-section>
          </q-item>

          <q-item class="q-mt-sm" clickable style="border: 5px solid cornflowerblue;">
            <q-item-section>
              <div class="flex flex-center">Nhắn tin với Shop</div>
            </q-item-section>
          </q-item>
        </q-list>


      </div>
    </div>

  </q-page>
</template>

<script>
import { WebApi } from 'src/apis/WebApi';
import axios from 'axios';
import { ref, computed, nextTick } from "vue";


export default {

  setup() {
    const customerId = localStorage.getItem("customerId")
    const customer = ref({})

    axios.get(`${WebApi.server}/findCustomerBy/` + customerId).then(res => {
      customer.value = res.data
    })

    console.log("customerId ", customerId)
    return {
      customer,
      dialog_address: ref(false)
    }
  },
  methods: {
    logOut() {
      this.$router.push("/product/sale");
      localStorage.clear();
    },
    toMyaddress() {
      console.log("customer ", this.customer.address)
      this.$router.push("/cusOrderManager/myAddress")
    }

  }
}
</script>
