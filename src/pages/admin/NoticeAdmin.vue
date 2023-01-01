<template>
  <q-page class="q-pa-sm">
    <div class="flex flex-center text-h6" style="color: brown;">
      DIE AKTUALLE HINWEIS:

    </div>
    <div class="row q-pl-md flex flex-center">
        <div class="text-h6">Homepage : </div>
        <div class="col-1"></div>

        <q-btn
          label="ON"
          color="positive"
          @click="(notice.status = 'on'), (update_status = false),onSubmit()"
        />
        <q-btn
          label="OFF"
          color="negative"
          @click="(notice.status = 'off'), (update_status = true),onSubmit()"
        />
      </div>
    <div v-if="notice.status == 'on'" class="flex flex-center q-mt-sm">
      <q-card style="width: 65vw">
        <q-card-action>
          <div class="row">
            <div
              class="text-h5 col-10 flex flex-center"
              style="color: cadetblue"
            >
              Hinweis
            </div>
            <div class="q-ml-sm">
              <q-btn
                icon="edit"
                dense
                flat
                style="color: blueviolet"
                @click="notice_input = true"
              />
            </div>
          </div>
        </q-card-action>
        <q-separator></q-separator>
        <q-card-selections>
          <!-- <div v-for="(noti, index) in notice" :key="index"> -->
          <div>
            <div v-if="!notice_input" class="q-pa-lg flex flex-center">
              <div>
                {{ notice.description }}
              </div>
            </div>
            <div v-else>
              <q-form @submit="onSubmit">
                <div class="q-pa-lg flex flex-center">
                  <q-input
                    v-model="notice.description"
                    autogrow
                    style="width: 100%"
                  />
                </div>
                <div class="flex flex-center">
                  <q-btn
                    v-if="notice_input == true"
                    label="Submit"
                    color="positive"
                    type="submit"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </q-card-selections>
      </q-card>
      <!-- q-input    -->
    </div>
    <q-separator class="q-mt-lg"></q-separator>

    <div class="row q-pl-md flex flex-center">
        <div class="text-h6">Productpage : </div>
        <div class="col-1"></div>
        <q-btn
          label="ON"
          color="positive"
          @click="(noticeProduct.status = 'on'), (update_statusProductNotice = false),onSubmitNoticeProduct()"
        />
        <q-btn
          label="OFF"
          color="negative"
          @click="(noticeProduct.status = 'off'), (update_statusProductNotice = true),onSubmitNoticeProduct()"
        />
      </div>
    <div v-if="noticeProduct.status == 'on'" class="flex flex-center q-mt-sm">
      <q-card style="width: 65vw">
        <q-card-action>
          <div class="row">
            <div
              class="text-h5 col-10 flex flex-center"
              style="color: cadetblue"
            >
              Hinweis
            </div>
            <div class="q-ml-sm">
              <q-btn
                icon="edit"
                dense
                flat
                style="color: blueviolet"
                @click="noticeProduct_input = true"
              />
            </div>
          </div>
        </q-card-action>
        <q-separator></q-separator>
        <q-card-selections>
          <!-- <div v-for="(noti, index) in notice" :key="index"> -->
          <div>
            <div v-if="!noticeProduct_input" class="q-pa-lg flex flex-center">
              <div>
                {{ noticeProduct.description }}
              </div>
            </div>
            <div v-else>
              <q-form @submit="onSubmitNoticeProduct">
                <div class="q-pa-lg flex flex-center">
                  <q-input
                    v-model="noticeProduct.description"
                    autogrow
                    style="width: 100%"
                  />
                </div>
                <div class="flex flex-center">
                  <q-btn
                    v-if="noticeProduct_input == true"
                    label="Submit"
                    color="positive"
                    type="submit"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </q-card-selections>
      </q-card>
      <!-- q-input    -->
    </div>

  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { WebApi } from "/src/apis/WebApi";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const notice = ref({});
    const noticeProduct = ref({});
    const $store = useStore();

    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });
    axios
      .get(`${WebApi.server}/admin/getNotice`, {
        // headers: {
        //   Authorization: "Bearer " + jwt.value,
        // },
        // withCredentials: true,
      })
      .then((response) => {
        notice.value = response.data;
        console.log("notice.value ",notice.value)
      });

      axios
      .get(`${WebApi.server}/admin/getProductNotice`, {
        // headers: {
        //   Authorization: "Bearer " + jwt.value,
        // },
        // withCredentials: true,
      })
      .then((response) => {
        noticeProduct.value = response.data;
      });
    return {
      notice,
      noticeProduct,
      notice_input: ref(false),
      noticeProduct_input: ref(false),
      update_status: ref(false),
      update_statusProductNotice: ref(false),
      jwt,
    };
  },
  methods: {
    onSubmit() {
      if (this.notice.status != "off") {
        this.notice.status = "on";
      }
      axios({
        method: "put",
        url: `${WebApi.server}/admin/notice/edit/` + this.notice.id,
        // data: JSON.stringify(product),
        data: this.notice,
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,
      })
        // axios({
        //   method: "post",
        //   url: `${WebApi.server}/admin/notice/save`,
        //   // data: JSON.stringify(product),
        //   data: this.notice,
        //   headers: {
        //     "Content-Type": "application/json",

        //     Authorization: "Bearer " + this.jwt,
        //   },
        //   withCredentials: true,
        // })
        .then(() => {
          this.$q.notify({
            message: "Hinweis wurde aktualliert",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          });
          this.notice_input = false
          router.replace("/admin");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmitNoticeProduct(){
      axios({
        method: "put",
        url: `${WebApi.server}/admin/notice/edit/` + this.noticeProduct.id,
        // data: JSON.stringify(product),
        data: this.noticeProduct,
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,
      })
        // axios({
        //   method: "post",
        //   url: `${WebApi.server}/admin/notice/save`,
        //   // data: JSON.stringify(product),
        //   data: this.notice,
        //   headers: {
        //     "Content-Type": "application/json",

        //     Authorization: "Bearer " + this.jwt,
        //   },
        //   withCredentials: true,
        // })
        .then(() => {
          this.$q.notify({
            message: "Hinweis wurde aktualliert",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          });
          this.noticeProduct_input = false
          router.replace("/admin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
