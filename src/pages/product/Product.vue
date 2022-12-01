<template>
  <q-page :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-sm'">
    <div>
      <div class="row" >
        <div class="row" :style="$q.screen.lt.sm ? '' : 'max-width:92%'">
          <div
            :style="$q.screen.lt.sm ? 'width:100%' : 'width: 19rem;'"
            v-for="product in products.filter(p =>{
             return p.status == true
            })"
            :key="product.id"
          >
            <productBox :product="product" ></productBox>
          </div>
        </div>
        <!-- <div > -->

        <div :style="$q.screen.lt.sm ? '':'max-width:8%'" :class="$q.screen.lt.sm ? 'row':''">
          <div class="q-pt-lg">
            <q-btn>
            <q-avatar><img src="/img/icon/zalo.png" alt="" /></q-avatar>
          </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn>
            <q-avatar><img src="/img/icon/facebook.png" alt="" /></q-avatar>
          </q-btn>
          </div>

          <div class="q-pt-sm">
            <q-btn>
            <q-avatar><img src="/img/icon/shopee.png" alt="" /></q-avatar>
          </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn>
            <q-avatar><img src="/img/icon/lazada.png" alt="" /></q-avatar>
          </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn>
            <q-avatar><img src="/img/icon/instagram.png" alt="" /></q-avatar>
          </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn>
            <q-avatar><img src="/img/icon/sendo.png" alt="" /></q-avatar>
          </q-btn>
          </div>

        </div>
      </div>
    </div>
    <q-dialog v-model="hinweis_dialog" v-if="notice.status == 'on'">
      <q-card style="width: 65vw">
        <q-card-action>
          <div class="flex flex-center text-h5" style="color: cadetblue">
            Hinweis
          </div>
        </q-card-action>
        <q-separator></q-separator>
        <q-card-selections>
          <div class="q-pa-lg flex flex-center">
            <div>
              {{ notice.description }}
            </div>
          </div>
        </q-card-selections>
      </q-card>
    </q-dialog>

    <div class="q-mt-lg">status Prodkut wurde erstellt! spater für Admin Seite muss Infor der Status anzeigen! </div>
  </q-page>
</template>
<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import Detail from "../customer/Detail.vue";
// import productBox from "src/components/product/ProductBoxOrig.vue";
// import productBox from '@/path/to/product/ProductBox.vue'
import productBox from "src/components/product/ProductBox.vue";
import Product from "/src/apis/Product.js";
import { WebApi } from "/src/apis/WebApi";

// const products = ref([]);
export default {
  components: { productBox },
  setup() {
    const $q = useQuasar();
    // $q.screen.setSizes({ xs: 900 });
    // scroll To element
    const sushi = ref(null);

    const goToSushi = () => {
      sushi.value?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    // End Scroll to Element
    const $store = useStore();

    const router = useRouter();

    // const products = computed({
    //   get: () => $store.state.cache.products,
    // });

    const products = [
      {
        id: 0,
        status:true,
        imageUrl: "goidau.png",
        imageUrl2: "dauxa.png",
        imageUrl3: "nau.png",

        name: "Dầu gội Yunsey dành cho nam For Men 380ml",
        price: "130000",
        discount: 30,
        subtitle:"BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",
        body:'subtitle.png',
        body1:"123 Thường: cho tóc hư tổn có chất tóc sợi mỏng, mảnh",
        body2:"123+: cho tóc hư tổn có chất tóc sợi trung bình",
        body3:"123X: cho tóc hư tổn có chất tóc sợi to, dày",
        body4:"cho 2 tóc hư tổn có chất tóc sợi trung bình",


        description:"description.png"
      },
      {
        id: 1,
        status:true,
        subtitle:"BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",

        imageUrl: "dauxa.png",
        name: "Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2",
        price: "130000",
        discount: 30,
        description: "",
      },
      {
        id: 2,
        status:true,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 3 Dau Goi Dau 3  Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2 ",
        price: "130000",
        discount: 20,
        description: "Dau Goi Dau De 3",
      },
      {
        id: 3,
        status:true,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
      },
      {
        id: 4,
        status:false,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 4 F Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
      },
      {
        id: 5,
        status:true,

        imageUrl: "nau.png",
        name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
      },
      {
        id: 6,
        status:true,

        imageUrl: "nau.png",
        name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
      },
      {
        id: 7,
        status:true,

        imageUrl: "nau.png",
        name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
      },
    ];

    const vorspeiseProducts = computed({
      get: () => $store.state.cache.vorspeiseProducts,
    });

    const notice = ref({});
    axios.get(`${WebApi.server}/getNotice/productPage`).then((response) => {
      notice.value = response.data;
    });
    // console.log("sushiProducts", sushiProducts);
    return {
      goToSushi,
      products,
      vorspeiseProducts,
      notice,
      hinweis_dialog: ref(true),
    };
  },
  mounted() {
    this.$store.dispatch("cache/getProduct");
  },
  data() {},
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
  },
  components: { Detail, productBox },
};
</script>
<style>
.qInput {
  width: 100%;
  max-width: 40em;
  display: inline-block;
}
.my-card {
  width: 100%;
  height: 100%;
  /* max-height: 450px;
    max-width : 300px */
}
.q-card__actions .q-btn {
  padding: 0px 0px;
}
.containerT {
  margin-inline: auto;
  width: (min(90%), 70.5em);
}
.q-card__section--vert {
  padding: 0rem 0.75rem 0px 0px;
}
</style>
