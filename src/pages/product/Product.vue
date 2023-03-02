<template>
  <q-page :class="$q.screen.lt.sm ? 'q-pa-md' : ' '">

    <!-- <div class="flex flex-center">
      <q-btn label="Admin edit" @click="setRole"></q-btn>
    </div> -->
<!--
    <div class="flex flex-center  " v-if="categoryPath != undefined">
      <div class="row" style="">
        <h1 class=" q-pl-sm"
          style="color: cadetblue; font-family: emoji; align-self: center;    margin: 0px 0px;font-size: 28px; display: inline-block; line-height: 3rem;">
          {{ categoryPath.title }}

        </h1>
        <div v-if="$route.params.mark" class="q-pa-sm text-h5 ">
          //
        </div>
        <div class="text-body q-pt-xs q-pr-sm" style="color:brown;align-self: center;">
          {{ $route.params.mark }}
        </div>
      </div>

    </div>
    <div v-else style="" class="flex flex-center">
      <h1 class="text-h5  q-pl-sm q-pr-sm"
        style="color: red; font-family: emoji;  margin: 0px 0px;font-size: 28px; display: inline-block; line-height: 3rem;">
        Sản phẩm HOT
      </h1>
    </div> -->


    <!-- <div style>
      <q-select rounded outlined label="Tất cả thương hiệu" transition-show="flip-up" transition-hide="flip-down"
        v-model="marktSelected" :options="marktOptions" style="width: 250px" />
    </div> -->


<!-- find product by name -->

    <!-- <div class="">

      <div class="flex flex-center q-mt-xs">
        <q-input style="width:30rem" v-model="findProduct" :rules="findProductValidate" label="Nhập tên sản phẩm"
          rounded outlined>
          <template v-slot:append>
            <q-btn flat icon="search" @click="findProductByName" />
          </template>
        </q-input>
      </div>
    </div> -->
    <div class="row q-mb-sm">

      <div style="display: flex; justify-content: flex-end;" :style="$q.platform.is.mobile ? '':'margin-left:6.2vw'">
        <q-select rounded outlined label="Sắp Xếp" v-model="filterSelected" :options="filterOptions"
          :style="$q.platform.is.mobile ? 'width: 170px' : 'width: 250px'" />
      </div>

      <div :class="$q.platform.is.mobile ? 'q-ml-sm q-mr-sm' : 'col-5'">

      </div>

      <div style="display: flex; justify-content: flex-end;" v-if="filterMarkOptions.length > 0">

        <q-select rounded outlined label="Lọc theo mục" v-model="filterMarkSelected" :options="filterMarkOptions"
          :style="$q.platform.is.mobile ? 'width: 170px' : 'width: 250px'" />
      </div>
    </div>


    <div class="q-ml-xl" v-if="ro == 'admin' && role === 'ADMIN'">
      <q-btn icon="add" @click="addNewProduct"></q-btn>
    </div>

    <div >
      <div class=" " >
        <div class="row flex flex-center" :style="$q.screen.lt.sm ? '' : ''">
          <!-- only Admin beginn -->

          <div v-if="ro == 'admin' && role === 'ADMIN'" :style="$q.screen.lt.sm ? 'width:50%' : 'width: 14rem;'"
            v-for="product in productsCategory" :key="product.id">
            <productBox :product="product"></productBox>
          </div>
          <!-- only Admin end -->


          <div v-else :style="$q.screen.lt.sm ? 'width:50%' : 'width: 14rem;'" v-for="product in productsCategory.filter(p => {
            return p.status == 'on'
          })" :key="product.id">
            <productBox :product="product"></productBox>
          </div>


        </div>
        <!-- <div > -->

        <div class="float-right" v-if="!$q.platform.is.mobile"
          :style="$q.screen.lt.sm ? '' : 'max-width:8%;position:fixed; z-index:200; right:0;top: 275px;'"
          :class="$q.screen.lt.sm ? 'row' : ''">
          <div class="q-pt-lg ">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/zalo.png" alt="zalo" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub"
              target="_blank">
              <q-avatar><img src="/img/icon/facebook.png" alt="fb" /></q-avatar>
            </q-btn>
          </div>

          <div class="q-pt-sm btnS">
            <q-btn class="btn" flat
              href="https://shopee.vn/shop/196811123?utm_source=an_17171860000&utm_medium=affiliates&utm_campaign=&utm_content=SellerVN-196811123"
              target="_blank">
              <q-avatar><img src="/img/icon/shopee.png" alt="shopee" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat href="https://www.lazada.vn/shop/zatakub/?path=promotion-36612-0.htm&tab=promotion"
              target="_blank">
              <q-avatar><img src="/img/icon/lazada.png" alt="lazada" /></q-avatar>
            </q-btn>
          </div>
          <div class="q-pt-sm">
            <q-btn class="btn" flat href="https://www.instagram.com/myphamtocchinhhangzatakub/" target="_blank">
              <q-avatar><img src="/img/icon/instagram.png" alt="instagram" /></q-avatar>
            </q-btn>
          </div>
          <!-- <div class="q-pt-sm">
            <q-btn class="btn" flat>
              <q-avatar><img src="/img/icon/sendo.png" alt="" /></q-avatar>
            </q-btn>
          </div> -->

        </div>
      </div>
    </div>

    <!-- <q-dialog v-model="hinweis_dialog" v-if="notice.status == 'on' && role != 'ADMIN'">
      <q-card style="width: 65vw; ">
        <q-card-action>
          <div class="flex flex-center text-h5" style="color:cadetblue;">Thông báo</div>

        </q-card-action>
        <q-separator></q-separator>
        <q-card-selections>
          <div class="q-pa-lg flex flex-center" >
            <div>
              <q-card-section  v-html="notice.description" />
              </div>
          </div>
        </q-card-selections>
      </q-card>

    </q-dialog> -->

  </q-page>
