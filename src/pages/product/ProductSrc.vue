<template>
  <q-page class="q-pa-md  " v-if="role == 'ADMIN'">
    <div class="justify-center flex text-h5 	q-mb-lg">Edit Resource of Product</div>
    <q-btn label="Back" to="/admin/product"></q-btn>
    <div>Cai tren la cu! Xoa!!!
    </div>
    <div>Cai duoi la moi</div>
    <!-- content -->
    <!-- <div class="q-gutter-md edit_Product  " style="max-width: 500px">

      <q-input filled v-model="categories" label="Name" />
      <q-input filled v-model="text" label="Image Url" />
      <q-input filled v-model="text" label="Decription" />


     </div> -->
    <q-table dense :rows="rows" :columns="columns" row-key="name" hide-bottom :pagination.sync="pagination">

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn icon="edit" @click='editProduct(props)' dense></q-btn>
          <q-btn icon="delete" color="negative" @click='deleteProduct(props)' dense></q-btn>

        </q-td>


      </template>
    </q-table>
  </q-page>
</template>

<script>
import axios from 'axios';
import { ref, computed, nextTick } from 'vue'

import { useStore } from "vuex";
const columns = [
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'imageUrl', label: 'Image Url', field: 'imageUrl' },
  { name: 'decription', label: 'Decription', field: 'decription' },
  { name: 'price', label: 'Price', field: 'price' },
  { name: 'category', label: 'Category', field: 'category' },
  { name: 'action', label: 'Action', field: '' },

]
const rows = ref([]);
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { WebApi } from "/src/apis/WebApi";

const router = useRouter();
const route = useRoute();
const checkPath = route;
const $q = useQuasar()
export default {
  // name: 'PageName',
  setup() {
    // console.log("Route: ", checkPath);
    const $store = useStore();
    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });

    const role = computed({
      get: () => $store.state.loginModule.role,
    });
    axios.get(`${WebApi.server}/product`,
          {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
    )
      .then(response => {
        rows.value = response.data;

        // console.log(rows.value);
      })
      .catch(err => {
        console.log(err);
      });

    return {
      role,
      rows,
      columns,
      pagination: { rowsPerPage: 0 },
    };
  },
  methods: {
    editProduct(props) {
      // console.log('Params: ', props.row.id)
      this.$router.push('/admin/product/add/' + props.row.id + '/')
    },
    deleteProduct(props) {

      this.$q.dialog({
        title: 'Confirm',
        message: 'Möchten Sie wirklich diese Product löschen?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        console.log('>>>> OK')

        axios.delete(`${WebApi.server}/admin/product/delete/` + props.row.id,
          {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
        )
          .then(response => {
            rows.value.splice(this.rows.indexOf(props.row), 1)
            this.$q.notify({
              message: 'Product was deleted.',
              color: 'positive',
              avatar: `${WebApi.iconUrl}`,



            })
            console.log('is deleted: ')
          })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })


    },
  }

}
</script>
<style>
.edit_Product {
  max-width: 500px;
  text-align: center;
  display: block;
  margin-inline: auto;
}
</style>
