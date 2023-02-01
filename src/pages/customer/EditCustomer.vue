<template>

  <q-page class="q-pa-md">
    <div>
      <q-form @submit="itemCheckOut">
        <q-card class="q-pl-md q-pr-md q-mt-sm">
          <q-card-section>
            <div class="row flex justify-center">
              <div class="text-h5 " style="font-family: cursive;color: cadetblue;">Thông tin khách
                hàng
              </div>


            </div>


          </q-card-section>
          <q-separator />
          <!-- desktop -->
          <q-card-actions v-if="!$q.platform.is.mobile" vertical>

            <!-- Input Validation -->
            <div class="row">
              <q-input outlined filled v-model="customer.name" class="col-4" label="Họ và Tên" color="white" :rules="[
                (val) =>
                  (!!val && val.length > 1 && val.match(/^([^0-9]*)$/)) || 'Xin vui lòng nhập đúng tên ạ',
              ]"></q-input>
              <div class="col-3"></div>
              <q-input filled outlined v-model="customer.mobil" class="col-4 q-ml-sm" label="Số điện thoại"
                color="white" :rules="mobilRules"></q-input>

            </div>

            <div class="row q-mt-sm">
              <div class="col-4">
                <q-input filled outlined v-model="customer.street" label="Địa chỉ" color="white" lazy-rules
                  :rules="addresseRules"></q-input>
              </div>
              <div class="col-3 q-ml-sm">
                <q-select label="Tỉnh Thành" use-input @filter="filterProvinces" filled square outlined
                  v-model="provinceSelected" :options="provincesOptions" :option-label="(province) => province.name"
                  :rules="provinceRules" />
              </div>

              <div class="col-3 q-ml-sm">
                <q-select label="Quận Huyện" filled square outlined v-model="districtSelected"
                  :options="districtsOptions" :option-label="(district) => district.name" :rules="districtRules" />
              </div>

            </div>
            <div class="row">
              <q-input class="col-4" filled outlined label="Ghi chú" v-model="customer.note" autogrow />
              <div></div>
            </div>


          </q-card-actions>

          <!-- mobil -->

          <q-card-actions v-else vertical>

            <!-- Input Validation -->
            <div class="">
              <q-input outlined filled v-model="customer.name" class="col-4" label="Họ và Tên" color="white" :rules="[
                (val) =>
                  (!!val && val.length > 1 && val.match(/^([^0-9]*)$/)) || 'Xin vui lòng nhập đúng tên ạ',
              ]"></q-input>
              <div class="col-3 "></div>
              <q-input filled outlined v-model="customer.mobil" class="col-4 " label="Số điện thoại" color="white"
                :rules="mobilRules"></q-input>

            </div>

            <div class="">
              <div class="col-4 q-mt-sm">
                <q-input filled outlined v-model="customer.street" label="Địa chỉ" color="white" lazy-rules
                  :rules="addresseRules"></q-input>
              </div>
              <div class="col-4  q-mt-sm ">
                <q-select label="Tỉnh Thành" use-input @filter="filterProvinces" filled square outlined
                  v-model="provinceSelected" :options="provincesOptions" :option-label="(province) => province.name"
                  :rules="provinceRules" />
              </div>

              <div class="col-4 ">
                <q-select label="Quận Huyện" filled square outlined v-model="districtSelected"
                  :options="districtsOptions" :option-label="(district) => district.name" :rules="districtRules" />
              </div>

            </div>
            <div class="">
              <q-input class="col-4" filled outlined label="Ghi chú" v-model="customer.note" autogrow />
              <div></div>
            </div>


          </q-card-actions>

          <!-- mobil end -->

          <q-card-actions class="flex flex-center" style="width:100%">
            <div >
              <q-item  style="padding-top:0px" clickable @click="dialog_confirmPwd = true">
                <q-item-section>
                  <div style="border: 3px solid cornflowerblue;">Lưu Chỉnh sửa</div>
                </q-item-section>
              </q-item>
            </div>
          </q-card-actions>

        </q-card>

        <q-dialog v-model="dialog_confirmPwd">
          <q-card>
            <q-card-section>
              <div>*Quý kháck vui lòng nhập mật khẩu để xác nhận ạ</div>
            </q-card-section>
            <q-card-actions>
              <q-input label="Mật khẩu"></q-input>
            </q-card-actions>
          </q-card>

        </q-dialog>


      </q-form>
    </div>
  </q-page>
</template>

<script>

import { WebApi } from 'src/apis/WebApi';
import axios from 'axios';
import { ref, computed, nextTick } from "vue";
import addresses from "/src/apis/addresses.json"

export default {


  setup() {
    const customerId = localStorage.getItem("customerId")
    const customer = ref({})

    const provinces = addresses.provinces

    const districts = addresses.districts

    const provinceSelected = ref({})

    const districtSelected = ref({})

    const districtsOptions = ref(districts)
    const provincesOptions = ref(provinces)

    function isObjectEmpty(obj) {
      return Object.keys(obj).length === 0
    }


    axios.get(`${WebApi.server}/findCustomerBy/` + customerId).then(res => {
      customer.value = res.data

      provinceSelected.value = provinces.find(pro => {
        return pro.name == customer.value.province
      })

      districtSelected.value = districts.find(dis => {
        return dis.name == customer.value.district
      })



      console.log("customer.value ", customer.value)
    })





    return {
      dialog_confirmPwd: ref(false),
      customer,
      provinceSelected,
      districtSelected,
      provincesOptions,
      districtsOptions,
      provinces,
      districts,
      isObjectEmpty,
      provinceRules: [
        (val) => (isObjectEmpty(val) != true) || "Xin vui lòng chọn tỉnh thành ạ"
      ],


      districtRules: [
        (val) => (isObjectEmpty(val) != true) || "Xin vui lòng chọn quận huyện mới ạ"
      ],


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


    }
  },

  watch: {
    provinceSelected(from, to) {

      if (to.id != undefined) {
        if (from.id != to.id) {
          this.districtSelected = {}
        }
      }

      if (this.provinceSelected != null) {
        // this.districtSelected = {}

        this.districtsOptions =
          this.districts.filter((district) => {
            return this.provinceSelected.id == district.province_id
          })


      }

    },

  }
}
</script>
