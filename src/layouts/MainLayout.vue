<template>
  <q-layout :view="$q.screen.gt.sm ? 'hHh Lpr lff' : 'hHh lpR lFf'" class="bg-grey-1">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" to="/">
          <q-avatar style="width: 51px; height: 39px"><img src="/img/icon/nha.png" alt="" /></q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            <div class="">
              <div style="font-family: cursive; font-size: 20px; color: darkslategray">
                ZATAKUB
              </div>
            </div>
          </q-toolbar-title>
        </q-btn>

        <q-tabs v-if="$q.screen.gt.sm" class="text-weight-bold">
          <q-route-tab style="text-transform: capitalize;" :to="'/product'">Khuyến Mãi</q-route-tab>
          <q-route-tab style="text-transform: capitalize;" :to="'/product'">Thương Hiệu</q-route-tab>
          <!-- Product begind -->
          <q-route-tab style="text-transform: capitalize;  " :to="'/product'">

            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
              @mouseover="menu_cat_product = true">
              Sản Phẩm
              <q-menu fit @mouseleave="menu_cat_product = false" v-model="menu_cat_product" transition-show="flip-right"
                transition-hide="flip-left">
                <q-list dense class="text-grey-9 text-caption">
                  <q-item to="/product/category/hair" clickable>
                    <q-item-section>Thuốc nhuộm tóc</q-item-section>
                  </q-item>
                  <q-item to="/product/category/whitening" clickable>
                    <q-item-section>Dưỡng Trắng</q-item-section>
                  </q-item>
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Combo</q-item-section>
                  </q-item>

                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Ringo - Nhật</q-item-section>
                  </q-item>
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>label. M - Anh</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
            </div>

          </q-route-tab>
          <!-- Product end -->

          <q-route-tab style="text-transform: capitalize;" @click="saveMark">Giới Thiệu</q-route-tab>
          <q-route-tab style="text-transform: capitalize;" @click="saveDrawItemF">Liên Hệ</q-route-tab>

          <!-- markt begin -->
          <q-route-tab style="text-transform: capitalize;  " :to="'/product'">

            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
              @mouseover="menu_cat_mark = true">
              Thương hiệu
              <q-menu fit @mouseleave="menu_cat_mark = false" v-model="menu_cat_mark" transition-show="flip-right"
                transition-hide="flip-left">
                <q-list dense class="text-grey-9 text-caption">
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Wella - Đức</q-item-section>
                  </q-item>
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Oyster - Ý</q-item-section>
                  </q-item>
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Algo - Ý</q-item-section>
                  </q-item>

                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>Ringo - Nhật</q-item-section>
                  </q-item>
                  <q-item @click="$router.push('/category')" clickable>
                    <q-item-section>label. M - Anh</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
            </div>

          </q-route-tab>
          <!-- markt end -->
        </q-tabs>
        <!-- to shoping cart -->
        <q-btn class="absolute-top-right q-mt-sm q-mr-md" flat icon="shop" to="/shopping">
          <q-badge color="red" floating transparent>
            {{ cartItemCount }}
          </q-badge>
        </q-btn>
        <q-btn v-if="role === 'ADMIN' || role === 'USER'" class="absolute-top-right q-mt-sm q-mr-md" color="red"
          label="Log Out" @click="logout" />
      </q-toolbar>


    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" bordered class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list padding>

          <q-item clickable v-ripple to="/product/sale">
            <q-item-section avatar>
              <q-img src="/img/icon/saleIcon.png" style="color: coral;" />
            </q-item-section>

            <q-item-section> Khuyến mãi </q-item-section>
          </q-item>

          <div v-for="(qItem, index) in drawItems" :key="index">

            <q-item clickable v-ripple :to="qItem.link"
              @mouseover="qItem.menu_cat = true, fmouseoverAllowOnlyOne(qItem)">
              <q-item-section avatar>
                <q-img :src="qItem.imgLink" style="color: coral;" />
              </q-item-section>

              <q-item-section> {{ qItem.title }} </q-item-section>
            </q-item>

            <q-menu style="min-height:3.5rem" @mouseover="qItem.menu_cat = true" fit v-model="qItem.menu_cat" anchor="top right" self="top left"
              @mouseleave="qItem.menu_cat = false">
              <div class="row" style="max-width:500px">
                <q-list style="min-width: 100px" v-for="mark in qItem.markDtos" :key="mark">
                  <q-item clickable v-close-popup :to="mark.toLink">

                    <q-item-section >
                      <div >
                      <q-badge style="background-color:aliceblue"><q-btn icon="delete" size="xs" flat color="negative" @click="deleteMark(qItem.markDtos,mark)"></q-btn></q-badge>

                      <div>
                        {{ mark.label }}
                      </div>

                      </div>

                    </q-item-section>


                  </q-item>

                </q-list>
                <div v-if="ro == 'admin'">

                  <div v-if="inputAddMarkt == true" v-for="addMark, i in qItem.markDtos.filter(m => {
  return m.name == ''
})" :key="i">
                    <q-input class="q-mt-md" label="new mark" v-model="qItem.markDtos.filter(m => {
  return m.name == ''
})[i].label" square filled style="width:6rem" autogrow></q-input>

                  </div>
                  <q-btn icon="add" flat color="positive"
                    @click="inputAddMarkt = true, addMarkForCategory(qItem.markDtos)"></q-btn>

                  <q-btn v-if="inputAddMarkt == true" label="save" color="positive" @click="saveMark(qItem.markDtos.filter(m => {
  return m.name == ''
}))"></q-btn>
                </div>

              </div>

            </q-menu>

          </div>






          <q-item v-if="role === 'ADMIN' || role === 'USER'" clickable v-ripple to="/admin">
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
        <q-btn dense round unelevated color="accent" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>

    <!-- (Optional) The Footer -->

    <q-footer>


      <q-tabs v-if="!$q.screen.gt.sm" switch-indicator style="background-color: cadetblue">
        <q-route-tab icon="yard" :to="{ name: 'product', params: { id: 1 } }" replace label="Khuyến mãi" />
        <q-route-tab icon="book_online" to="/aboutMe" replace label="" />
      </q-tabs>
    </q-footer>



    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view :key="$route.path" />
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


