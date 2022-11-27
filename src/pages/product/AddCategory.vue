<template>
  <div class="q-pa-md">

      <!-- make form in center -->
      <div class="">

        <q-form  @submit="addCategory()" >

          <div class="justify-center flex text-h5 	q-mb-lg">Add Category</div>
    <!-- content -->
    <div class="q-gutter-md edit_category  " style="max-width: 500px">

      <q-input filled v-model="category.name" label="Name" />
      <q-input filled v-model="category.imageUrl" label="Image Url" />
      <q-input filled v-model="category.decription" label="Decription" />

      <q-btn
            color="primary"
            type="submit"

            icon="cloud_upload"
          />
     </div>

        </q-form>
      </div>
       </div>
      <!-- <div class="col-6"></div> -->
      <!-- <div class="col-6"></div> -->
</template>
<script >
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import {WebApi} from "/src/apis/WebApi";

const category=ref({})
export default {
  setup() {
    const route = useRoute()
    const $q = useQuasar();
    const router = useRouter();

    axios.get(`${WebApi.server}/admin/category/add/`+route.params.id+'/')
    .then(response => {
      category.value = response.data
    })
    return {
      category,
      // name: ref(""),
      // decription: ref(""),
      // imageUrl: ref(""),
      ///check new or old category

      addCategory() {

        // const Category = {
        //   name: this.name,
        //   decription: this.decription,
        //   imageUrl: this.imageUrl,
        // };
        axios({
          method: "post",
          url: `${WebApi.server}/admin/category/add/` ,
          // data: JSON.stringify(category),
          data: category.value,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            $q.notify({
              message:'new Category was created',

              color:'positive',
               avatar: `${WebApi.iconUrl}`,

            })
            console.log("Category saved");
            router.replace("/admin/category/edit");
          })
          .catch((err) => {
            console.log(err);
          });

      },
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
    .edit_category{
    max-width: 500px;
    text-align: center;
    display: block;
    margin-inline: auto;
  }
</style>
