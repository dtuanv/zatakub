<template>
  <div style="" class="q-pt-sm q-pl-sm">
    <q-card  style="border: 5px solid cornflowerblue;min-height: 17rem;">
      <q-card-section >
        <div class="row">
          <div class="col-5">
            <div v-if="product.imageUrl != ''">
              <img
                :src="'/img/' + product.imageUrl"
                alt=""
                style=" max-width: 100%; display:block;border: 2px solid cadetblue;height: 9rem;"
              />
            </div>
            <q-btn
                class="q-mt-sm q-ml-sm"
                color="green"
                @click="dialog_detail = true"
                label="Chi Tiet"
              ></q-btn>
          </div>

          <div class="col-7 q-pl-sm">
            <div
              class="flex flex-center"
              style="font-family: emoji; font-size: 1em; "
            >
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
                  <div
                    class="flex flex-center"
                    style="color: red; font-size: 1em; width: 100%;font-family: fantasy;"
                  >
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

      <q-card-actions >
        <div class="row" style="width: 100%">
          <div class="row" style="width: 52%">
            <div style="padding-top: 5px; font-size: 1em">Số lượng:</div>

            <div class="">
              <q-btn
                @click="subtractItem()"
                icon="remove"
                color="negative"
                flat
              ></q-btn>
            </div>
            <q-item style="padding-left: 0px; padding-right: 0px">{{
              countItem
            }}</q-item>
           <div style="padding-left:2px">
            <q-btn

            @click="addItem()"
            icon="add"
            color="positive"
            flat
          ></q-btn>
           </div>


          </div>

          <div class="" style="width: 45%">
            <div
              class="row"
              style="border: 2px solid cadetblue; color: coral; height: 2em"
            >
              <q-btn
                style="padding-bottom: 0.5em"
                @click="addToCart()"
                class="float-right"
                icon="add_shopping_cart"
                flat
              />

              <div>
                <q-item
                  style="
                    padding-left: 0px;
                    min-height: 1px;
                    padding-bottom: 0px;
                    padding-top: 2px;
                    padding-right: 0px;
                  "
                  class=""
                  clickable
                  @click="addToCart()"
                  >Thêm giỏ hàng</q-item
                >
              </div>
            </div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="dialog_detail">
      <q-card style="max-width:90%;">
        <q-card-section>
          <div style="max-width:50%;border: 5px solid cadetblue;">
            <q-img :src="'/img/' + product.imageUrl" />
          </div>
          <div>{{product.name}}</div>
        </q-card-section>
        <q-card-actions>
          <div>hi</div>
        </q-card-actions>


        <q-card-actions @click="toggleText(index)" class="flex flex-center" >
          <q-item clickable style="width:10% " class="flex flex-center">
            <div >
              <div  > More</div>
            <div class="flex flex-center">
              <q-icon name="expand_more" size="md"></q-icon>
              <q-icon name="expand_more" size="xs"></q-icon>
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
      stars: ref(4),
      addItem,
      countItem,
      subtractItem,
      countCart,
      priceWithDiscount,
      numberWithCommas,
      dialog_detail:ref(false)
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
