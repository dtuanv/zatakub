<template>
  <div v-for="bill in bills" :key="bill.id" :bill="bill">
  <div>{{bill.product}}</div>

  </div>
</template>
<script>

import { useStore } from 'vuex';
import { ref, computed, nextTick } from "vue";
import {WebApi} from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

import { useQuasar } from "quasar";
const bills = ref([])
  export default{

    setup(){
      const store = useStore()

      axios.get(`${WebApi.server}/admin/bill`)
      .then(response =>{
       bills.value = response.data
        // bills = this.$store.state.cache.bills.value
        console.log("bills : ", bills)
      })
    return{
      bills
    }
  }
  }

</script>