{/* <q-item v-if="role == ''" clickable v-ripple to="/deliveryStatus">
            <q-item-section avatar >
              <q-img src="/img/icon/instagram.png" />
            </q-item-section>

            <q-item-section>My Pham Duc </q-item-section>
          </q-item> */}
// src="~assets/img/roomInKonstanz.png"
// const drawItems = ref([
//   { role: 'admin', link: '/admin', imgLink: '/img/icon/admin.png', title: 'Admin', menu_cat: false, },

//   { role: '', link: '/deliveryStatus', imgLink: '/img/icon/instagram.png', title: 'Tim Don', menu_cat: false, },

//   {
//     role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairstyle.png', title: 'Màu nhuộm tại nhà', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/product/category/hairCosmetic', imgLink: '/img/icon/layout/salonCosmetic.png', title: 'Mỹ phẩm tóc', menu_cat: false


//   },

//   {
//     role: '', link: '/product/category/skin', imgLink: '/img/icon/layout/skin.png', title: 'Mỹ phẩm Da', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairdevice.png', title: 'Dụng cụ làm tóc', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/iconMan.png', title: 'Mỹ phẩm nam', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/product/category/america', imgLink: '/img/icon/americanFlag.png', title: 'Thương hiệu Mỹ ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' }
//       ,]
//   },



//   {
//     role: '', link: '/product/category/australia', imgLink: '/img/icon/flag/australia.png', title: 'Thương hiệu Úc ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/product', imgLink: '/img/icon/flag/korean.png', title: 'Thương hiệu Hàn ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/productt', imgLink: '/img/icon/flag/england.png', title: 'Thương hiệu Anh ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/productt', imgLink: '/img/icon/flag/france.png', title: 'Thương hiệu Pháp ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },


//   {
//     role: '', link: '/productt', imgLink: '/img/icon/flag/italy.png', title: 'Thương hiệu Ý ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },

//   {
//     role: '', link: '/productt', imgLink: '/img/icon/flag/japan.png', title: 'Thương hiệu Nhật ', menu_cat: false, mark: [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/germany/mark/spWella', label: 'OLAPLEX' },
//     { toLink: '/product/category/america/mark/goldWell', label: 'CHI' }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX' },

//     ]
//   },



