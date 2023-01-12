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


          <q-route-tab @click="setRole">SETADMIN</q-route-tab>
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

          <q-item v-if="ro == 'admin'" clickable v-ripple to="/admin">
            <q-item-section avatar>
              <q-img src="/img/icon/admin.png" style="color: coral;" />
            </q-item-section>

            <q-item-section> Admin</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/product/sale">
            <q-item-section avatar>
              <q-img src="/img/icon/saleIcon.png" style="color: coral;" />
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

            <q-item clickable v-ripple :to="qItem.link"
              @mouseover="qItem.menu_cat = true, fmouseoverAllowOnlyOne(qItem)">
              <q-item-section avatar>
                <q-img :src="qItem.imgLink" style="color: coral;" />
              </q-item-section>

              <q-item-section> {{ qItem.title }} </q-item-section>
            </q-item>
            <div>

            </div>
            <q-menu v-if="qItem.menu_cat == true" style="min-height:3.5rem" @mouseover="fmouseoverAllowOnlyOne(qItem)"
              fit v-model="qItem.menu_cat" anchor="top right" self="top left" @mouseleave="qItem.menu_cat = false">
              <div class="row" style="max-width:500px">
                <q-list style="min-width: 100px" v-for="mark in qItem.markDtos" :key="mark">
                  <q-item clickable v-close-popup :to="mark.toLink">

                    <q-item-section>
                      <div>
                        <q-badge v-if="ro == 'admin'" style="background-color:aliceblue"><q-btn icon="delete" size="xs"
                            flat color="negative" @click="deleteMark(qItem.markDtos, mark)"></q-btn></q-badge>

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
                    @click="inputAddMarkt = true, addMarkForCategory(qItem)"></q-btn>

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

      <!-- notice image beginn -->
      <div>
        <div>

          <q-item v-if="$q.screen.gt.sm" style="padding: 0px 0px" clickable to="/product/sale">
            <q-img style="height:45px" :src="'/img/upload/notice/' + noticeImageDesktop.imageUrl"></q-img>
          </q-item>

          <q-item v-else style="padding: 0px 0px" clickable to="/product/sale">
            <q-img style="height:45px" :src="'/img/upload/notice/' + noticeImageMobil.imageUrl"></q-img>
          </q-item>
        </div>
        <div v-if="ro == 'admin'" class="flex flex-center">
          <q-btn  icon="edit" @click="editNoticeImage_dialog = true"></q-btn>
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
          <div class="animation-text"  style="color:red;">Zatakub chúc quý khách một năm mới an khang thịnh vượng</div>
          <div>
            <q-img class="animation-scooter" style="height:auto ; width:80px"   src="/img/upload/notice/tetmeo.jpg"/>

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



const drawItems = ref([

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
    role: '', link: '/product/category/korean', imgLink: '/img/icon/flag/korean.png', title: 'Thương hiệu Hàn ', menu_cat: false,
  },

  {
    role: '', link: '/product/category/england', imgLink: '/img/icon/flag/england.png', title: 'Thương hiệu Anh ', menu_cat: false,
  },

  {
    role: '', link: '/product/category/france', imgLink: '/img/icon/flag/france.png', title: 'Thương hiệu Pháp ', menu_cat: false,
  },


  {
    role: '', link: '/product/category/italy', imgLink: '/img/icon/flag/italy.png', title: 'Thương hiệu Ý ', menu_cat: false,
  },

  {
    role: '', link: '/product/category/japan', imgLink: '/img/icon/flag/japan.png', title: 'Thương hiệu Nhật ', menu_cat: false,
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

    const selected_file = ref()
    const noticeImageMobil = ref({})
    const noticeImageDesktop = ref({})

    axios.get(`${WebApi.server}/getNoticeImage`).then((res) => {
      let noticeImages = res.data
      noticeImageMobil.value = noticeImages.find(ni => { return ni.category == 'mobil' })
      noticeImageDesktop.value = noticeImages.find(ni => { return ni.category == 'desktop' })

      console.log("noticeImageMobil.value ", noticeImageMobil.value)
      console.log("noticeImageDesktop.value ", noticeImageDesktop.value)
    })


    const ro = computed({
      get: () => $store.state.cache.ro,
    });


    axios.get(`${WebApi.server}/allDrawItem`).then(re => {
      // let draw = []
      drawItems.value = re.data.sort((a, b) => a.id - b.id)

      console.log("show drawItem", drawItems.value)

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
      $router.replace("/");
    };
    return {
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
  methods: {

    file_selected(file) {

      console.log("files ", file)

      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },

    uploadFile() {

      const fd = new FormData();

      console.log("this.selected_file ", this.selected_file)
      fd.append("file", this.selected_file);

      console.log("fdd ", fd)
      axios.post(`${WebApi.server}/uploadNoticeImage`, fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
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

        axios.post(`${WebApi.server}/saveNoticeImageUrl`, saveObject).then(
          console.log("Save img ", saveObject)
        )


      }
    },
    setRole() {
      this.$store.dispatch("cache/setAdminRole")

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

      console.log("DarawItems ", drawItems.value)
      axios.post(`${WebApi.server}/saveDrawItem`, this.drawItems).then(
      )
    },
    saveMark(newMarks) {
      // let arr = [{ toLink: '/product/category/america/mark/goldWell', label: 'CHI', drawItemId: 7 }, { toLink: '/product/category/america/mark/spWella', label: 'OLAPLEX', drawItemId: 7 }]


      newMarks.forEach(nm => {
        nm.toLink = '/product/category/' + this.$route.params.category + '/mark/' + nm.label
        // nm.drawItemId =
      })

      axios.post(`${WebApi.server}/saveMark`, newMarks).then(
        this.$q.notify(
          {
            message: " product was updated",

            color: "positive",
            avatar: `${WebApi.iconUrl}`,
          }
        )
      )
    },
    addMarkForCategory(qItem) {

      qItem.markDtos.push({ name: '', drawItemId: qItem.id })

    },
    deleteMark(markDtos, mark) {

      this.$q.dialog(
        {
          title: 'Xác nhận Xóa ',
          message: 'Bạn có thực sự muốn xóa  ' + mark.label + ' không?',
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
        axios.delete(`${WebApi.server}/deleteMarkBy/` + mark.id).then(() => {


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


  }
};
</script>
<style>
.self-stretch {
  align-self: center;
  /* align-self: stretch; */
}

.animation{
  width: 100%;
}
.animation-text{
  font-weight: bold;
  color: #fbfbfb;
  animation-name: rightToLeft;
  animation-duration:25s;
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
.animation-scooter{
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
    left: calc(100% - 100px);
   }
  100% {
    left: 0;
  }
}
</style>
