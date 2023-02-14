<template>
  <q-page class="q-pa-sm" style="" :style="$q.platform.is.mobile ? '' : 'margin-left:50px;'">

    <div :class="$q.platform.is.mobile ? '' : 'row'">
      <div :class="$q.platform.is.mobile ? '' : 'row col-8'"
        :style="$q.platform.is.mobile ? 'width:100%' : ' word-wrap: break-word;'">
        <div :class="$q.platform.is.mobile ? '' : 'col-6'" class="" :style="$q.platform.is.mobile ? 'width:100%' : ''">
          <q-carousel v-model="slide" thumbnails>

            <q-carousel-slide v-if="product.imageUrl" :name="1" :img-src="'/img/upload/product/' + product.imageUrl"
              alt="anhsp" style="background-size: contain;" />

            <q-carousel-slide v-if="product.imageUrl2" :name="2" :img-src="'/img/upload/product/' + product.imageUrl2"
              alt="anhsp" style="background-size: contain;">


            </q-carousel-slide>
            <q-carousel-slide v-if="product.imageUrl3" :name="3" :img-src="'/img/upload/product/' + product.imageUrl3"
              alt="anhsp" style="background-size: contain;" />
            <q-carousel-slide v-if="product.imageUrl4" :name="4" :img-src="'/img/upload/product/' + product.imageUrl4"
              alt="anhsp" style="background-size: contain;" />
            <q-carousel-slide v-if="product.imageUrl5" :name="5" :img-src="'/img/upload/product/' + product.imageUrl5"
              alt="anhsp" style="background-size: contain;" />
            <q-carousel-slide v-if="product.imageUrl6" :name="6" :img-src="'/img/upload/product/' + product.imageUrl6"
              alt="anhsp" style="background-size: contain;" />


          </q-carousel>
        </div>


        <div class=" q-pl-md col-6 q-pr-md q-pt-sm" style=" word-wrap: break-word; ">
          <div class=" " :style="$q.platform.is.mobile ? 'font-size: 18px;' : 'font-size: 1.1vw;'">
            {{ product.name }}

          </div>
          <div style="color: cadetblue;">Mã sản phẩm: ZT{{ product.id }}</div>
          <div class="q-mt-md ">
            <div
              style="color: #ff6600; font-size: 1em; width: 100%;border: 3px solid gold; display: inline;padding: 1px 2px;"
              :style="$q.platform.is.mobile ? '' : 'font-family: fantasy;'">
              Giá: {{
  numberWithCommas(
    priceWithDiscount(product.price, product.discount)
)
              }}
              đ
            </div>
            <div class="q-mt-md"> <span style="color:#459b43">Giá thị trường</span> : {{
              numberWithCommas(product.price)
            }} đ. <span style="color:brown">Tiết kiệm</span> : {{
  numberWithCommas(product.price -
    priceWithDiscount(product.price, product.discount))
}} <span style="color: #ff6600;">(-{{
  product.discount
}}%)</span></div>
          </div>


          <div class="q-pr-sm q-pt-sm">
            <q-item style="padding:0px 0px">
              <q-item-section avatar style="padding-right:5px">
                <q-img src="/img/icon/nowfree.png" style="color: coral;" alt="anhreturn" />
              </q-item-section>
              <q-item-section>
                <div :style="$q.platform.is.mobile ? 'font-size: 14px;' : 'font-size: 0.9vw;'">
                  Giao Nhanh Miễn Phí 2H tại 29 Tỉnh Thành:

                </div>
              </q-item-section>

            </q-item>
            <div style="margin-left:60px;" :style="$q.platform.is.mobile ? 'font-size: 12px;' : 'font-size: 0.8vw;'">
              Bạn muốn nhận hàng trước 10h ngày mai. Đặt hàng trước 24h và ghi chú giao hàng 2H ở bước thanh toán.
            </div>
          </div>
          <q-separator class="q-mt-xl"></q-separator>

          <!-- add to card beginn -->

          <q-card-actions class="q-mt-sm" :class="$q.platform.is.mobile ? '' : ''">
            <div class="row" style="width: 100%" :style="$q.platform.is.mobile ? 'font-size:16px' : 'font-size:0.9vw'">
              <div class="row">
                <div
                  :style="$q.platform.is.mobile ? 'align-self: center;padding-right:5px' : 'align-self: center;padding-right:5px'"
                  style=" ">Số lượng:
                </div>

                <div
                  :style="$q.platform.is.mobile ? 'height: fit-content;width: 11vw;' : 'height: fit-content;width: 2.6vw;'">
                  <q-input outlined v-model="countItem">


                  </q-input>
                </div>

                <!-- <div>
                  <q-item :style="$q.platform.is.mobile ? 'font-size:15px;padding-top: 4.5vw;' : 'font-size:1.1vw;padding-top: 1.4vw;'"
                    style="padding-left: 10px; padding-right: 0px;">{{
                      countItem
                    }}</q-item>
                </div> -->

                <!-- <div class="column justify-start">

                  <div class="col-4" style="">
                    <q-btn :style="$q.platform.is.mobile ? 'font-size:13px' : 'font-size:0.9vw'" @click="addItem()"
                      icon="add" color="positive" flat></q-btn>
                  </div>


                  <div class="col-4">
                    <q-btn :style="$q.platform.is.mobile ? 'font-size:13px' : 'font-size:0.9vw'" @click="subtractItem()"
                      icon="remove" color="negative" flat></q-btn>
                  </div>
                </div> -->


              </div>

              <div class=""
                :style="$q.platform.is.mobile ? 'align-self: center;;padding-left:30px' : 'align-self: center;;padding-left:10px'">
                <div class="row"
                  style="    height: 36px; font-size: 14px;border: none;padding: 2px 5px 0px  0px;color: #fff;; background-color: #1f601f;">
                  <div>
                    <q-btn style="padding:5px 2px 0px 2px; " :style="$q.platform.is.mobile ? 'font-size:3vw;' : 'font-size:10px;min-height: 10px;'"
                      @click="addToCart()" class="float-right"
                      icon="shopping_cart" flat />
                  </div>


                  <div>
                    <q-item
                      :style="$q.platform.is.mobile ? 'padding:5px 0px 0px 0px' : 'padding:5px 0px 0px 0px; min-height: 1px;'"
                      class="" clickable @click="addToCart()">Thêm giỏ hàng</q-item>
                  </div>
                </div>
              </div>
            </div>
          </q-card-actions>


          <!-- add to card end -->

        </div>


      </div>


      <div :class="$q.platform.is.mobile ? '' : 'col-4 q-pl-xl'">
        <q-card :style="$q.platform.is.mobile ? '' : 'width:22vw;position:fixed; z-index:200'">
          <q-card-section>
            <div class="flex flex-center q-pt-md " :style="$q.platform.is.mobile ? 'font-size:18px' : 'font-size:1.2vw'"
              style="    color: #459b43;">Mua như vua - chăm sóc như víp
            </div>
          </q-card-section>
          <q-card-actions>
            <q-list :style="$q.platform.is.mobile ? 'font-size:14px' : 'font-size:0.9vw'">
              <q-item>
                <q-item-section avatar>
                  <q-img src="/img/icon/returns.png" style="color: coral;" alt="anhreturn" />
                </q-item-section>
                <q-item-section>
                  Miễn phí đổi trả tận nhà.
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-img src="/img/icon/defectiveProduct.png" style="color: coral;" alt="anhAdmin" />
                </q-item-section>
                <q-item-section>
                  Lỗi là đổi mới xem tại Chính sách đổi trả.
                </q-item-section>
              </q-item>


              <q-item>
                <q-item-section avatar>
                  <q-img src="/img/icon/returnPerPhone.png" style="color: coral;" alt="anhAdmin" />
                </q-item-section>
                <q-item-section>
                  Đổi trả và bảo hành cực dễ
                  chỉ cần số điện thoại.
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-img src="/img/icon/transportVehicle.png" style="color: coral;" alt="anhAdmin" />
                </q-item-section>
                <q-item-section>
                  Gửi hàng nhanh chóng, tiện lợi.
                </q-item-section>
              </q-item>


              <q-item>
                <q-item-section avatar>
                  <q-img src="/img/icon/thankyou.png" style="color: coral;" alt="anhAdmin" />
                </q-item-section>
                <q-item-section>
                  <div> Tri ân thành viên Zatakub. </div>
                  <div> Với các chương trình khuyến mãi, </div>
                  <div> các sự kiện & quà tặng đặc biệt vô cùng hấp dẫn.</div>

                </q-item-section>
              </q-item>
            </q-list>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- edit card name beginn -->

    <div class="row" v-if="ro == 'admin' && role === 'ADMIN'">
      <div class="col-5">
        <q-card class="q-pa-sm">
          <q-form @submit="saveProductEdit">
            <q-card-section>
              <div class="flex flex-center ">Ảnh chính khác</div>
              <div>

                <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected"
                  label="Tải ảnh lên" with-credentials color="purple" square flat bordered style="max-width: 300px" />


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


          </q-form>
        </q-card>

      </div>


      <div class="col-5">

        <q-card class="q-pl-sm" style="min-height:430px">
          <q-card-section>
            <div class="flex flex-center q-pt-sm q-pb-sm">Ảnh phụ</div>
          </q-card-section>
          <q-card-section>
            <div>

              <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected2"
                label="Tải ảnh thứ 2 lên" with-credentials color="purple" square flat bordered
                style="max-width: 300px" />


            </div>
          </q-card-section>

          <q-card-actions>
            <div>

              <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected3"
                label="Tải ảnh thứ 3 lên" with-credentials color="purple" square flat bordered
                style="max-width: 300px" />


            </div>
          </q-card-actions>

          <q-card-actions>
            <div>

              <q-uploader field-name="file" extensions=".gif,.jpg,.jpeg,.png" @added="file_selected4"
                label="Tải ảnh thứ 4 lên" with-credentials color="purple" square flat bordered
                style="max-width: 300px" />


            </div>
          </q-card-actions>

        </q-card>
      </div>
    </div>

    <!-- edit card name end -->

    <!-- product infos -->
    <div :class="$q.platform.is.mobile ? '' : 'row '">

      <div :class="$q.platform.is.mobile ? '' : 'col-10 q-pr-lg '">
        <div class="" :style="$q.platform.is.mobile ? '' : 'margin-right:150px'">
          <div class="q-mt-md q-pl-md ">
            <div style="    border-right: 1px solid #eee;    border-bottom: 1px solid #eee;">
              <div style=""
                :style="$q.platform.is.mobile ? 'font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'
                : ' font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'">
                Thông tin sản phẩm</div>
            </div>


            <div class="q-pr-xl">
              <q-card-section style="    background-color: rgb(255, 255, 255);" class="q-mt-md  " v-html="product.subtitle" />

            </div>
          </div>



          <!-- edit beginn only for admin -->





          <!-- v-if="open_editor == true" -->
          <q-card-section v-if="ro == 'admin' && role === 'ADMIN'">
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


          <!-- instruction  -->
          <div class="q-mt-md q-pl-md ">
            <div style="    border-right: 1px solid #eee;    border-bottom: 1px solid #eee;">
              <div style=""
                :style="$q.platform.is.mobile ? 'font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'
                : ' font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'">
                Hướng dẫn sử dụng</div>
            </div>


            <div class="q-pr-xl">
              <q-card-section style="" class="q-mt-md " v-html="product.instruction" />

            </div>
          </div>

          <!-- instruction edit beginn-->

          <q-card-section v-if="ro == 'admin' && role === 'ADMIN'">
            <div class="q-mt-md q-mb-md flex flex-center text-h4">
              <div style="color:brown">Thanh Chỉnh sửa cho Hướng dẫn sử dụng</div>
              <div>
                <q-btn label="Turn Off" @click="open_editor = false"></q-btn>
              </div>
            </div>

            <div class="row">

              <div class="col-10">
                <q-editor v-model="product.instruction" :dense="$q.screen.lt.md" :definitions="{
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


          <!-- instruction edit end -->



          <div class="q-mt-md q-pl-md ">
            <div style="    border-right: 1px solid #eee;    border-bottom: 1px solid #eee;">
              <div style=""
                :style="$q.platform.is.mobile ? 'font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'
                : ' font-size: 14px; color: #1f601f; text-transform: uppercase;font-weight: 700; display: inline-block;border: 1px solid #eee;padding: 10px 20px; border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom: none;margin: 0;position: relative;'">
                Lý do nên mua tại  Zatakub</div>
            </div>

            <div class="q-pr-xl">
              <q-card-section style="" class="q-mt-md " v-html="product.reason" />

            </div>
          </div>
          <!-- Reason to buy at Zatakub edit beginn-->
          <q-separator></q-separator>

          <q-card-section v-if="ro == 'admin' && role === 'ADMIN'">
            <div class="q-mt-md q-mb-md flex flex-center text-h4">
              <div style="color:brown">Thanh Chỉnh sửa cho Hướng dẫn sử dụng</div>
              <div>
                <q-btn label="Turn Off" @click="open_editor = false"></q-btn>
              </div>
            </div>

            <div class="row">

              <div class="col-10">
                <q-editor v-model="product.reason" :dense="$q.screen.lt.md" :definitions="{
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

          <q-separator></q-separator>

          <!-- Reason to buy at Zatakub edit end -->

        </div>



        <q-card-actions v-if="ro == 'admin' && role === 'ADMIN'">

          <form @submit.prevent="saveNewProduct(product, 1)">
            <div class="flex flex-center" style="width:100%">
              <q-btn label="Save" color="positive" type="submit">

              </q-btn>
            </div>
          </form>
        </q-card-actions>
      </div>
      <div>

      </div>
    </div>







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

