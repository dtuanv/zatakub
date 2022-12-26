<template>
  <q-page class="q-pa-md">
      <q-page>
        <q-input v-model="category.name" label="Name"/>
        <q-input v-model="category.viet" label="Viet"/>

        <q-btn type="submit" label="Submmit" @click="saveCategory"></q-btn>
      </q-page>
  </q-page>

</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import {WebApi} from "/src/apis/WebApi";

  const category =ref({})
  export default{

    setup(){

      return{
        category,
      }
    },
    methods:{
      saveCategory(){
        console.log("category ",category.value)
        axios({
            method: "post",
            url: `${WebApi.server}/saveCategory`,
            // data: JSON.stringify(product),
            data:category.value
        })
      }
    }
  }
</script>