// ])


const drawItems = ref([
  { role: 'admin', link: '/admin', imgLink: '/img/icon/admin.png', title: 'Admin', menu_cat: false, },

  { role: '', link: '/deliveryStatus', imgLink: '/img/icon/instagram.png', title: 'Tim Don', menu_cat: false, },

  {
    role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairstyle.png', title: 'Màu nhuộm tại nhà', menu_cat: false,
  },

  {
    role: '', link: '/product/category/hairCosmetic', imgLink: '/img/icon/layout/salonCosmetic.png', title: 'Mỹ phẩm tóc', menu_cat: false


  },

  {
    role: '', link: '/product/category/skin', imgLink: '/img/icon/layout/skin.png', title: 'Mỹ phẩm Da', menu_cat: false,
  },

  {
    role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairdevice.png', title: 'Dụng cụ làm tóc', menu_cat: false
  },

  {
    role: '', link: '/product/category/manCosmetic', imgLink: '/img/icon/layout/iconMan.png', title: 'Mỹ phẩm nam', menu_cat: false,
  },

  {
    role: '', link: '/product/category/america', imgLink: '/img/icon/americanFlag.png', title: 'Thương hiệu Mỹ ', menu_cat: false,
  },



  {
    role: '', link: '/product/category/australia', imgLink: '/img/icon/flag/australia.png', title: 'Thương hiệu Úc ', menu_cat: false,
  },

  {
    role: '', link: '/product', imgLink: '/img/icon/flag/korean.png', title: 'Thương hiệu Hàn ', menu_cat: false,
  },

  {
    role: '', link: '/productt', imgLink: '/img/icon/flag/england.png', title: 'Thương hiệu Anh ', menu_cat: false,
  },

  {
    role: '', link: '/productt', imgLink: '/img/icon/flag/france.png', title: 'Thương hiệu Pháp ', menu_cat: false,
  },


  {
    role: '', link: '/productt', imgLink: '/img/icon/flag/italy.png', title: 'Thương hiệu Ý ', menu_cat: false,
  },

  {
    role: '', link: '/productt', imgLink: '/img/icon/flag/japan.png', title: 'Thương hiệu Nhật ', menu_cat: false,
  },

])

const addMarks = ref([

])
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


    const ro = computed({
      get: () => $store.state.cache.ro,
    });


    axios.get(`${WebApi.server}/allDrawItem`).then(re => {
      // let draw = []
      drawItems.value = re.data.sort((a, b) => a.id - b.id)

      console.log("draw ", drawItems.value)
    })
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

      drawItems,
      logout,
      amountItem,
      leftDrawerOpen,
      drawer: ref(false),
      miniState,
      card_cookie: ref(true),
      menu_cat_mark: ref(false),
      menu_cat_product: ref(false),
      inputAddMarkt: ref(false),


      ro,
      role,
      addMarks,

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
  methods: {
    fmouseoverAllowOnlyOne(item) {
      drawItems.value.forEach(d => {
        d.menu_cat = false
      })
      item.menu_cat = true

    },
    saveDrawItemF() {
      axios.post(`${WebApi.server}/saveDrawItem`, this.drawItems).then(
        console.log("SAve DrawItem")
      )
    },
    saveMark(newMarks) {
      // let arr = [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI', drawItemId: 7 }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX', drawItemId: 7 }]

      console.log("params " + this.$route.params)

      console.log("params.category " + this.$route.params.category)


      newMarks.forEach(nm => {
        nm.toLink = '/product/category/' + this.$route.params.category + '/mark/' + nm.label
        // nm.drawItemId =
      })

      console.log("newMarks ", newMarks)
      axios.post(`${WebApi.server}/saveMark`, newMarks).then(
        console.log("SAve Mark")
      )
    },
    addMarkForCategory(arr) {
      arr.push({ name: '', drawItemId: arr[0].drawItemId })

    },
    deleteMark(markDtos,mark){
     let i = markDtos.indexOf(mark)

      markDtos.splice(i,1)

      axios.delete(`${WebApi.server}/deleteMarkBy/`+mark.id).then(
        console.log("delete ")
      )
    }


  }
};
</script>
<style>
.self-stretch {
  align-self: center;
  /* align-self: stretch; */
}
</style>