const selected_file = ref('')
const selected_file2 = ref('')
const selected_file3 = ref('')
const selected_file4 = ref('')
const check_if_document_upload = ref(false)

export default {



  setup() {

    const $store = useStore();
    let countItem = ref(0);
    let countCart = ref(0);

    const route = useRoute();







    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });

    const role = computed({
      get: () => $store.state.loginModule.role,
    });


    const ro = computed({
      get: () => $store.state.cache.ro,
    });
    const product = ref({})

    const productData = JSON.parse(localStorage.getItem("product"))

    product.value = productData
    console.log("product ", product)




    const amountSaving = numberWithCommas(product.value.price - priceWithDiscount(product.value.price, product.value.discount))


    function numberWithCommas(x) {
      let round = Math.round(x)

      return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function priceWithDiscount(price, discount) {
      var priceInt = parseInt(price);
      var rest = discount / 100;
      return Math.round((priceInt * (1 - rest)) / 1000) * 1000;
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
    return {
      jwt,
      selected_file,
      selected_file2,
      selected_file3,
      selected_file4,
      check_if_document_upload,
      ro,
      role,
      product,
      slide: ref(1),
      numberWithCommas,
      priceWithDiscount,
      amountSaving,
      addItem,
      countItem,
      subtractItem,
      countCart,
    }
  },
  watch: {

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
      }
        // .bind(this)
      );
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


      })
        .then(function (response) {
          if (response.data.ok) {

          }
        }
          .bind(this)
        );
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
      }
        // .bind(this)
      );
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
      }
        // .bind(this)
      );
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

      console.log("product to save ", product)
      axios.post(`${WebApi.server}/saveProduct`, product,
        {
          headers: {
            Authorization: "Bearer " + this.jwt,
          },
          withCredentials: true,
        }

      ).then((re) => {
        console.log("server return ", re.data)


        this.$q.notify({
          message: 'Đã lưu sản phẩm mới, Ảnh sẽ load lên sau !',
          color: 'positive',
          avatar: `${WebApi.iconUrl}`
        })


        let returnPath = this.$route.path.replace("/" + this.$route.params.productId, "")
        // this.$router.replace(returnPath)
        // this.$router.replace("/product/sale")

        window.location = returnPath

        console.log("returnPath in method ", returnPath)

      }

      ).catch(error => {
        console.log(error);
      });



      if (reloadOrrr == 2) {
        this.uploadImage_dialog = false
      }

    },


  }
}
</script>
<style>
.q-field__control {
  color: var(--q-primary);
  height: auto;
  max-width: 100%;
  outline: none;
}
</style>
