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

      <!-- Homepage editor -->


<div v-if="notice.status == 'on'"  class="q-pa-md q-gutter-sm" >
        <div v-if="notice_input">
          <q-editor v-model="notice.description" min-height="5rem" />
          <div class="flex flex-center">
            <q-btn label="Submit" @click="onSubmit" color="positive" ></q-btn>

          </div>
        </div>


        <q-card flat bordered>
          <div class="row " >
            <div  class=" text-h5" style="color: cadetblue; width: 61%;display: flex;justify-content: end;">Thông báo</div>

            <q-btn icon="edit" dense flat style="color: blueviolet" @click="notice_input = true" />
          </div>

          <q-card-section  v-html="notice.description" />
        </q-card>
      </div>
<!-- Homepage editor -->



    <q-separator class="q-mt-lg"></q-separator>

    <div class="row q-pl-md flex flex-center">
      <div class="text-h6">Trang sản phẩm : </div>
      <div class="col-1"></div>
      <q-btn label="ON" color="positive"
        @click="(noticeProduct.status = 'on'), (update_statusProductNotice = false), onSubmitNoticeProduct()" />
      <q-btn label="OFF" color="negative"
        @click="(noticeProduct.status = 'off'), (update_statusProductNotice = true), onSubmitNoticeProduct()" />
    </div>




<!-- editor -->
      <div class="q-pa-md q-gutter-sm"  v-if="noticeProduct.status == 'on'">
        <div v-if="noticeProduct_input">
          <q-editor v-model="noticeProduct.description" min-height="5rem" />
          <div class="flex flex-center">
            <q-btn label="Submit" @click="onSubmitNoticeProduct" color="positive" ></q-btn>

          </div>
        </div>


        <q-card flat bordered>
          <div class="row " >
            <div  class=" text-h5" style="color: cadetblue; width: 61%;display: flex;justify-content: end;">Thông báo</div>

            <q-btn icon="edit" dense flat style="color: blueviolet" @click="noticeProduct_input = true" />
          </div>

          <q-card-section  v-html="noticeProduct.description" />
        </q-card>
      </div>
<!-- editor end -->



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
        headers: {
          Authorization: "Bearer " + jwt.value,
        },
        withCredentials: true,
      })
      .then((response) => {
        notice.value = response.data;
      });

      axios
      .get(`${WebApi.server}/admin/getProductNotice`, {
        headers: {
          Authorization: "Bearer " + jwt.value,
        },
        withCredentials: true,
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
            message: "Đã cập nhật thông báo",

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
            message: "Đã cập nhật thông báo",

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
