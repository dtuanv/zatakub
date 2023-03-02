<template>
  <q-layout :view="$q.screen.gt.sm ? 'hHh Lpr lff' : 'hHh lpR lFf'" class="bg-grey-1">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="" style="background-color:  #326e51;;">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" style="    margin-right: 4vw;" to="/">
          <q-avatar style="width: 51px; height: 39px"><img src="/img/icon/logo.jpg" alt="logo" /></q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            <div class="">
              <div :style="$q.platform.is.mobile ? 'font-family: emoji;' : 'font-family: cursive;'"
                style=" font-size: 20px; color: white">
                Zatakub
              </div>
            </div>
          </q-toolbar-title>
        </q-btn>
        <!-- new header -->

        <!--
        <div v-if="!$q.platform.is.mobile"  class="column">
          <div >
            <div class="row" style="height: 20px; padding-top: 4px; ">
              <a href="/product/category/skin/mark/Sữa%20rửa%20mặt" style="text-decoration: auto; color: white;font-size: 12px;">Sửa rửa mặt</a>
              <a class="q-ml-sm" href="/product/category/manCosmetic/mark/Gel%20-%20Wax%20tạo%20kiểu%20tóc" style="text-decoration: auto; color: white;font-size: 12px;">Gel-Wax tạo kiểu tóc</a>
              <a class="q-ml-sm" href="/product/category/essentialOil/mark/Tinh%20dầu%20thiên%20nhiên" style="text-decoration: auto; color: white;font-size: 12px;">Tinh dầu thiên nhiên</a>
              <a class="q-ml-sm" href="/product/category/beautyEquipment/mark/Masage%20mặt" style="text-decoration: auto; color: white;font-size: 12px;">Massage mặt</a>
            </div>
          </div>
          <div  style="    padding-bottom: 12px;padding-top:5px;">
            <q-select hide-dropdown-icon label="Nhập tên sản phẩm" use-input style=" padding-left:10px;background: #fff; color: #666; border: none; ">
            <template v-slot:append>
              <q-icon style="color:orange" name="search"></q-icon>
            </template>
          </q-select>
          </div>

        </div> -->

        <div class="flex flex-center" style="width:80%">


          <div v-if="!$q.platform.is.mobile" class="q-mr-sm">
            <q-item clickable to="/login">
              <q-item-section>
                <q-icon size="md" name="shopping_bag"></q-icon>
              </q-item-section>
              <q-tem-section class="q-pt-sm">
                Lịch sử đơn hàng
              </q-tem-section>
            </q-item>


          </div>
          <div v-if="!$q.platform.is.mobile">
            <q-item clickable>
              <q-item-section style="padding-top:2px">
                <q-avatar><img src="/img/icon/phoneHeader.png" alt="logo"></q-avatar>
              </q-item-section>
              <q-tem-section class="q-ml-xs q-mt-sm" style="padding-top:4px">
                Hotline: 0389 059 923
              </q-tem-section>
            </q-item>

          </div>
          <div v-if="!$q.platform.is.mobile" class="q-mr-md">
            <q-item clickable to="/login">
              <q-item-section>
                <q-icon size="md" name="person"></q-icon>
              </q-item-section>
              <q-tem-section class="q-pt-sm">
                Đăng nhập
              </q-tem-section>
            </q-item>
          </div>

          <div v-if="!$q.platform.is.mobile" class="q-mr-md">
            <q-item clickable to="/login">
              <q-item-section>
                <q-icon size="md" name="settings_accessibility"></q-icon>
              </q-item-section>
              <q-tem-section class="q-pt-sm">
                Đăng ký
              </q-tem-section>
            </q-item>
          </div>

        </div>


        <!-- to shoping cart -->
        <q-btn v-if="role !== 'ADMIN' && role !== 'USER'" :class="$q.platform.is.mobile ? 'q-mt-sm' : 'q-mt-md'"
          class="absolute-top-right  q-mr-md" flat icon="shop" to="/shopping">
          <q-badge color="red" floating transparent>
            {{ cartItemCount }}
          </q-badge>
        </q-btn>
        <q-btn v-if="role === 'ADMIN' || role === 'USER'" class="absolute-top-right q-mt-sm q-mr-md " color="red"
          label="Log Out" @click="logout" />

        <q-btn v-if="customerId > 0" class="absolute-top-right q-mt-sm  " style="margin-right:80px" color="red"
          label="Logout" @click="logoutCustomer" />

      </q-toolbar>


    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" bordered class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list padding>

          <q-item v-if="customerId > 0" clickable v-ripple to="/cusOrderManager">
            <q-item-section avatar>
              <q-img src="/img/icon/admin.png" style="color: coral;" alt="anhAdmin" />
            </q-item-section>

            <q-item-section> Quản lý đơn</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/product/sale" @mouseover="mouseOverResetAllMenuCat()">
            <q-item-section avatar>
              <q-img src="/img/icon/saleIcon.png" style="color: coral;" alt="anhSale" />
            </q-item-section>

            <q-item-section> Khuyến mãi </q-item-section>
          </q-item>

          <!-- <q-item clickable v-ripple to="/deliveryStatus" @mouseover="drawItems[0].menu_cat = false">
            <q-item-section avatar>
              <q-img src="/img/icon/instagram.png" style="color: coral;" />
            </q-item-section>

            <q-item-section> Tim Don </q-item-section>
          </q-item> -->



          <div v-for="(qItem, index) in drawItems" :key="index">

            <q-item clickable v-ripple :to="qItem.link" @mouseover="qItem.menu_cat = true, fmouseoverAllowOnlyOne(qItem)">
              <q-item-section avatar>
                <q-img :src="qItem.imgLink" style="color: coral;" alt="anhLink" />
              </q-item-section>

              <q-item-section> {{ qItem.title }} </q-item-section>
            </q-item>
            <div>

            </div>
            <q-menu v-if="qItem.menu_cat == true" style="min-height:3.5rem" @mouseover="fmouseoverAllowOnlyOne(qItem)" fit
              v-model="qItem.menu_cat" anchor="top right" self="top left" @mouseleave="qItem.menu_cat = false">
              <div class="row" style="max-width:500px">
                <q-list style="min-width: 100px" v-for="mark in qItem.markDtos" :key="mark">
                  <q-item clickable v-close-popup :to="mark.toLink">

                    <q-item-section>
                      <div>
                        <q-badge v-if="ro == 'admin' && role === 'ADMIN'" style="background-color:aliceblue"><q-btn
                            icon="delete" size="xs" flat color="negative"
                            @click="deleteMark(qItem.markDtos, mark)"></q-btn></q-badge>

                        <div>


                          {{ mark.label }}
                        </div>

                      </div>

                    </q-item-section>


                  </q-item>

                </q-list>
                <div v-if="ro == 'admin' && role === 'ADMIN'">

                  <div v-if="inputAddMarkt == true" v-for="addMark, i in qItem.markDtos.filter(m => {
                    return m.name == ''
                  })" :key="i">
                    <q-input class="q-mt-md" label="Danh mục mới" v-model="qItem.markDtos.filter(m => {
                      return m.name == ''
                    })[i].label" square filled style="min-width:1rem" autogrow></q-input>

                  </div>
                  <q-btn icon="add" flat color="positive"
                    @click="inputAddMarkt = true, addMarkForCategory(qItem)"></q-btn>

                  <q-btn v-if="inputAddMarkt == true" label="save" color="positive" @click="saveMark(qItem.markDtos.filter(m => {
                    return m.name == ''
                  }), qItem)"></q-btn>
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


          <q-item v-if="role === 'ADMIN' || role === 'USER'" clickable @click="setRole">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              <div v-if="ro == 'admin'">
                OFF EDIT
              </div>

              <div v-else>
                ON EDIT

              </div>

            </q-item-section>
          </q-item>


          <div v-if="customerId == 0">
            <q-item v-if="role == ''" clickable v-ripple to="/loginPage">
              <q-item-section avatar>
                <q-icon name="admin_panel_settings" />
              </q-item-section>

              <q-item-section> ADL </q-item-section>
            </q-item>

            <q-item v-else clickable v-ripple @click.prevent="logout">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> LogOut </q-item-section>
            </q-item>

          </div>


          <q-item v-if="customerId > 0" clickable v-ripple @click.prevent="logoutCustomer">
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Đăng xuất </q-item-section>
          </q-item>
          <q-item v-else clickable v-ripple to="/login">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Đăng nhập</q-item-section>
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

    <q-footer style="background-color: burlywood;">

      <div class="flex flex-center">
        <q-tabs v-if="!$q.screen.gt.sm" switch-indicator style="background-color: burlywood;">


          <q-item clickable style="padding:0px 0px; margin: 5px 15px 5px 20px;" href="tel:+840389059923" target="_blank">
            <q-item-section>
              <q-avatar>
                <img src="/img/icon/call.png" alt="call">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item clickable style="padding:0px 0px; margin: 5px 15px 5px 15px;"
            href="https://shopee.vn/shop/196811123?utm_source=an_17171860000&utm_medium=affiliates&utm_campaign=&utm_content=SellerVN-196811123"
            target="_blank">
            <q-item-section>
              <q-avatar>
                <img src="/img/icon/shopee.png" alt="shoppe">
              </q-avatar>
            </q-item-section>
          </q-item>


          <q-item clickable style="padding:0px 0px; margin: 5px 15px 5px 15px;"
            href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub" target="_blank">
            <q-item-section>
              <q-avatar>
                <img src="/img/icon/facebook.png" alt="facebook">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item clickable style="padding:0px 0px; margin: 5px 15px 5px 15px;"
            href="https://www.instagram.com/myphamtocchinhhangzatakub/" target="_blank">
            <q-item-section>
              <q-avatar>
                <img src="/img/icon/instagram.png" alt="instagram">
              </q-avatar>
            </q-item-section>
          </q-item>


          <q-item clickable style="padding:0px 0px; margin: 5px 15px 5px 15px;"
            href="https://www.lazada.vn/shop/zatakub/?path=promotion-36612-0.htm&tab=promotion" target="_blank">
            <q-item-section>
              <q-avatar>
                <img src="/img/icon/lazada.png" alt="lazada">
              </q-avatar>
            </q-item-section>
          </q-item>
          <!-- <q-route-tab icon="book_online" to="/aboutMe" replace label="" /> -->
        </q-tabs>
      </div>

    </q-footer>



    <q-page-container>

      <!-- notice image beginn -->
      <div>
        <div>

          <q-item v-if="$q.screen.gt.sm" style="padding: 0px 0px" clickable to="/product/sale">
            <q-img style="height:45px" :src="'/img/upload/notice/mungxuan.png'" alt="mungxuan"></q-img>
          </q-item>


          <!-- noticeImageMobil.imageUrl   noticeImageDesktop.imageUrl -->
          <q-item v-else style="padding: 0px 0px" clickable to="/product/sale">
            <q-img style="height:45px" :src="'/img/upload/notice/mungxuanDt.png'" alt="mungxuanDt"></q-img>
          </q-item>
        </div>
        <div v-if="ro == 'admin' && role === 'ADMIN'" class="flex flex-center">
          <q-btn icon="edit" @click="editNoticeImage_dialog = true"></q-btn>
        </div>

        <div>
          <q-dialog v-model="editNoticeImage_dialog">
            <q-card>
              <q-card-section>
                <div class="flex flex-center text-h5">Thay Ảnh khác</div>
                <div>

                  <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected"
                    label="Tải ảnh lên" with-credentials color="purple" square flat bordered style="max-width: 300px" />


                </div>
              </q-card-section>

              <q-card-actions class="flex flex-center">
                <div>
                  <q-btn color="positive" label="Save" @click="saveNoticeImage"></q-btn>
                </div>
              </q-card-actions>
            </q-card>

          </q-dialog>
        </div>


        <div class="animation" style="width:100%">
          <div v-if="$q.screen.gt.sm" class="animation-text row" style="color:red;">
            <div>
              Zatakub xin chúc mừng năm mới. Mong 1 năm đầy may lành, hạnh phúc, thành công, sức khoẻ dồi dào tới tất cả
              mọi người.
            </div>
            <div>
              <q-avatar size="xs">
                <img src="/img/upload/notice/phaohoa.png" alt="phaohoa">
              </q-avatar>
              <q-avatar size="xs">
                <img src="/img/upload/notice/phaohoaicon.jpg" alt="phaohoa">
              </q-avatar>
              <!-- <q-img  src="/img/upload/notice/phaohoa.png">
              </q-img>
              <q-img  src="/img/upload/notice/phaohoaicon.jpg">
              </q-img> -->
            </div>
          </div>
          <div v-else class="animation-text-mobil" style="color:red;">Zatakub gửi lời chúc mừng năm mới tới tất cả mọi
            người.
          </div>
          <div style="width:100%" class="row">
            <div v-if="$q.screen.gt.sm" class="col-11">
              <q-img v-if="$q.screen.gt.sm" src="/img/upload/notice/cmnm.jpg" alt="cmnm"
                style="height:auto ; width:100px; background-image: none;" flat></q-img>

              <q-img class="animation-scooter" style="height:auto ; width:100px" alt="chuctet"
                src="/img/upload/notice/2023chuc.png" />

              <q-img v-if="$q.screen.gt.sm" class="animation-scooter" alt="daynoitet" style="height:auto ; width:100px"
                src="/img/upload/notice/daynoitet.jpg" />

              <q-img class="animation-scooter" style="height:auto ; width:100px" src="/img/upload/notice/quymao2.png"
                alt="quymao" />
              <q-img v-if="$q.screen.gt.sm" class="animation-scooter" style="height:auto ; width:100px"
                src="/img/upload/notice/daynoitet.jpg" alt="daynoitet" />

              <q-img class="animation-scooter" style="height:auto ; width:100px" src="/img/upload/notice/tetdenroi.png"
                alt="tetdenroi" />
            </div>

            <div v-else class="col-12">

              <q-img class="animation-scooter-mobil" style="height:auto ; width:100px"
                src="/img/upload/notice/2023chuc.png" alt="chuctet" />
              <q-img class="animation-scooter-mobil" style="height:auto ; width:100px"
                src="/img/upload/notice/quymao2.png" alt="quymao" />

              <q-img class="animation-scooter-mobil" style="height:auto ; width:100px"
                src="/img/upload/notice/tetdenroi.png" alt="tetdenroi" />
            </div>

            <!--
            <div class="col-1" v-if="$q.screen.gt.sm">
              <q-img src="/img/upload/notice/hoamai.jpg" style="height:auto ; width:100px; background-image: none;"
                class="float-right" alt="hoamai"></q-img>
            </div> -->




          </div>
        </div>


      </div>



      <!-- notice image end -->

      <!-- This is where pages get injected -->
      <router-view :key="$route.fullPath" />
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



