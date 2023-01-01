<template>
  <q-page class="q-pa-md">
    <div>
      <q-btn label="Thêm mã Code"></q-btn>
    </div>
    <div>
      <q-table
      title="Danh sách Codes"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div >
            <q-btn icon="edit" color="positive"></q-btn>
            <q-btn icon="delete" color="negative"></q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell ="props">
        <q-td
          :props="props"
          :class="props.row.status == 'invalid'?'bg-red ':'bg-green'"
        >
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
import axios from "axios";
import { WebApi } from "/src/apis/WebApi";
const columns = [
  {name : 'name', label: 'Mã Code', field:'description' },
  {name : 'status', label: 'Trạng thái', field:'status' },
  {name : 'actions', label: 'Chức năng', field:'actions' },
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
  export default{

    setup(){
      axios.get(`${WebApi.server}/allDiscountCode`).then(re => {
        rows.value = re.data

        console.log("Rows ",rows.value)
      })

      return{
        columns,
        rows,
      }
    }
  }
</script>