</template>
<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import Detail from "../customer/Detail.vue";

import productBox from "src/components/product/ProductBox.vue";
import Product from "/src/apis/Product.js";
import { WebApi } from "/src/apis/WebApi";

import meta from '/src/utils/meta.js'

const selected_file = ref('')


const marktOptions = [
  { label: 'Đức', name: 'duc' },
  { label: 'Ý', name: 'y' },
]


const filterOptions = [
  { label: 'Giá từ thấp đến cao', name: 'lowToHight' },
  { label: 'Giá từ cao đến thấp', name: 'hightToLow' },
  { label: 'Hot Sale', name: 'hotSale' },
]
const filterMarkOptions = ref([])

const productsCategory = ref([]);
const marktSelected = ref();
const filterSelected = ref();
const filterMarkSelected = ref();
const findProduct = ref('');

const categoryPath = ref({})

const products = ref([])
export default {
  components: { productBox },

  data() {
    return {
      metaTags: {
        description: 'Product',
        title: 'T Zatakub | Product',
        url: 'zatakub.com/product/sale',
        image: '#'
      }
    }
  },
  meta,
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    const $store = useStore();




    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });


    const router = useRouter();

    // console.log("IS Mobil ", $q.platform.is.mobile)

    axios.get(`${WebApi.server}/allDrawItem`).then(re => {
      // let draw = []

      categoryPath.value = re.data.find(d => { return d.link.includes(route.params.category) })

      if (categoryPath.value != undefined) {
        filterMarkOptions.value = categoryPath.value.markDtos

      }
    })

    const ro = computed({
      get: () => $store.state.cache.ro,
    });

    const role = computed({
      get: () => $store.state.loginModule.role,
    });


    const rou = route.params.mark

    const productsCategoryOrig = ref([])
    const category = ref(route.params.category)
    const mark = ref(route.params.mark)

    axios.get(`${WebApi.server}/allProduct`).then(re => {
      products.value = re.data

      products.value.sort((a, b) => b.id - a.id)


      if (route.params.category != undefined) {
        productsCategory.value = products.value.filter(p => {
          return p.category == route.params.category
        })
      } else {
        productsCategory.value = products
      }

      if (category.value != undefined) {
        productsCategory.value = products.value.filter(p => {
          return p.category == category.value
        })

        if (mark.value != undefined) {
          productsCategory.value = productsCategory.value.filter(m => {
            return m.mark == mark.value
          })
        }
      }

      if (route.path === '/product/sale') {
        productsCategory.value = products.value.filter(p => {
          return p.sale == 't'
        })
      }


      // console.log("productsCategory.value ", productsCategory.value)
    })
    // console.log("reset")
    // const products = computed({
    // get: () => $store.getters['cache/getProduct']
    // })

    // const products = ref([

    //   {
    //     id: 1,
    //     status: 'on',
    //     subtitle: "BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",

    //     imageUrl: "dauxa.png",
    //     name: "Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2",
    //     price: 130000,
    //     discount: 50,
    //     description: "",

    //     category: 'germany',
    //     mark: 'spWella',

    //     sale:'t',
    //   },
    //   {
    //     id: 2,
    //     status: 'on',

    //     imageUrl: "goidau.png",
    //     name: "Dau Goi Dau 3 Dau Goi Dau 3  Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2 ",
    //     price: 130000,
    //     discount: 20,
    //     description: "Dau Goi Dau De 3",
    //     category: 'hair',
    //     category: 'germany',
    //     mark: 'goldWell',

    //     sale:'t',
    //   },
    //   {
    //     id: 3,
    //     status: 'on',

    //     imageUrl: "goidau.png",
    //     name: "Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
    //     price: 130000,
    //     discount: 25,
    //     description: "Dau Goi Dau De 3",
    //     category: 'hair',
    //     category: 'germany',
    //     mark: 'goldWell',

    //     sale:'t',

    //   },
    //   {
    //     id: 4,
    //     status: false,

    //     imageUrl: "goidau.png",
    //     name: "Dau Goi Dau 4 F Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
    //     price: 130000,
    //     discount: 30,
    //     description: "Dau Goi Dau De 3",
    //     category: 'whitening',
    //     category: 'hairCosmetic',

    //     sale:'t',
    //   },
    //   {
    //     id: 5,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 30,
    //     description: "Dau Goi Dau De 3",
    //     category: 'whitening',
    //     category: 'america', mark: 'goldWell',

    //     sale:'t',

    //   },
    //   {
    //     id: 6,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 30,
    //     description: "Dau Goi Dau De 3",
    //     category: 'combo',
    //     category: 'german',

    //     mark: 'goldWell'

    //   },
    //   {
    //     id: 7,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 30,
    //     description: "Dau Goi Dau De 3",
    //   },
    //   {
    //     id: 8,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 40,
    //     description: "Dau Goi Dau De 3",
    //     category: 'hairCosmetic',

    //   },
    //   {
    //     id: 9,
    //     status: 'off',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 50,
    //     description: "Dau Goi Dau De 3",
    //     category: 'hairCosmetic',
    //   },
    //   {
    //     id: 10,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 10,
    //     description: "Dau Goi Dau De 3",
    //     category: 'hairCosmetic',
    //   },
    //   {
    //     id: 11,
    //     status: 'on',

    //     imageUrl: "nau.png",
    //     name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
    //     price: 130000,
    //     discount: 12,
    //     description: "Dau Goi Dau De 3",
    //   },
    // ])


    const notice = ref({});
    // axios.get(`${WebApi.server}/getNotice/productPage`).then((response) => {
    //   notice.value = response.data;
    // });

    const checkParam = ref(route.params.category)
    function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return Math.round((priceInt * (1 - rest)) / 1000) * 1000;
    }
    function removeAccents(str) {
      return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');

    }



    return {
      jwt,
      categoryPath,
      products,
      productsCategoryOrig,
      notice,
      hinweis_dialog: ref(true),
      productsCategory,
      checkParam,
      marktSelected,
      filterSelected,
      filterMarkSelected,
      marktOptions,
      filterOptions,
      filterMarkOptions,
      priceWithDiscount,
      findProduct,
      removeAccents,
      admin_edit: ref(false),
      editNoticeImage_dialog: ref(false),
      ro,
      role,
      selected_file,

      findProductValidate: [
        (val) =>
          (val !== null &&
            val !== "" &&
            !!val) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Vui lòng nhập đúng số đơn ạ!",
        // (val) =>
        //   (val.charAt(0) == 0 && !!val) || "Bitte geben Sie die richtige Telefonnummer mit 0 am Anfang ein",

      ],

    };

  },
  mounted() {
    // this.$store.dispatch("cache/getProduct");
  },
  data() { },
  methods: {
    file_selected(file) {

      console.log("files ", file)

      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },

    uploadFile() {

      const fd = new FormData();

      fd.append("file", this.selected_file);

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

    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },

    findProductByName() {
      const productsOrig = productsCategory.value

      if (this.findProduct.length == 0) {
        productsCategory.value = productsOrig
      }
      var findName = this.findProduct
      productsCategory.value = productsCategory.value.filter(p => {

        return this.removeAccents(p.name).toLowerCase().includes(this.removeAccents(findName).toLowerCase())
      })

    },
    setRole() {
      this.$store.dispatch("cache/setAdminRole")

    },
    addNewProduct() {
      let intiProduct = productsCategory.value.find(p => {
        return p.id === 0
      })

      // if (intiProduct == undefined) {


      productsCategory.value.push(
        {
          id: 0,
          status: 'off',
          imageUrl: "roomInKonstanz.png",
          imageUrl2: "",
          imageUrl3: "",
          imageUrl4: "",

          name: "",
          price: 0,
          discount: 0,
          subtitle: "Sửa ở dưới.....",
          body: 'subtitle.png',

          description: "....",

          sale: 'f',

        },
      )
      productsCategory.value = productsCategory.value.sort((a, b) => a.id - b.id)

    }



  },
  components: { Detail, productBox },
  watch: {
    '$route'(to, from) {
      const category = to.params.category
      // this.AJAXRequest(id)
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

    findProduct(newFind, old) {




      if (old.length === 0) {
        this.productsCategoryOrig = productsCategory.value
      }

      this.findProductByName()
      if (newFind.length < old.length) {

        productsCategory.value = this.productsCategoryOrig
        this.findProductByName()
      }

    },
    products() {
    },

    filterMarkSelected() {
      this.$router.push(filterMarkSelected.value.toLink)

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
