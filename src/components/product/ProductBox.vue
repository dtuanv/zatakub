<template>
  <div style="" class="q-pt-sm q-pl-sm">
    <q-card style="border: 5px solid cornflowerblue;min-height: 17rem;">
      <q-card-section>
        <div class="row">
          <div class="col-5">
            <div v-if="product.imageUrl != ''">
              <img :src="'/img/' + product.imageUrl" alt=""
                style=" max-width: 100%; display:block;border: 2px solid cadetblue;height: 9rem;" />
            </div>
            <q-btn class="q-mt-sm q-ml-sm" color="green" @click="dialog_detail = true"
              style="text-transform: capitalize;" label="Chi Tiet"></q-btn>
          </div>

          <div class="col-7 q-pl-sm">
            <div class="flex flex-center" style="font-family: emoji; font-size: 1em; ">
              {{ product.name }}
            </div>


            <!-- Chitiet -->
            <div class="col-5">


              <!--  -->

              <!-- Dícount -->
              <div class="col-7 q-mt-md" style="border: 5px solid rosybrown">
                <div>
                  <div class="flex flex-center row">
                    <div style="text-decoration: line-through">
                      {{ numberWithCommas(product.price) }} đ
                    </div>
                    <div style="color: red; font-size: 1em;font-family: cursive;" class="q-ml-xs">
                      (-{{ product.discount }})%
                    </div>
                  </div>
                  <div class="flex flex-center" style="color: red; font-size: 1em; width: 100%;font-family: fantasy;">
                    {{
                        numberWithCommas(
                          priceWithDiscount(product.price, product.discount)
                        )
                    }}
                    đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <div class="row" style="width: 100%">
          <div class="row" style="width: 52%">
            <div style="padding-top: 5px; font-size: 1em">Số lượng:</div>

            <div class="">
              <q-btn @click="subtractItem()" icon="remove" color="negative" flat></q-btn>
            </div>
            <q-item style="padding-left: 0px; padding-right: 0px">{{
                countItem
            }}</q-item>
            <div style="padding-left:2px">
              <q-btn @click="addItem()" icon="add" color="positive" flat></q-btn>
            </div>


          </div>

          <div class="" style="width: 45%">
            <div class="row" style="border: 2px solid cadetblue; color: coral; height: 2.2em">
              <q-btn style="padding-bottom: 0.5em" @click="addToCart()" class="float-right" icon="add_shopping_cart"
                flat />

              <div>
                <q-item style="
                    padding-left: 0px;
                    min-height: 1px;
                    padding-bottom: 0px;
                    padding-top: 2px;
                    padding-right: 0px;
                  " class="" clickable @click="addToCart()">Thêm giỏ hàng</q-item>
              </div>
            </div>
          </div>
        </div>
      </q-card-actions>
    </q-card>



    <!-- detail     dialog  -->
    <q-dialog v-model="dialog_detail">
      <q-card :style="$q.screen.lt.sm ? 'max-height:70%' : 'max-width:42%;'">
        <q-card-section style="max-width:100%;padding-right: 0px;">
          <div style="max-width:100%;border: 5px solid cadetblue;">
            <div class="row">
              <div class="col-10">

              </div>
              <div class="col-2" style="display: flex; justify-content: flex-end;">
                <q-btn @click="(dialog_detail = false)" flat style="position: fixed; z-index: 200;padding: 0px 0px 0px 0px; margin-left: 30px; background-color: aquamarine;"
                fixed icon="close" class="float-right" color="negative" ></q-btn>

              </div>
            </div>
            <q-carousel style="    height: 276px;" swipeable animated v-model="slide" thumbnails infinite>

              <q-carousel-slide v-if="product.imageUrl" :name="1" :img-src="'/img/' + product.imageUrl"
                style="background-size: contain;" />

              <q-carousel-slide v-if="product.imageUrl2" :name="2" :img-src="'/img/' + product.imageUrl2"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl3" :name="3" :img-src="'/img/' + product.imageUrl3"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl4" :name="4" :img-src="'/img/' + product.imageUrl4"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl5" :name="5" :img-src="'/img/' + product.imageUrl4"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl6" :name="6" :img-src="'/img/' + product.imageUrl4"
                style="background-size: contain;" />
            </q-carousel>

          </div>
          <div class="flex flex-center q-mt-sm  " style="font-size: 1.2rem;padding: 0px 14px;color: cadetblue;">{{
              product.name
          }}</div>
          <q-separator></q-separator>
          <div v-if="product.subtitle" class="q-pl-lg q-pr-sm" style="    font-size: 0.8rem;">
            {{ product.subtitle }}
          </div>
          <div class="q-pl-lg q-pr-md">

            <ul style="padding-left:0px ;list-style-image: linear-gradient(to left bottom, red, blue);">
              <li v-if="product.body1">{{ product.body1 }}</li>
              <li v-if="product.body2">{{ product.body2 }}</li>
              <li v-if="product.body3">{{ product.body3 }}</li>
              <li v-if="product.body4">{{ product.body4 }}</li>
            </ul>
          </div>

        </q-card-section>
        <q-separator></q-separator>


        <!-- ------------------------------------------Test more --------------------------------------------------- -->
        <q-card-actions>
          <div class="row q-mt-sm" style="width:100vw">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-tabs v-model="tab" dense align="left" class="bg-primary text-white shadow-2" :breakpoint="0">
                <q-tab style="text-transform: capitalize;" name="Description" label="Mo Ta" />
                <q-tab style="text-transform: capitalize;" name="Ratings & Reviews" label="Ratings & Reviews" />
                <q-tab style="text-transform: capitalize;" name="test" label="test" />

              </q-tabs>
              <q-tab-panels v-if="readMore" style="border: 1px solid lightgrey" v-model="tab">
                <q-tab-panel name="Description">
                  <div v-if="readMore">Decriptionsss</div>
                </q-tab-panel>


                <q-tab-panel name="Ratings & Reviews">

                </q-tab-panel>

                <q-tab-panel name="test">

                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
          <!-- -----------------------Test--more end -->
        </q-card-actions>
        <div v-if="readMore == true">
          <q-item clickable style="width:100%" class="flex flex-center" @click="readMore = false, readMoreBtn = true">
            <div>
              <div class="flex flex-center">
                <q-icon name="expand_less" size="md"></q-icon>
              </div>
              <div class="flex flex-center"> Less</div>

            </div>
          </q-item>
        </div>



        <q-card-actions v-if="readMoreBtn" style="padding: 9px 0px 0px 0px;"
          @click="readMore = true, readMoreBtn = false" class="flex flex-center ">
          <q-item clickable style="width: 90%;padding:0px 1px; " class="flex flex-center shadow-14">
            <div>
              <div>Bam de Xem Them (Mo Ta...)</div>
              <div class="flex flex-center">
                <q-icon name="expand_more" size="md"></q-icon>
              </div>
            </div>
          </q-item>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
