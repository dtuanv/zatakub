<template>
  <q-page :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-sm'">


    <!-- <div class="flex flex-center">
      <q-btn label="Admin edit" @click="setRole"></q-btn>
    </div> -->

    <div class="flex flex-center row " v-if="categoryPath != undefined">
      <div class="text-h5" style="color: cadetblue; font-family: emoji;">
        {{ categoryPath.title }}

      </div>
      <div v-if="$route.params.mark" class="q-pa-sm text-h5">
        //
      </div>
      <div class="text-body q-pt-xs" style="color:brown">
        {{ $route.params.mark }}
      </div>
    </div>
    <div v-else>
        <div class="text-h5 flex flex-center" style="color: red; font-family: emoji;" >HOT SALE %%</div>
    </div>


    <!-- <div style>
      <q-select rounded outlined label="Tất cả thương hiệu" transition-show="flip-up" transition-hide="flip-down"
        v-model="marktSelected" :options="marktOptions" style="width: 250px" />
    </div> -->



    <div class="">

      <div class="flex flex-center q-mt-lg">
        <q-input style="width:30rem" v-model="findProduct" :rules="findProductValidate" label="Nhập tên sản phẩm"
          rounded outlined>
          <template v-slot:append>
            <q-btn flat icon="search" @click="findProductByName" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mb-sm">

      <div style="display: flex; justify-content: flex-end;">
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


    <div v-if="ro == 'admin'">
      <q-btn icon="add" @click="addNewProduct"></q-btn>
    </div>

    <div>
      <div class="row">
        <div class="row" :style="$q.screen.lt.sm ? '' : 'width:92%'">
          <!-- only Admin beginn -->

          <div v-if="ro == 'admin'" :style="$q.screen.lt.sm ? 'width:100%' : 'width: 19rem;'"
            v-for="product in productsCategory" :key="product.id">
            <productBox :product="product"></productBox>
          </div>
          <!-- only Admin end -->


          <div v-else :style="$q.screen.lt.sm ? 'width:100%' : 'width: 19rem;'" v-for="product in productsCategory.filter(p => {
  return p.status == 'on'
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
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    const $store = useStore();

    const router = useRouter();

    console.log("IS Mobil ", $q.platform.is.mobile)

    axios.get(`${WebApi.server}/allDrawItem`).then(re => {
      // let draw = []

      console.log(" router.params ", route.params)
      categoryPath.value = re.data.find(d => { return d.link.includes(route.params.category) })

      console.log("categoryPath.value ", categoryPath.value)
      if (categoryPath.value != undefined) {
        filterMarkOptions.value = categoryPath.value.markDtos

      }
      console.log("categoryPath", categoryPath)
    })

    const ro = computed({
      get: () => $store.state.cache.ro,
    });


    const rou = route.params.mark

    console.log("rou  ", rou)
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


      console.log("productsCategory.value ", productsCategory.value)
    })
    console.log("reset")
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
      return priceInt * (1 - rest);
    }
    function removeAccents(str) {
      return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');

    }

    console.log("productsCategory.value  out", productsCategory.value)


    return {
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
      ro,
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

      if (intiProduct == undefined) {
        productsCategory.value.push(
          {
            id: 0,
            status: 'off',
            imageUrl: "roomInKonstanz.png",
            imageUrl2: "",
            imageUrl3: "",
            imageUrl4: "",

            name: "Nhap Ten Tai Day",
            price: 130000,
            discount: 30,
            subtitle: "BỘ .....",
            body: 'subtitle.png',

            description: "miêu tả",

            sale: 'f',

          },
        )
        productsCategory.value = productsCategory.value.sort((a, b) => a.id - b.id)
      }
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
      console.log("p")
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
