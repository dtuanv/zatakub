<template>
  <q-page>
    <div class="q-mt-xs q-pa-md ">
      <div v-if="customerId == 0" class=" flex flex-center">
        <div>
          <div>
            Hãy tạo một tài khoản tại Zatakub để nhận được nhiều Code khuyến mãi và quản lý lịch sử đặt hàng ...
          </div>
          <div class="row flex flex-center">
            <div>
              Còn chần chờ gì nữa ...
            </div>
            <div>
              <q-item clickable @click="dialog_create_customerAccount = true">
                <q-avatar>
                  <img style="padding-bottom: 8px;" src="/img/icon/iconchitay.png" alt="nct">
                </q-avatar>
                <q-item-section style="text-decoration: underline;color: blue;">Tạo tài khoản</q-item-section>
              </q-item>

            </div>
          </div>
        </div>
      </div>
      <div class="justify-center flex">

        <q-img src="/img/icon/zatakub.png"
          :style="$q.platform.is.mobile ? 'max-height: 300px; max-width: 100%' : 'max-width: 30%'" alt="zatakub" />
      </div>
      <div class="justify-center flex text-h5" style="font-family: ui-serif;color:cornflowerblue;border-color: red;">
        Zatakub xin cảm ơn quý khách!!!</div>

      <div style="width:100%" class="q-mt-lg">
        <div class="flex justify-center" style="font-family: ui-serif;color: dodgerblue; font-size: 20px;"></div>
      </div>
      <!-- <q-btn to="/" label="Home"></q-btn> -->
    </div>

    <q-dialog v-model="dialog_create_customerAccount">
      <q-card style="width:300px">
        <q-card-section>
          <div class="text-h5 flex flex-center" style="    color: brown;">Tạo tài khoản</div>
        </q-card-section>

        <q-card-actions class="flex flex-center">

          <q-form @onSubmit="">
            <div class="">

              <q-input :rules="[val => !!val || 'Bạn phải nhập tên tài khoản']" label="Tên đăng nhập"
                v-model="customerAccount.username"></q-input>


              <q-input :rules="[val => !!val || 'Bạn phải nhập mật khẩu']" label="Mật khẩu"
                v-model="customerAccount.password" type="password"></q-input>
              <q-input :rules="confirmPasswordRules" label=" Xác nhận mật khẩu"
                v-model="customerAccount.confirmPassword" type="password"></q-input>



              <div class="q-mt-sm flex flex-center ">
                <q-btn color="positive" label="Tạo" @click="createcustomerAccount"></q-btn>
              </div>
            </div>

          </q-form>

        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>

</template>

<script>
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";

import axios from "axios";
import { WebApi } from "/src/apis/WebApi";


export default {

  setup() {

    const $store = useStore()
    const customerAccount = ref({})
    const customerS = JSON.parse(localStorage.getItem('customer'))


    const customerIdLocal = localStorage.getItem("customerId")
    if (customerIdLocal) {
      $store.dispatch("cache/customerLogin", customerIdLocal);

    }

    const customerId = computed({
      get: () => $store.state.cache.customerId,
    });


    console.log("customerIdLocal ", customerIdLocal)

    customerAccount.value.username = customerS.mobil

    console.log("customer ", customerS)
    return {
      dialog_create_customerAccount: ref(false),
      customerAccount,
      customerS,
      customerId,
      confirmPasswordRules: [
        (val) => (val !== null && val !== "" && !!val) || "Vui Lòng nhập xác nhận mật khẩu ạ",

        (val) => (val === customerAccount.value.password) || "Xác nhận mật khẩu không đúng"
      ]
    }
  },
  methods: {
    createcustomerAccount() {

      // `${WebApi.server}/findCustomer/mobil/`+this.customerS.mobil+ "/name/"+this.customerS.name+ "/address/"+this.customerS.address
      console.log("customerAccount ", this.customerAccount)
      axios.get(`${WebApi.server}/checkUsername/` + this.customerAccount.username).then(re => {
        if (re.data == 1) {
          this.$q.notify({
            message: "Tên đăng nhập đã tồn tại",
            color: "negative",
            avatar: `${WebApi.iconUrl}`,
          })
        }
        if (re.data == 2) {


          if (this.customerAccount.password === this.customerAccount.confirmPassword) {

            let customerDB = {}
            axios.post(`${WebApi.server}/findCustomer/mobil/`, this.customerS).then(res => {
              customerDB = res.data
              console.log("customerDB ", customerDB)

              this.customerAccount.customerId = customerDB.id


              console.log("this.customerAccount ", this.customerAccount)
              axios.post(`${WebApi.server}/createCustomerAccount`, this.customerAccount).then(re => {
                this.$q.notify({
                  message: "Chúc mừng bạn đã là thành viên của Zatakub",
                  color: "positive",
                  avatar: `${WebApi.iconUrl}`,
                })


                let user = {}
                user.username = this.customerAccount.username
                user.password = this.customerAccount.password

                axios.post(`${WebApi.server}/checkCustomerAccount`, user).then(re => {
                  let customerId = re.data
                  console.log("re ", re.data)

                  if (customerId == 0) {
                    this.$q.notify({
                      message: "Tài khoản hoặc mật khẩu không đúng",
                      color: "negative",
                      avatar: `${WebApi.iconUrl}`,
                    })
                  }

                  if (customerId > 0) {

                    localStorage.setItem("customerId", customerId)
                    this.$router.push("/cusOrderManager")

                    this.$store.dispatch("cache/customerLogin", customerId);




                  }
                }).catch(err => console.log(err))
              }
              ).catch(error => {
                this.$q.notify({
                  message: "Có lỗi xảy ra,Tài khoản chưa được tạo xin vui lòng gọi 0389 059 923 để được tư vấn thêm ạ !",

                  color: "negative",
                  avatar: `${WebApi.iconUrl}`,

                });
                console.log(error)
              })

            })


          } else {

            console.log("nott")
            this.$q.notify({
              message: "Xác nhận mật khẩu không đúng",
              color: "negative",
              avatar: `${WebApi.iconUrl}`,
            })
          }
        }
      }).catch(er => {
        console.log(er)
      })





    }
  }
}
</script>
