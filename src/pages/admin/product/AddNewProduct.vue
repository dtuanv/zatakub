<template>
  <div style="" class="q-pt-sm q-pl-sm">
    <q-card style="border: 5px solid cornflowerblue;min-height: 17rem;">
      <q-card-section>
        <div>

          <q-btn icon="edit" @click='editProduct(product)' dense></q-btn>



          <q-btn class="float-right" icon="delete" color="negative" @click='deleteProduct(product)' dense></q-btn>
        </div>

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

      <q-card :style="$q.screen.lt.sm ? 'max-height:70%' : 'max-width:60%;'">

        <q-btn icon="edit" @click='editProductDetail(product)' dense @dblclick="open_editor = false"></q-btn>

        <q-card-section style="max-width:100%;padding-right: 0px;">
          <div style="max-width:100%;border: 5px solid cadetblue;">
            <div class="row">
              <div class="col-10">

              </div>
              <div class="col-2" style="display: flex; justify-content: flex-end;">
                <q-btn @click="(dialog_detail = false)" flat
                  style="position: fixed; z-index: 200;padding: 0px 0px 0px 0px; margin-left: 30px; background-color: aquamarine;"
                  fixed icon="close" class="float-right" color="negative"></q-btn>

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
          <!-- <div v-if="product.subtitle" class="q-pl-lg q-pr-sm" style="    font-size: 0.8rem;">
            {{ product.subtitle }}
          </div>
          <div class="q-pl-lg q-pr-md">

            <ul style="padding-left:0px ;list-style-image: linear-gradient(to left bottom, red, blue);">
              <li v-if="product.body1">{{ product.body1 }}</li>
              <li v-if="product.body2">{{ product.body2 }}</li>
              <li v-if="product.body3">{{ product.body3 }}</li>
              <li v-if="product.body4">{{ product.body4 }}</li>
            </ul>
          </div> -->

        </q-card-section>
        <div class="q-pa-md">
          <q-card-section v-html="product.subtitle" />

        </div>
        <!-- editor beginn -->
        <q-card-section v-if="open_editor == true">
          <div class="q-mt-md q-mb-md flex flex-center text-h4">
            <div style="color:brown">Thanh Chỉnh sửa</div>
            <div>
              <q-btn label="Turn Off" @click="open_editor = false"></q-btn>
            </div>
          </div>

          <div class="row">

            <div class="col-10">
              <q-editor v-model="product.subtitle" :dense="$q.screen.lt.md" :definitions="{
                fontColor: {
                  tip: 'Change font color',
                  icon: 'colorize',
                  label: 'Font Color',
                  handler: fontColor
                }
              }" :toolbar="


[
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'custom_btn'],
  ['print', 'fullscreen'],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'fontColor'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
      ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

  ['undo', 'redo'],
  ['viewsource']
]" :fonts="{
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
  }" />

            </div>
            <div class="col-2">

              <q-btn icon="check" round color="green" @click="applyColor" />
              <q-color :value="textColor" @change="val => { textColor = val }" no-header style="width:90px;"
                no-footer />
            </div>
          </div>

        </q-card-section>

        <!-- editor end -->
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
                  <div v-if="readMore">
                    <q-card-section v-html="product.description" />
                  </div>

                  <q-separator></q-separator>
                  <q-card-section v-if="open_editor == true">
                    <div class="q-mt-md q-mb-md flex flex-center text-h4">
                      <div style="color:brown">Thanh Chỉnh sửa</div>
                      <div>
                        <q-btn label="Turn Off" @click="open_editor = false"></q-btn>
                      </div>
                    </div>

                    <div class="row">

                      <div class="col-10">
                        <q-editor v-model="product.description" :dense="$q.screen.lt.md" :definitions="{
                          fontColor: {
                            tip: 'Change font color',
                            icon: 'colorize',
                            label: 'Font Color',
                            handler: fontColor
                          }
                        }" :toolbar="


[
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'custom_btn'],
  ['print', 'fullscreen'],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'fontColor'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
      ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

  ['undo', 'redo'],
  ['viewsource']
]" :fonts="{
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
  }" />

                      </div>
                      <div class="col-2">

                        <q-btn icon="check" round color="green" @click="applyColor" />
                        <q-color :value="textColor" @change="val => { textColor = val }" no-header style="width:90px;"
                          no-footer />
                      </div>
                    </div>

                  </q-card-section>
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

        <q-card-actions v-if="open_editor == true">
          <div class="flex flex-center" style="width:100%">
            <q-btn label="Save" color="positive" @click="saveEdit(product)">

            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- detail     dialog  end-->
    <!-- edit beginn -->
    <q-dialog v-model="edit_card">
      <q-card class="q-pa-sm">
        <q-card-section>
          <div class="flex flex-center ">Ảnh khác</div>
          <div>
            <q-uploader url="http://localhost:4444/upload" label="Tải ảnh lên" color="purple" square flat bordered
              style="max-width: 300px" />

          </div>
        </q-card-section>
        <q-card-actions>
          <div style="width:100%">
            Thay tên :
            <q-input v-model="product.name" filled autogrow />
          </div>


        </q-card-actions>
        <q-separator />
        <q-card-actions>
          <div> Giảm giá: </div>
          <div class="q-ml-md">
            <q-input v-model.number="product.discount" type="number"
              :rules="[val => (0 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>




</template>
<script>
// import { count } from 'console';
import { priceCalculator } from "/src/logic/logic.js";

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
      dialog_detail: ref(false),
      edit_card: ref(false),
      model: ref(''),
      open_editor: ref(false),
      textColor: '#000',
      editColor: false,

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
    editProduct(product) {
      // console.log('Params: ', props.row.id)
      console.log("product ", product)
      this.edit_card = true
      // this.$router.push('/admin/product/add/' + product.id + '/')
    },
    editProductDetail() {
      this.open_editor = true
    },

    applyColor() {
      document.execCommand('foreColor', false, this.textColor)
      console.log("color")
      this.editColor = false
    },

    saveEdit(product) {
      console.log("Product ", product)
    },

    deleteProduct(product) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Bạn có thực sự muốn xóa sản phẩm này không?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        console.log('>>>> OK')

        axios.delete(`${WebApi.server}/admin/product/delete/` + product.id,

          {
            headers: {
              Authorization: "Bearer " + jwt.value,
            },
            withCredentials: true,
          }
        )
          .then(response => {
            window.localStorage.setItem("productId", product.id);

            // products.value.splice(this.products.indexOf(product.id), 1)

            this.$q.notify({
              message: 'Product was deleted.',
              color: 'positive',
              avatar: `${WebApi.iconUrl}`,



            })
            console.log('is deleted: ')
          })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })


    },
  },
  computed: {},
};
</script>
<style>

</style>
