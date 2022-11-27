<template>
  <!-- <div class="q-pa-md row items-start q-gutter-md"> -->
  <div class="q-pa-md ">
    <!-- <q-card   class="my-card flex  shadow-5 "> -->
    <q-card   class="full-width row  justify-start items-start content-center ">
      <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->
      <q-img :src="'/img/'+category.imageUrl" />

      <q-card-section>
        <q-btn fab color="primary" icon="place" class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);" />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{category.name}}
          </div>
          <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />

          </div> -->
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div class="text-caption text-grey">
        {{category.decription}}
        </div>
      </q-card-section>

      <q-separator />

      <!-- <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name : 'CategoryBox',
  props: ['category'],
  setup() {
    return {
      stars: ref(4)
    }
  }
}
</script>

<style >

.my-card {
  width: 100%;
  height: 100%;
/* max-height: 450px;
    max-width : 300px */
  }
</style>


