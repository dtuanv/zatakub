<template>
  <div style="" class="q-pt-sm q-pl-sm">
    <!-- <div>
      <q-btn @click="reloadPage" label="reloadPage"></q-btn>
    </div> -->
    <q-card style="border: 5px solid cornflowerblue;" :style="$q.platform.is.mobile ? 'min-height: 12rem;' : 'min-height: 19rem;' ">
      <q-card-section>

        <!-- only Admin beginn -->
        <div v-if="ro == 'admin' && role === 'ADMIN'">
          <q-btn icon="edit" @click='editProduct(product)' dense></q-btn>
          <q-btn class="q-ml-xl" label="ON" :style="product.status == 'on' ? 'background-color:green' : ''"
            @click="changeStatusProduct(product)"></q-btn>
          <q-btn label="OFF" :style="product.status == 'off' ? 'background-color:red' : ''"
            @click="changeStatusProduct(product)"></q-btn>
          <q-btn class="float-right" icon="delete" color="negative" @click='deleteProduct(product)' dense></q-btn>
        </div>
        <!-- only Admin end -->


        <div class="row">
          <div class="col-5">
            <div v-if="product.imageUrl != ''">
              <img :src="'/img/upload/product/' + product.imageUrl" alt=""
                style=" max-width: 100%; display:block;border: 2px solid cadetblue;height: 9rem;" />
            </div>
            <q-btn class="q-mt-sm q-ml-sm" color="green" @click="dialog_detail = true"
              style="text-transform: capitalize;" label="Chi Tiết"></q-btn>
          </div>

          <div class="col-7 q-pl-md q-pt-md">
            <div class="flex flex-center" style="font-family: emoji; font-size: 1.1em; ">
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
                    <div style="color: red; font-size: 1em;" :style="$q.platform.is.mobile ? '' : 'font-family: cursive;'"
                      class="q-ml-xs text-weight-bold">
                      (-{{ product.discount }})%
                    </div>
                  </div>
                  <div class="flex flex-center text-weight-bold" style="color: red; font-size: 1em; width: 100%;"
                    :style="$q.platform.is.mobile ? '' : 'font-family: fantasy;'">
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

      <q-card-actions :class="$q.platform.is.mobile ? '' : ''" >
        <div class="row" style="width: 100%">
          <div class="row" style="width: 52%">
            <div style="padding-top: 5px; font-size: 1.1em">Số lượng:</div>

            <div>
              <q-btn  @click="subtractItem()" icon="remove" color="negative" flat></q-btn>
            </div>
            <q-item style="padding-left: 0px; padding-right: 0px">{{
              countItem
            }}</q-item>
            <div style="padding-left:2px">
              <q-btn @click="addItem()" icon="add" color="positive" flat></q-btn>
            </div>


          </div>

          <div class="" :style=" $q.platform.is.mobile ?  'width: 41%':'width:47%'">
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
      <!-- Sale begin -->
      <div class="row flex flex-center">
        <div v-if="product.sale == 't'" class=" text-h5" style="color: red;height:2rem"
          :style="$q.platform.is.mobile ? '' : 'font-family: cursive;'">HOT SALE
          %%!
        </div>
        <div v-else style="height:2rem;"></div>
        <div v-if="ro == 'admin' && role === 'ADMIN'">
          <q-btn v-if="product.sale == 't'" label="bo sale" color="negative" @click="changeSaleStatus(product)"></q-btn>
          <q-btn v-if="product.sale == 'f'" label="them vao sale" color="negative"
            @click="changeSaleStatus(product)"></q-btn>
        </div>
      </div>
      <!-- Sale end -->

    </q-card>


    <!-- detail     dialog  -->
    <q-dialog v-model="dialog_detail">

      <q-card :style="$q.screen.lt.sm ? 'max-height:70%' : 'max-width:60%;'">
        <div v-if="ro == 'admin' && role === 'ADMIN'">
          <q-btn icon="edit" @click='editProductDetail(product)' dense @dblclick="open_editor = false"></q-btn>
          <q-btn class="q-ml-lg" icon="add image"
            @click="uploadImage_dialog_im = true, uploadImage_dialog = true"></q-btn>
        </div>

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

              <q-carousel-slide v-if="product.imageUrl" :name="1" :img-src="'/img/upload/product/' + product.imageUrl"
                style="background-size: contain;" />

              <q-carousel-slide v-if="product.imageUrl2" :name="2" :img-src="'/img/upload/product/' + product.imageUrl2"
                style="background-size: contain;">


              </q-carousel-slide>
              <q-carousel-slide v-if="product.imageUrl3" :name="3" :img-src="'/img/upload/product/' + product.imageUrl3"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl4" :name="4" :img-src="'/img/upload/product/' + product.imageUrl4"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl5" :name="5" :img-src="'/img/upload/product/' + product.imageUrl5"
                style="background-size: contain;" />
              <q-carousel-slide v-if="product.imageUrl6" :name="6" :img-src="'/img/upload/product/' + product.imageUrl6"
                style="background-size: contain;" />


            </q-carousel>

          </div>
          <div class="flex flex-center q-mt-sm  " style="font-size: 1.2rem;padding: 0px 14px;color: cadetblue;">{{
            product.name
          }}</div>
          <q-separator></q-separator>

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
                <q-tab style="text-transform: capitalize;" name="Description" label="Mô tả thêm" />
                <!-- <q-tab style="text-transform: capitalize;" name="Ratings & Reviews" label="Ratings & Reviews" />
                <q-tab style="text-transform: capitalize;" name="test" label="test" /> -->

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

                <!--
                <q-tab-panel name="Ratings & Reviews">

                </q-tab-panel>

                <q-tab-panel name="test">

                </q-tab-panel> -->
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
          <q-item clickable style="width: 100%;padding:0px 1px; " class="flex flex-center shadow-14">
            <div>
              <div>Bấm để xem thêm...</div>
              <div class="flex flex-center">
                <q-icon name="expand_more" size="md"></q-icon>
              </div>
            </div>
          </q-item>
        </q-card-actions>

        <q-card-actions v-if="open_editor == true">
          <div class="flex flex-center" style="width:100%">
            <q-btn label="Save" color="positive" @click="saveNewProduct(product, 1)">

            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- detail     dialog  end-->
    <!-- edit beginn -->
    <q-dialog v-model="edit_card">

      <q-card class="q-pa-sm">
        <q-form @submit="saveProductEdit">
          <q-card-section>
            <div class="flex flex-center ">Ảnh khác</div>
            <div>

              <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected" label="Tải ảnh lên"
                with-credentials color="purple" square flat bordered style="max-width: 300px" />


            </div>
          </q-card-section>
          <q-card-actions>
            <div style="width:100%">
              Tên sản phẩm:
              <q-input v-model="product.name" label="Nhập tên" filled autogrow />
            </div>


          </q-card-actions>
          <q-separator />
          <q-card-actions>
            <div>Giá: </div>
            <div class="q-ml-md">
              <q-input v-model.number="product.price" type="number"
                :rules="[val => (0 < val && val < 10000000) || 'Vui lòng nhập lại  giá']" />
            </div>
          </q-card-actions>
          <q-separator />
          <q-card-actions>
            <div> Giảm giá %: </div>
            <div class="q-ml-md">
              <q-input v-model.number="product.discount" type="number"
                :rules="[val => (-1 < val && val < 100) || 'Vui lòng nhập lại % giảm giá']" />
            </div>
          </q-card-actions>

          <q-card-actions>
            <div class="flex flex-center col-12">
              <q-btn label="Tiếp" color="positive" type="submit" @click="" />
            </div>
          </q-card-actions>
        </q-form>
      </q-card>


    </q-dialog>
    <!-- uploadImage_dialog begin -->
    <q-dialog
      v-if="product.imageUrl2 == '' || product.imageUrl3 == '' || product.imageUrl4 || uploadImage_dialog_im == true"
      v-model="uploadImage_dialog">
      <q-card>
        <q-card-section>
          <div v-if="product.imageUrl2 == '' || uploadImage_dialog_im == true">

            <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected2"
              label="Tải ảnh thứ 2 lên" with-credentials color="purple" square flat bordered style="max-width: 300px" />


          </div>
        </q-card-section>

        <q-card-actions>
          <div v-if="product.imageUrl3 == '' || uploadImage_dialog_im == true">

            <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected3"
              label="Tải ảnh thứ 3 lên" with-credentials color="purple" square flat bordered style="max-width: 300px" />


          </div>
        </q-card-actions>

        <q-card-actions>
          <div v-if="product.imageUrl4 == '' || uploadImage_dialog_im == true">

            <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected4"
              label="Tải ảnh thứ 4 lên" with-credentials color="purple" square flat bordered style="max-width: 300px" />


          </div>
        </q-card-actions>
        <q-card-actions>
          <div>
            <q-btn label="OK" @click="saveSubImage()"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- uploadImage_dialog end -->

  </div>