// const drawItems = ref([

//   {
//     role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairstyle.png', title: 'Màu nhuộm tại nhà', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/hairCosmetic', imgLink: '/img/icon/layout/salonCosmetic.png', title: 'Mỹ phẩm tóc', menu_cat: false


//   },

//   {
//     role: '', link: '/product/category/skin', imgLink: '/img/icon/layout/skin.png', title: 'Mỹ phẩm Da', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/hairDevice', imgLink: '/img/icon/layout/hairdevice.png', title: 'Dụng cụ làm tóc', menu_cat: false
//   },

//   {
//     role: '', link: '/product/category/manCosmetic', imgLink: '/img/icon/layout/iconMan.png', title: 'Mỹ phẩm nam', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/america', imgLink: '/img/icon/americanFlag.png', title: 'Thương hiệu Mỹ ', menu_cat: false,
//   },



//   {
//     role: '', link: '/product/category/australia', imgLink: '/img/icon/flag/australia.png', title: 'Thương hiệu Úc ', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/korean', imgLink: '/img/icon/flag/korean.png', title: 'Thương hiệu Hàn ', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/england', imgLink: '/img/icon/flag/england.png', title: 'Thương hiệu Anh ', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/france', imgLink: '/img/icon/flag/france.png', title: 'Thương hiệu Pháp ', menu_cat: false,
//   },


