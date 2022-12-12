<template>
  <q-page :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-sm'">

    <div class="" >

        <div class="flex flex-center q-mt-lg" >
          <q-input  style="width:30rem" v-model="findProduct" :rules="findProductValidate" label="Nhập tên sản phẩm" rounded outlined >
            <template v-slot:append>
              <q-btn flat icon="search" @click="findProductByName"/>
        </template>
      </q-input>
        </div>
      </div>
    <div class="row">
      <div class="col-4">
        <q-select label="Tất cả thương hiệu" transition-show="flip-up" transition-hide="flip-down" filled
          v-model="marktSelected" :options="marktOptions" style="width: 250px" />
      </div>
      <div class="col-2"></div>
      <div class="col-4">
        <q-select label="Sắp Xếp" transition-show="flip-up" transition-hide="flip-down" filled v-model="filterSelected"
          :options="filterOptions" style="width: 250px" />
      </div>

    </div>

    <div>
      <div class="row">
        <div class="row" :style="$q.screen.lt.sm ? '' : 'width:92%'">
          <div :style="$q.screen.lt.sm ? 'width:100%' : 'width: 19rem;'" v-for="product in productsCategory.filter(p => {
            return p.status == true
          })" :key="product.id">
            <productBox :product="product"></productBox>
          </div>
        </div>
        <!-- <div > -->

        <div :style="$q.screen.lt.sm ? '' : 'max-width:8%'" :class="$q.screen.lt.sm ? 'row' : ''">
          <div class="q-pt-lg ">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/zalo.png" alt="" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/facebook.png" alt="" /></q-avatar>
            </q-btn>
          </div>

          <div class="q-pt-sm btnS">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/shopee.png" alt="" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/lazada.png" alt="" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/instagram.png" alt="" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat>
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

const marktOptions = [
  { label: 'Đức', name: 'duc' },
  { label: 'Ý', name: 'y' },
]


const filterOptions = [
  { label: 'Giá từ thấp đến cao', name: 'lowToHight' },
  { label: 'Giá từ cao đến thấp', name: 'hightToLow' },
  { label: 'Hot Sale', name: 'hotSale' },
]


const productsCategory = ref([]);
const marktSelected = ref();
const filterSelected = ref();
const findProduct = ref('');
export default {
  components: { productBox },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
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
        status: true,
        imageUrl: "goidau.png",
        imageUrl2: "dauxa.png",
        imageUrl3: "nau.png",

        name: "Dầu gội Yunsey dành cho nam For Men 380ml",
        price: "130000",
        discount: 30,
        subtitle: "BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",
        body: 'subtitle.png',
        body1: "123 Thường: cho tóc hư tổn có chất tóc sợi mỏng, mảnh",
        body2: "123+: cho tóc hư tổn có chất tóc sợi trung bình",
        body3: "123X: cho tóc hư tổn có chất tóc sợi to, dày",
        body4: "cho 2 tóc hư tổn có chất tóc sợi trung bình",


        description: "description.png",
        category: 'hair',
      },
      {
        id: 1,
        status: true,
        subtitle: "BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",

        imageUrl: "dauxa.png",
        name: "Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2",
        price: "130000",
        discount: 50,
        description: "",
      },
      {
        id: 2,
        status: true,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 3 Dau Goi Dau 3  Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2 ",
        price: "130000",
        discount: 20,
        description: "Dau Goi Dau De 3",
        category: 'hair',

      },
      {
        id: 3,
        status: true,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
        price: "130000",
        discount: 25,
        description: "Dau Goi Dau De 3",
        category: 'hair',

      },
      {
        id: 4,
        status: false,

        imageUrl: "goidau.png",
        name: "Dau Goi Dau 4 F Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
        category: 'whitening',

      },
      {
        id: 5,
        status: true,

        imageUrl: "nau.png",
        name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
        category: 'whitening',

      },
      {
        id: 6,
        status: true,

        imageUrl: "nau.png",
        name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
        price: "130000",
        discount: 30,
        description: "Dau Goi Dau De 3",
        category: 'combo',

      },
      {
        id: 7,
        status: true,

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
    console.log("products.value", products);
    if (route.params.category != undefined) {
      productsCategory.value = products.filter(p => {
        return p.category == route.params.category
      })
    } else {
      productsCategory.value = products
    }


    const checkParam = ref(route.params.category)
    function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return priceInt * (1 - rest);
    }
    function removeAccents(str) {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
    return {
      goToSushi,
      products,
      vorspeiseProducts,
      notice,
      hinweis_dialog: ref(true),
      productsCategory,
      checkParam,
      marktSelected,
      filterSelected,
      marktOptions,
      filterOptions,
      priceWithDiscount,
      findProduct,
      removeAccents,
        findProductValidate: [
        (val) =>
          (val !== null &&
            val !== "" &&
            !!val ) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Vui lòng nhập đúng số đơn ạ!",
        // (val) =>
        //   (val.charAt(0) == 0 && !!val) || "Bitte geben Sie die richtige Telefonnummer mit 0 am Anfang ein",

      ],

    };
  },
  mounted() {
    this.$store.dispatch("cache/getProduct");
  },
  data() { },
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },

    findProductByName(){
      const productsOrig = productsCategory.value

      if(this.findProduct.length == 0){
        productsCategory.value = productsOrig
      }
      var findName = this.findProduct
      productsCategory.value = productsCategory.value.filter(p => {
        console.log(" p.name.includes(this.findProduct) ",this.removeAccents(p.name).includes(this.removeAccents(findName)))
        console.log("this.removeAccents(p.name) ",this.removeAccents(p.name)," findName   ",this.removeAccents(findName))

        // return this.removeAccents(p.name).search(findName) !== -1
        return this.removeAccents(p.name).toLowerCase().includes(this.removeAccents(findName).toLowerCase())
        // return p.name.includes(findName)
      })
      console.log("findProduct ",this.findProduct)

    }



  },
  components: { Detail, productBox },
  watch: {
    '$route'(to, from) {
      const category = to.params.category
      // this.AJAXRequest(id)
      console.log("change product", category)
      if (category != undefined) {
        productsCategory.value = this.products.filter(p => {
          return p.category == category
        })
      } else {
        productsCategory.value = this.products
      }
    },
    filterSelected() {
      if (filterSelected.value.name == 'lowToHight') {
        productsCategory.value = productsCategory.value.sort((a, b) => this.priceWithDiscount(a.price, a.discount) - this.priceWithDiscount(b.price, b.discount))
      }
      if (filterSelected.value.name == 'hightToLow') {
        productsCategory.value = productsCategory.value.sort((a, b) => this.priceWithDiscount(b.price, b.discount) - this.priceWithDiscount(a.price, a.discount))
      }

      if (filterSelected.value.name == 'hotSale') {
        productsCategory.value = productsCategory.value.sort((a, b) => b.discount - a.discount)
      }

    },

    findProduct(newFind ,old){

     if(newFind.length < old.length){

      productsCategory.value = this.products
     }
    }

  }
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

.btn:hover {
  background: lightgreen;
}
</style>
