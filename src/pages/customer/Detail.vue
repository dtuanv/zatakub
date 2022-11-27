<template>
  <div class="q-pa-md ">

    <h1 clas class="text-center">Customer Details</h1>

    <q-form @submit="onSubmit">
      <div class="row q-col-gutter-lg">
        <q-input v-model="customer.firstName" class="col-5" label="First Name "></q-input>
        <q-input v-model="customer.lastName" class="col-5" label="Last Name"></q-input>


      </div>
      <div class="row q-col-gutter-lg">

        <q-input v-model="customer.email" class="col-5" label="Email"></q-input>
        <q-select v-model="customer.gender" class="col-5" label="Gender" :options="genderList" map-options emit-value>
        </q-select>

      </div>

      <div class="float-right">
        <q-btn label="Zurück" type="reset" color="negative" dense flat to="/customer"></q-btn>
        <q-btn label="Speichern" color="primary" type="submit" dense></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from 'quasar';
import { propsToAttrMap } from "@vue/shared";
const customer = ref({});
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const customerId = route.params.customerId;
    const $q = useQuasar();

    console.log("id ", route.params.customerId);
    if (customerId == 0) {
      customer.value = { firstName: "" };
    } else {
      axios
        .get("http://localhost:8687/customer/" + route.params.customerId)
        .then((response) => {
          customer.value = response.data;
          console.log(customer.value);
          console.log(customer.value.email);
          console.log("response.data:  " + response.data.customerId);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("customer ", customer);
    }

    return {
      customer,
      genderList: [
        {
          label: "Male",
          name: "male",
          value: "male",
          field: "male",
        },
        {
          label: "Female",
          name: "female",
          value: "female",
          field: "female",
        },
      ],
      onSubmit() {
        console.log("Submit is running!")
        if (customerId == 0) {
          console.log("Customer id = 0")
          axios({
            method: "post",
            url: "http://localhost:8687/customer/saved",
            data: customer.value,

          })
            .then(response => {
              console.log("in submit to post")
              router.replace("/customer"),
                $q.notify({
                  message: 'new Customer saved',
                  color: 'positive',
                  avatar: `${WebApi.iconUrl}`,

                })
              console.log("saved ")
            })

        } else {
          axios({
            method: 'put',
            url: "http://localhost:8687/customer/" + customerId,
            data: customer.value,
          })

            .then(response => {
              router.replace("/customer");
              $q.notify({
                message: 'customer updated!',
                color: 'positive',
                avatar: `${WebApi.iconUrl}`,


              })
            })
          console.log("updated")
        }
      }
    };
  },
};
</script>
