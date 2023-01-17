  <template>

      <div class="justify-center flex " v-if="item.quantity > 0">

<div class="q-ma-sm row">

  <q-chip @click="dialog_product = true" clickable>
    <!-- <div class="column">
      <div>
        <q-btn icon="add" @click="moreItem(item)" style="font-size: 8px;padding: 2px 5px;color:yellowgreen;"
          flat></q-btn>
      </div>
      <div>
        <q-btn icon="remove" @click="subtractItem(item)" flat
          style="font-size: 8px;padding: 2px 5px;color:red"></q-btn>

      </div>
    </div> -->
    <div style="margin-right: 24px">{{ item.quantity }} x </div>
    <div>
      <q-avatar>
        <img :src="'/img/upload/product/' + item.product.imageUrl">
      </q-avatar>
    </div>

    <div v-if="$q.platform.is.mobile">

      {{ getThreeWords(item.product.name) }}
      <!-- {{ item.product.name }} -->
      <q-badge> = {{ numberWithCommas(item.itemTotal) }} đ</q-badge>
    </div>
    <div v-else>
      {{ item.product.name }}
      <q-badge> = {{ numberWithCommas(item.itemTotal) }} đ</q-badge>
    </div>
  </q-chip>


</div>
</div>

<q-dialog v-model="dialog_product">
  <q-card>
    <q-card-section>

      <div class="row">
          <div class="col-5">
            <div v-if="item.product.imageUrl != ''">
              <img :src="'/img/upload/product/' + item.product.imageUrl" alt=""
                style=" max-width: 100%; display:block;border: 2px solid cadetblue;height: 9rem;" />
            </div>
            <!-- <q-btn class="q-mt-sm q-ml-sm" color="green" @click="dialog_detail = true"
              style="text-transform: capitalize;" label="Chi Tiet"></q-btn> -->
          </div>

          <div class="col-7 q-pl-sm">
            <div class="flex flex-center" style="font-family: emoji; font-size: 1em; ">
              {{ item.product.name }}
            </div>


            <!-- Chitiet -->
            <div class="col-5">


              <!--  -->

              <!-- Dícount -->
              <div class="col-7 q-mt-md" style="border: 5px solid rosybrown">
                <div>
                  <div class="flex flex-center row">
                    <div style="text-decoration: line-through">
                      {{ numberWithCommas(item.product.price) }} đ
                    </div>
                    <div style="color: red; font-size: 1em;font-family: cursive;" class="q-ml-xs">
                      (-{{ item.product.discount }})%
                    </div>
                  </div>
                  <div class="flex flex-center" style="color: red; font-size: 1em; width: 100%;font-family: fantasy;">
                    {{
    numberWithCommas(
      priceWithDiscount(item.product.price, item.product.discount)
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
  </q-card>
</q-dialog>

  </template>

  <script>

import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { priceCalculator, getThreeWords } from "/src/logic/logic.js";
  export default{

    name:'itemInCardBox',

    props:['item'],
    setup(){

      function numberWithCommas(x) {
      let round = Math.round(x)
      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return Math.round((priceInt * (1 - rest)) / 1000) * 1000 ;
    }

      return{
        numberWithCommas,
        dialog_product : ref(false),
        dialog_detail : ref(false),
        priceWithDiscount,
        getThreeWords,
      }
    },
    methods:{
      checkChip(){
        console.log("Hi")
      },
      subtractItem(item) {
      if (item.quantity > 0) {
        this.$store.dispatch("cache/changeNumItemInCart", {
          product: item.product,
          quantity: item.quantity,
          action: 'SUBTRACT'
        });
      }
      else {
        this.$q.notify({
          message: "Số lượng phải lớn hơn 0",
          color: "negative",
          avatar: `${WebApi.iconUrl}`,
        });
      }

    },



    moreItem(item) {
      // let countItem = item.quantity + 1

      this.$store.dispatch("cache/changeNumItemInCart", {
        product: item.product,
        quantity: item.quantity,
        action: 'ADD'
      });

    },

    removeProductFromCart(product) {
      this.$store.dispatch("cache/removeProductFromCart", product);
    },


    }

  }
</script>