</template>
<script>
// import { count } from 'console';
import { priceCalculator } from "/src/logic/logic.js";
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();

import { WebApi } from "/src/apis/WebApi";


const selected_file = ref('')
const selected_file2 = ref('')
const selected_file3 = ref('')
const selected_file4 = ref('')
const check_if_document_upload = ref(false)

export default {
  name: "productBox",
  props: ["product"],
  data() {
    return {

    }
  },
  setup() {
    const $store = useStore();
    let countItem = ref(0);
    let countCart = ref(0);



    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });

    const role = computed({
      get: () => $store.state.loginModule.role,
    });


    const ro = computed({
      get: () => $store.state.cache.ro,
    });


    // $store.state.cart.products.quantity
    // const test = $store.state.cart.quantity
    function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return Math.round((priceInt * (1 - rest)) / 1000) * 1000;
    }
    function numberWithCommas(x) {
      let round = Math.round(x)

      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      jwt,
      selected_file,
      selected_file2,
      selected_file3,
      selected_file4,
      check_if_document_upload,
      ro,
      role,
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
      uploadImage_dialog: ref(false),
      uploadImage_dialog_im: ref(false),

      // addToCart,
    };
  },
  methods: {
    saveProductEdit() {
      this.dialog_detail = true, this.uploadImage_dialog = true, this.open_editor = true
    },
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
              Authorization: "Bearer " + this.jwt,
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
            window.location.reload();
            console.log('is deleted: ')
          })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })


    },
    changeStatusProduct(product) {
      // this.$store.dispatch("cache/changeStatusProduct",product)
      if (product.status == 'on') {
        product.status = 'off'
        axios.get(`${WebApi.server}/changeStatusTo/off/id/` + product.id,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }

        ).then(re => {
          this.$q.notify({
            message: 'Đã cho sản phẩm vào danh sách hết hàng',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`,

          })
        }).catch((err) => { console.log(err) })
      } else {
        product.status = 'on'
        axios.get(`${WebApi.server}/changeStatusTo/on/id/` + product.id,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(re => {
          this.$q.notify({
            message: 'Đã mở bán sản phẩm',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`,

          })
        }).catch((err) => { console.log(err) })
      }

    },
    changeSaleStatus(product) {
      if (product.sale == 't') {
        product.sale = 'f'
        axios.get(`${WebApi.server}/changeSaleTo/f/id/` + product.id,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(re => {
          this.$q.notify({
            message: 'Đã Xóa sp khỏi mục Sale.',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`,

          })
        }).catch((err) => { console.log(err) })
      } else {
        product.sale = 't'
        axios.get(`${WebApi.server}/changeSaleTo/t/id/` + product.id,

          {
            headers: {
              Authorization: "Bearer " + this.jwt,
            },
            withCredentials: true,
          }
        ).then(re => {
          this.$q.notify({
            message: 'Đã chuyển sp sang mục Sale.',
            color: 'positive',
            avatar: `${WebApi.iconUrl}`,

          })
        }).catch((err) => { console.log(err) })

      }

    },
    uploadF() {
      console.log("up")
    },

    file_selected(file) {

      // console.log("files ", file)

      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },

    file_selected2(file) {

      // console.log("files2 ", file)
      this.selected_file2 = file[0];
    },

    file_selected3(file) {

      // console.log("files3 ", file)
      this.selected_file3 = file[0];
    },

    file_selected4(file) {

      this.selected_file4 = file[0];
    },

    uploadFile() {

      const fd = new FormData();

      // console.log("this.selected_file ",this.selected_file)
      fd.append("file", this.selected_file);

      console.log("fdd ", fd)
      axios.post(`${WebApi.server}/upload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,

      }).then(function (response) {
        if (response.data.ok) {

        }
      }.bind(this));
    },


    uploadFile2() {

      const fd = new FormData();
      fd.append("file", this.selected_file2);


      axios.post(`${WebApi.server}/upload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,


      }).then(function (response) {
        if (response.data.ok) {

        }
      }.bind(this));
    },


    uploadFile3() {

      const fd = new FormData();
      fd.append("file", this.selected_file3);
      axios.post(`${WebApi.server}/upload`, fd, {
        headers: {

          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,

      }).then(function (response) {
        if (response.data.ok) {

        }
      }.bind(this));
    },

    uploadFile4() {

      const fd = new FormData();
      fd.append("file", this.selected_file4);
      axios.post(`${WebApi.server}/upload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + this.jwt,
        },
        withCredentials: true,

      }).then(function (response) {
        if (response.data.ok) {

        }
      }.bind(this));
    },


    saveNewProduct(product, reloadOrrr) {

      if (this.selected_file != undefined && this.selected_file != '') {

        this.uploadFile()

        product.imageUrl = this.selected_file.name;

      }

      if (this.selected_file2 != undefined && this.selected_file2 != '') {

        this.uploadFile2()

        product.imageUrl2 = this.selected_file2.name;

      }
      if (this.selected_file3 != undefined && this.selected_file3 != '') {

        this.uploadFile3()

        product.imageUrl3 = this.selected_file3.name;

      }

      if (this.selected_file4 != undefined && this.selected_file4 != '') {

        this.uploadFile4()

        product.imageUrl4 = this.selected_file4.name;

      }




      product.category = this.$route.params.category

      product.status = 'on'

      if (this.$route.params.mark) {
        product.mark = this.$route.params.mark
      }

      axios.post(`${WebApi.server}/saveProduct`, product,
        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }

      ).then((re) => {
        console.log("server return ", re.data)

        this.edit_card = false

        this.dialog_detail = false

        this.uploadImage_dialog = false

        // window.location = window.location

        // window.location.reload(true);

        this.$q.notify({
          message: 'Đã lưu sản phẩm mới, Ảnh sẽ load lên sau !',
          color: 'positive',
          avatar: `${WebApi.iconUrl}`
        })

      }

      ).catch(error => {
        console.log(error);
      });

      // this.$q.notify({
      //   message: "new product was created",

      //   color: "positive",
      //   avatar: `${WebApi.iconUrl}`,

      // });
      // console.log("product saved");

      // window.location.reload();

      if (reloadOrrr == 2) {
        this.uploadImage_dialog = false
      }

    },
    saveSubImage() {
      this.uploadImage_dialog = false
      this.$q.notify({
        message: "Đã lưu ảnh",

        color: "positive",
        avatar: `${WebApi.iconUrl}`,

      });
    },



    reloadPage() {
      window.location.reload();
    }


  },
  computed: {},
};
</script>
<style>
.q-btn .q-icon, .q-btn .q-spinner {
    font-size: 1.8em;
}
</style>