// import { count } from 'console';
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
const $q = useQuasar();
import { WebApi } from "/src/apis/WebApi";

export default {
  name: "productBox",
  props: ["product"],
  setup() {
    const $store = useStore();
    let countItem = ref(0);
    let countCart = ref(0);
    // $store.state.cart.products.quantity
    // const test = $store.state.cart.quantity
    function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return priceInt * (1 - rest);
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function addItem() {
      this.countItem++;
    }
    function subtractItem() {
      if (countItem.value === 0) {
        this.countItem = 0;
        return;
      }
      if (countItem.value > 0) {
        this.countItem--;
      }
    }
    if ($store.state.cache.cart.length > 1) {
      let productInCart = $store.state.cache.cart.find((item) => {
        return item.product.id != undefined;
      });

    }

    return {
      slide: ref(1),
      stars: ref(4),
      readMore: ref(false),
      readMoreBtn: ref(true),
      tab: ref('Description'),
      addItem,
      countItem,
      subtractItem,
      countCart,
      priceWithDiscount,
      numberWithCommas,
      dialog_detail: ref(false)
      // addToCart,
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cache/addProductToCart", {
        product: this.product,
        quantity: this.countItem,
      });
      if (this.countItem > 0) {
        this.$q.notify({
          message: "Đã thêm vào giỏ hàng.",
          color: "positive",
          avatar: `${WebApi.iconUrl}`,
        });
      } else {
        this.$q.notify({
          message: "Số lượng phải lớn hơn 0",
          color: "negative",
          avatar: `${WebApi.iconUrl}`,
        });
      }
    },
  },
  computed: {},
};
</script>
<style>

</style>
