<template>
  <q-page class="q-pa-md" v-if="role == 'ADMIN'">
    <!-- make form in center -->
    <div class="">
      <q-form @submit="addproduct()">
        <div class="justify-center flex text-h5 q-mb-lg">Add product</div>
        <!-- content -->
        <div class="q-gutter-md edit_product" style="max-width: 500px">
          <q-input filled v-model="product.name" label="Name" />
          <q-input filled v-model="product.ingredient" label="Zutat" />
          <q-input filled v-model="product.num" label="Nummer" :rules="productNum" />
          <q-select filled v-model="product.category" label="Category" :options="productCategory" map-options
            emit-value></q-select>
          <q-input filled v-model="product.price" label="Price" />

          <q-input filled v-model="product.imageUrl" label="Image Url" />
          <q-input filled v-model="product.decription" label="Decription" />

          <!-- <q-input filled v-model="product.category" label="Category" /> -->

          <q-btn label="Subfood hinzufügen" @click="dialog_addSubFood = true">

          </q-btn>
          <div>
            <q-dialog v-model="dialog_addSubFood">
              <q-card>
                <div class="q-ma-sm">

                  <span>
                    <div class="row" style="width:100%" v-for="(subFood) in subFoods" :key="subFood.labelName">
                      <q-input :label="subFood.labelName" v-model="subFood.nameF" class="col-5"></q-input>
                      <div class="col-1"></div>
                      <q-input label="Zutat" class="col-2 q-mr-lg" v-model="subFood.ingredient"></q-input>

                      <q-input :label="subFood.labelPrice" v-model="subFood.price" class="col-2"></q-input>
                    </div>
                  </span>
                  <!-- <div class="row">
                    <q-input class="" label="Sub B"></q-input>
                    <q-input label="Preis B"></q-input>
                  </div>-->
                </div>


              </q-card>
            </q-dialog>
          </div>

          <q-btn color="primary" type="submit" icon="cloud_upload" />
        </div>

      </q-form>
    </div>
  </q-page>
  <!-- <div class="col-6"></div> -->
  <!-- <div class="col-6"></div> -->
</template>
<script >
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { WebApi } from "/src/apis/WebApi";
import { useStore } from "vuex";

const subFoods = ref([
  { key: 1, labelName: 'Sub A', labelPrice: 'Price' },
  { key: 2, labelName: 'Sub B', labelPrice: 'Price', },
  { key: 3, labelName: 'Sub C', labelPrice: 'Price', },
  { key: 4, labelName: 'Sub D', labelPrice: 'Price', },])


const product = ref({});
export default {
  data() {

  },
  setup() {
    const route = useRoute();
    const $q = useQuasar();
    const router = useRouter();
    const $store = useStore();

const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });
    const role = computed({
      get: () => $store.state.loginModule.role,
    });


    if (route.params.id == 0) {
      product.value = {
        name: "",
        imageUrl: "",
        decription: "",
        price: "",
      };
      subFoods.value = [
        { key: 1, labelName: 'Sub A', labelPrice: 'Price' },
        { key: 2, labelName: 'Sub B', labelPrice: 'Price', },
        { key: 3, labelName: 'Sub C', labelPrice: 'Price', },
        { key: 4, labelName: 'Sub D', labelPrice: 'Price', },
        { key: 5, labelName: 'Sub E', labelPrice: 'Price', },
      ]
    } else {
      axios
        .get(`${WebApi.server}/admin/product/add/` + route.params.id + "/",

         {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          product.value = response.data;
          subFoods.value = product.value.subFoods
        });
    }


    return {
      role,
      subFoods,
      product,
      dialog_addSubFood: ref(false),
      getIndex(list, id) {
        return list.findIndex((e) => e.id == id)
      },
      // name: ref(""),
      // decription: ref(""),
      // imageUrl: ref(""),
      ///check new or old product
      productNum: [
        (val) =>
          (val !== null &&
            val !== "" &&
            !!val &&
            String(val).match(/^[0-9]{0,2}$/)) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Bitte geben Sie  richtige number des Gerrichtes ein",
        (val) =>
          (String(val).charAt(0) !== '0') || "Bitte geben Sie die richtige number des Gerrichtes nicht mit 0 am Anfang ein",
        // (val.includes(0) && !!val) || "Please write a correct mobil",
      ],
      productCategory: [
        { label: "Vorspeise", value: "vorspeise", field: "category" },
        { label: "Haupgang", value: "hauptgang", field: "category" },
        { label: "Sushi Mix", value: "sushiMix", field: "category" },
        { label: "Nigiri", value: "nigiri", field: "category" },
        { label: "Maki", value: "maki", field: "category" },
        { label: "Inside Out", value: "insideOut", field: "category" },
        { label: "Tempura Roll", value: "tempura", field: "category" },
        { label: "Spezial Koto", value: "spezial", field: "category" },
        { label: "Saschimi", value: "saschimi", field: "category" },
        { label: "Getränke", value: "getraenke", field: "category" },
      ],
      addproduct() {
        // const product = {
        //   name: this.name,
        //   decription: this.decription,
        //   imageUrl: this.imageUrl,
        // };


        if (route.params.id == 0) {
          axios({
            method: "post",
            url: `${WebApi.server}/admin/product/add/`,
            // data: JSON.stringify(product),
            data: {
              name: product.value.name,
              ingredient: product.value.ingredient,
              decription: product.value.decription,
              price: product.value.price,
              imageUrl: product.value.imageUrl !== "" ? product.value.category + '/' + product.value.imageUrl + '.png' : "",
              category: product.value.category,
              num: product.value.num,
              subFoods: this.subFoods,
            },
                headers: {
              "Content-Type": "application/json",

              Authorization: "Bearer " + jwt.value,
            },
             withCredentials: true,
          })
            .then(() => {
              $q.notify({
                message: "new product was created",

                color: "positive",
                avatar: `${WebApi.iconUrl}`,

              });
              console.log("product saved");
              router.replace("/admin/product");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else {
          console.log("route.params.id", route.params.id)
          axios({
            method: "put",
            url: `${WebApi.server}/admin/product/edit/` + route.params.id,
            // data: JSON.stringify(product),
            data: {

              name: product.value.name,
              ingredient: product.value.ingredient,
              decription: product.value.decription,
              price: product.value.price,
              imageUrl: product.value.imageUrl,
              category: product.value.category,
              subFoods: this.subFoods,
              num: product.value.num,
            },
            headers: {
              "Content-Type": "application/json",

              Authorization: "Bearer " + jwt.value,
            },
             withCredentials: true,
          })
            .then(() => {
              $q.notify({
                message: " product was updated",

                color: "positive",
                avatar: `${WebApi.iconUrl}`,

              });
              router.replace("/admin/product");
            })
            .catch((err) => {
              console.log(err);
            });
        }

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
.edit_product {
  max-width: 500px;
  text-align: center;
  display: block;
  margin-inline: auto;
}
</style>
