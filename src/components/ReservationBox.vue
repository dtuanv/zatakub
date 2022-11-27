<template>

  <!-- <q-item  clickable  style=" max-width:100px"> -->
<div class="row ">


    <q-item :style="$q.screen.gt.sm ?'max-width : 100px' : 'max-width:15vw'"   clickable >
    <!-- <div>Component {{reservation}}</div> -->
      <q-item-section side>
        <!-- <q-avatar  rounded size="60px"> -->
        <q-avatar  rounded :size="$q.screen.gt.sm ? '60px' : '2.5rem' ">
          <img :src="'img/z_local/'+reservation.imgUrl " />


          <q-badge v-if="reservation.status" floating color="teal">
            <q-icon name="done"></q-icon>
          </q-badge>
        </q-avatar>

      </q-item-section>
    </q-item>

    <!-- <q-icon class="q-mt-lg" size="1.5rem" color="green" :name="reservation.icon"></q-icon> -->
    <!-- <q-icon style="margin-top: 2rem;" size="1.5rem" color="green" :name="reservation.icon"></q-icon> -->
    <q-icon  style="margin-top: 2.5vh; margin-left: 1vh;" size="1.5rem" color="green" :name="reservation.icon"></q-icon>


</div>




</template>
<script>
  import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
  export default{
    name:'ReservationBox',
    props:["reservation"],

    setup(){
      // const store = useStore()
      return{
      }
    }

  }
</script>