//   {
//     role: '', link: '/product/category/italy', imgLink: '/img/icon/flag/italy.png', title: 'Thương hiệu Ý ', menu_cat: false,
//   },

//   {
//     role: '', link: '/product/category/japan', imgLink: '/img/icon/flag/japan.png', title: 'Thương hiệu Nhật ', menu_cat: false,
//   },

// ])

const drawItems = ref([])

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


    // console.log("customer  in tore ", customer.value)
    const customerIdLocal = localStorage.getItem("customerId")
    if (customerIdLocal) {
      $store.dispatch("cache/customerLogin", customerIdLocal);

    }

    const customerId = computed({
      get: () => $store.state.cache.customerId,
    });


    // console.log("customer ID in tore ", customerId.value)
    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });




    const selected_file = ref()
    const noticeImageMobil = ref({})
    const noticeImageDesktop = ref({})

    // axios.get(`${WebApi.server}/getNoticeImage`,

    // ).then((res) => {
    //   let noticeImages = res.data
    //   noticeImageMobil.value = noticeImages.find(ni => { return ni.category == 'mobil' })
    //   noticeImageDesktop.value = noticeImages.find(ni => { return ni.category == 'desktop' })


    // })


    const ro = computed({
      get: () => $store.state.cache.ro,
    });


    // const drawItemsStore = computed({
    //   get: () => $store.state.cache.drawItems,
    // });

    // console.log("drawItems ", drawItemsStore)

    // drawItems.value = drawItemsStore.value



    axios.get(`${WebApi.server}/allDrawItem`).then(re => {
      // let draw = []
      drawItems.value = re.data.sort((a, b) => a.orderDrawItem - b.orderDrawItem)

    })
    const role = computed({
      get: () => $store.state.loginModule.role,
    });

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
      $router.push("/product/sale");
      localStorage.clear();
      window.location.reload();
    };
    return {
      customerId,
      jwt,
      selected_file,
      noticeImageMobil,
      noticeImageDesktop,
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
      editNoticeImage_dialog: ref(false),

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

  // mounted() {
  //   this.$store.dispatch("cache/setDrawItems");
  // },
  methods: {

    logoutCustomer() {
      localStorage.clear()
      this.$router.push("/product/sale");
      this.$store.dispatch("cache/customerLogout")

      this.$q.notify(
        {
          message: " Bạn đã đăng xuất",
          color: "positive",
          avatar: `${WebApi.iconUrl}`,
        }
      )

    },
    file_selected(file) {

      console.log("files ", file)

      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },

    uploadFile() {

      const fd = new FormData();

      fd.append("file", this.selected_file);

      console.log("fdd ", fd)
      axios.post(`${WebApi.server}/uploadNoticeImage`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,


      }).then(function (response) {
        if (response.data.ok) {

        }
      }.bind(this)).catch(error => {
        console.log(error);
      });;
    },

    saveNoticeImage() {

      let saveObject = {}
      if (this.selected_file != '' && this.selected_file != undefined) {
        this.uploadFile()
        if (this.$q.screen.gt.sm) {
          this.noticeImageDesktop.category = 'desktop'
          this.noticeImageDesktop.imageUrl = this.selected_file.name
          saveObject = this.noticeImageDesktop
        } else {
          this.noticeImageMobil.category = 'mobil'
          this.noticeImageMobil.imageUrl = this.selected_file.name

          saveObject = this.noticeImageMobil
        }

        axios.post(`${WebApi.server}/saveNoticeImageUrl`, saveObject,
          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(() => {

          this.editNoticeImage_dialog = false
          console.log("Save img ", saveObject)
        }

        )


      }
    },
    setRole() {
      this.$store.dispatch("cache/setAdminRole")

    },

    mouseOverResetAllMenuCat() {
      drawItems.value.forEach(d => {
        d.menu_cat = false
      })
    },

    fmouseoverAllowOnlyOne(item) {

      drawItems.value.forEach(d => {
        d.menu_cat = false
      })
      if (item.markDtos.length > 0 || this.ro == 'admin')
        item.menu_cat = true

    },
    saveDrawItemF() {
      // this.drawItems.forEach(d => {
      //   d.link = '/product/category/' + d.title
      // })

      axios.post(`${WebApi.server}/saveDrawItem`, this.drawItems,
        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }
      ).then(
      )
    },
    saveMark(newMarks, qItem) {

      console.log("g qItem ", qItem)

      // let arr = [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI', drawItemId: 7 }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX', drawItemId: 7 }]


      newMarks.forEach(nm => {
        nm.toLink = qItem.link + '/mark/' + nm.label
        // nm.drawItemId =
      })


      console.log("newMarks ", newMarks)

      axios.post(`${WebApi.server}/saveMark`, newMarks,
        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }
      ).then((re) => {

        qItem.menu_cat = false


        this.$router.push('/admin')

        this.$q.notify(
          {
            message: " Đã lưu danh mục",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          }
        )

      }
      )
    },
    addMarkForCategory(qItem) {

      console.log(" qItem ",)
      qItem.markDtos.push({ name: '', drawItemId: qItem.id })

    },
    deleteMark(markDtos, mark) {

      this.$q.dialog(
        {
          title: 'Xác nhận Xóa ',
          message: ' Bạn có thực sự muốn xóa mục ' + mark.label + ' không?',
          // cancel:true,


          persistent: true,//User can not dismmiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it!
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: 'negative'
          }

        }
      ).onOk(() => {
        axios.delete(`${WebApi.server}/deleteMarkBy/` + mark.id,
          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(() => {


          let i = markDtos.indexOf(mark)

          markDtos.splice(i, 1)

          this.$q.notify({
            message: 'Đã xóa ' + mark.label,
            color: 'positive',
            avatar: `${WebApi.iconUrl}`
          })
        }
        )
      }).onCancel(() => {
      }).onDismiss(() => {

      })

    },


  },

};
</script>
<style>
.q-item.q-router-link--active,
.q-item--active {
  color: cornflowerblue;

}

