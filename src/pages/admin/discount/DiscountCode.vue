<template>
  <q-page class="q-pa-md">
    <div>
      <q-btn to="/admin/discountCode/Detail/0" label="Thêm mã Code"></q-btn>
    </div>
    <div>
      <q-table title="Danh sách Codes" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div>
              <q-btn icon="edit" color="positive" @click="editDiscountCode(props)"></q-btn>
              <q-btn icon="delete" color="negative" @click="deleteDiscountCode(props)"></q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-discount="props">
          <q-td :props="props" :class="props.row.status == 'invalid' ? 'bg-red ' : 'bg-green'">
              <div v-if="props.row.discount > 100" >
                {{ numberWithCommas(props.row.discount) }} đ
              </div>
              <div v-else>
                {{  props.row.discount}} %

              </div>
          </q-td>
        </template>

        <template v-slot:body-cell="props">
          <q-td :props="props" :class="props.row.status == 'invalid' ? 'bg-red ' : 'bg-green'">
            {{ props.value }}
          </q-td>
        </template>




      </q-table>
    </div>




  </q-page>
</template>

<script>

import { priceCalculator } from "/src/logic/logic.js";
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { WebApi } from "/src/apis/WebApi";
const columns = [
  { name: 'name', label: 'Mã Code', field: 'description' },
  { name: 'status', label: 'Trạng thái', field: 'status' },
  { name: 'discount', label: 'Giảm giá', field: 'discount' },
  { name: 'quantity', label: 'Số lượng', field: 'quantity' },
  { name: 'actions', label: 'Chức năng', field: 'actions' },
]

const rows = ref(
  [
    // {
    //   description:'A',
    //   status : 'valid',
    // },

    // {
    //   description:'B',
    //   status : 'invalid',
    //   color:'red',
    // },


  ]
)
export default {

  setup() {
    const $q = useQuasar()

    const $store = useStore();


    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });

    axios.get(`${WebApi.server}/allDiscountCode`,
      {
        headers: {
          Authorization: "Bearer " + jwt.value,
        },
        withCredentials: true,
      }
    ).then(re => {
      rows.value = re.data.sort((a, b) => b.id - a.id)


      // console.log("Rows codes ",rows.value)
    })


    function numberWithCommas(x) {
      let round = Math.round(x)
      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return {
      numberWithCommas,
      columns,
      rows,
      dialog_deleteConfirm: ref(false),
      jwt,
    }
  },
  methods: {
    editDiscountCode(props) {
      console.log("props.row ", props.row)
      this.$router.push("/admin/discountCode/Detail/" + props.row.id)
    },
    deleteDiscountCode(props) {

      console.log("props a0", props.row)
      this.$q.dialog(
        {
          title: 'Xác nhận Xóa Code',
          message: 'Bạn có thực sự muốn xóa mã giảm giá ' + props.row.description + ' không?',
          // cancel:true,


          persistent: true,//User can not dismmiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it!
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: 'negative'
          }

        }
      ).onOk(() => {


        axios.delete(`${WebApi.server}/deleteCodeBy/` + props.row.id,
          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then((re) => {
          if (re.data == 1) {
            let indexCode = rows.value.indexOf(props.row)
            rows.value.splice(indexCode, 1)
            this.$q.notify({
              message: 'Đã xóa code ' + props.row.description,
              color: 'positive',
              avatar: `${WebApi.iconUrl}`
            })
          }

        })
      }).onCancel(() => {
      }).onDismiss(() => {

      })

    }
  }
}
</script>
