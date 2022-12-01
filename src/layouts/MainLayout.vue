<template>
  <q-layout :view="$q.screen.gt.sm?'hHh Lpr lff':'hHh lpR lFf'" class="bg-grey-1">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" to="/">
          <q-avatar style="width: 51px; height: 39px"
            ><img src="/img/icon/nha.png" alt=""
          /></q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            <div class="">
              <div style="font-family: cursive; font-size: 20px; color: darkslategray">
                ZATAKUB
              </div>
            </div>
          </q-toolbar-title>
        </q-btn>

        <q-tabs
          v-if="$q.screen.gt.sm"
          class="text-weight-bold"
        >
          <!-- <q-tabs v-if="true" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap" > -->


          <q-route-tab style="text-transform: capitalize;" :to="'/product'"  >Khuyến Mãi</q-route-tab>
          <q-route-tab style="text-transform: capitalize;" :to="'/product'"  >Thương Hiệu</q-route-tab>
          <q-route-tab style="text-transform: capitalize;" :to="'/product'"  >Giới Thiệu</q-route-tab>
          <q-route-tab style="text-transform: capitalize;" :to="'/product'"  >Liên Hệ</q-route-tab>

        </q-tabs>
        <!-- to shoping cart -->
        <q-btn
          class="absolute-top-right q-mt-sm q-mr-md"
          flat
          icon="shop"
          to="/shopping"
        >
          <q-badge color="red" floating transparent>
            {{ cartItemCount }}
          </q-badge>
        </q-btn>
        <q-btn
          v-if="role === 'ADMIN' || role === 'USER'"
          class="absolute-top-right q-mt-sm q-mr-md"
          color="red"
          label="Log Out"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"


    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple v-if="role !== ''">
            <q-item-section>
              <div class="flex justify-center text-h5">Du bist: {{ role }}</div>
            </q-item-section>
          </q-item>


          <q-item clickable v-ripple to="/product">
            <q-item-section avatar>
              <q-icon name="shopping_bag" />
            </q-item-section>

            <q-item-section> Khuyến mãi </q-item-section>
          </q-item>

          <q-item v-if="role == ''" clickable v-ripple to="/contact">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Hỏi Shop </q-item-section>
          </q-item>


          <q-item v-if="role == ''" clickable v-ripple to="/deliveryStatus">
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>

            <q-item-section> Tìm đơn </q-item-section>
          </q-item>


          <q-item
            v-if="role === 'ADMIN' || role === 'USER'"
            clickable
            v-ripple
            to="/admin"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Admin </q-item-section>
          </q-item>

          <q-item v-if="role == ''" clickable v-ripple to="/loginPage">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Login </q-item-section>
          </q-item>

          <q-item v-else clickable v-ripple @click.prevent="logout">
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> LogOut </q-item-section>
          </q-item>


        </q-list>
      </q-scroll-area>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <!-- (Optional) The Footer -->

    <q-footer>
      <div v-if="card_cookie">
        <q-card style="background-color: aqua; height: 120px">
          <q-card-section style="padding-bottom: 0px">
            <div style="width: 100%">
              <div style="color: black" class="flex justify-center">
              Cookie
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="row" style="width: 100%">
              <div class=""></div>
              <div class="col-2">
                <q-btn
                  @click="card_cookie = false"
                  label="Ablehnen"
                  color="negative"
                ></q-btn>
              </div>
              <div class="col-6"></div>
              <div class="">
                <q-btn
                  class=""
                  @click="card_cookie = false"
                  color="positive"
                  label="Akzeptieren"
                ></q-btn>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>

      <q-tabs v-if="!$q.screen.gt.sm" switch-indicator style="background-color: cadetblue">
        <q-route-tab
          icon="yard"
          :to="{ name: 'product', params: { id: 1 } }"
          replace
          label="Khuyến mãi"
        />
        <q-route-tab icon="book_online" to="/aboutMe" replace label="" />
      </q-tabs>
    </q-footer>



    <q-page-container>
      <!-- This is where pages get injected -->

      <router-view />



      <Header></Header>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

import { useQuasar } from "quasar";
import { date } from "quasar";
import Header from "/src/components/header/Header.vue";
export default {
  // name: 'LayoutName',
  // props:{countCart},
  components: {
    Header,
  },

  computed: {
    cartItemCount() {
      return this.$store.getters["cache/cartItemCount"];
    },
  },
  setup() {
    const miniState = ref(false);
    const amountItem = ref(0);
    const leftDrawerOpen = ref(false);
    const route = useRoute();
    const $q = useQuasar();
    const $router = useRouter();
    const $store = useStore();

    const role = computed({
      get: () => $store.state.loginModule.role,
    });
    console.log("Role in computed: ", role);


    const logout = () => {
      $store.dispatch("loginModule/doLogout");
      $router.push("/product");
      localStorage.removeItem("onlyAdmin");
      localStorage.removeItem("user_role");
      $store.dispatch("cache/logOut");
      $q.notify({
        message: "logOut",

        color: "positive",
        avatar: `${WebApi.iconUrl}`,
      });
      $router.replace("/");
    };
    return {
      logout,
      amountItem,
      leftDrawerOpen,
      drawer: ref(false),
      miniState,
      card_cookie: ref(true),

      role,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
};
</script>