.self-stretch {
  align-self: center;
  /* align-self: stretch; */
}

.animation {
  width: 100%;
}

.animation-text {
  font-weight: bold;
  color: #fbfbfb;
  animation-name: rightToLeft;
  animation-duration: 40s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.animation-text-mobil {
  font-weight: bold;
  color: #fbfbfb;
  animation-name: rightToLeft;
  animation-duration: 15s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rightToLeft {
  0% {
    transform: translateX(100%);
  }


  100% {
    transform: translateX(-100%);

  }


}


.animation-scooter-mobil {

  animation: left-to-right-mobil 5s ease-in infinite forwards;

}

@keyframes left-to-right-mobil {
  /* 100% {
    transform: translateX(1100%);
  } */

  0% {
    left: 0;
  }

  50% {
    left: calc(100% - 290px);
  }

  100% {
    left: 0;
  }
}

/* .animation-image{
  border-image: url('../img/upload/notice/hoa.jpg');
border-image-width: 0 0 10px 0;
border-image-repeat: stretch;
} */
.animation-scooter {
  /* margin: 0 0 0 -400px;
  width: 30%;
  height: 30%; */
  /* transition: transform 10s ease-in; */
  animation: left-to-right 15s ease-in infinite forwards;


}

@keyframes left-to-right {
  /* 100% {
    transform: translateX(1100%);
  } */

  0% {
    left: 0;
  }

  50% {
    left: calc(100% - 570px);
  }

  100% {
    left: 0;
  }
}
</style>
