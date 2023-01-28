<template>
  <q-page>
    <div class="flex flex-center text-h5" style="font-family:cursive; color: coral;">Zatakub</div>

    <div>


      <div clickable class="row" style=" padding: 5px; ">
        <div :class="$q.platform.is.mobile ? 'col-1' : 'q-mr-xs'">
          <q-icon size="xs" name="check_circle" style="    color: green;"></q-icon>
        </div>
        <div class="col-11">
          Cung cấp sản phẩm chất lượng từ các thương hiệu hàng đầu.
        </div>
      </div>



      <div clickable class="row" style=" padding: 5px; ">
        <div :class="$q.platform.is.mobile ? 'col-1' : 'q-mr-xs'">
          <q-icon size="xs" name="pin_drop" style="    color: chocolate;"></q-icon>
        </div>
        <div class="col-11">
          Địa chỉ: 7/101 Thành Thái, P14, Q10, TP Hồ Chí Minh
        </div>
      </div>





      <div clickable class="row" style="padding:5px; padding-top: 0px;">
        <div :class="$q.platform.is.mobile ? 'col-1' : 'q-mr-xs'">
          <q-icon size="xs" name="phone_iphone" style="    color: blueviolet;"></q-icon>

        </div>
        <div class="col-11">
          Số điện thoại: 0389 059 923
        </div>
      </div>

      <div clickable class="row" style="padding:5px; padding-top: 0px;">
        <div :class="$q.platform.is.mobile ? 'col-1' : 'q-mr-xs'">
          <q-icon size="xs" name="mail" style="    color: crimson;"></q-icon>

        </div>

        <div class="col-11">
          Email : Myphamtocchinhhangzatakubdvo@gmail.com
        </div>
      </div>

    </div>


    <div>

      <div class="row" style="">
        <div style=" font-size: 14px; padding-top: 16px">

        </div>
        <div>
          <q-btn flat style="padding: 0px 0px 0px 0px"
            href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub" target="_blank">
            <q-avatar><img src="/img/icon/facebook.png " alt="facebook" :style="
              $q.screen.width > 500 && $q.screen.height > 500
                ? 'height: 35px; width: 36px;margin-left: 9px;'
                : 'height: 8vw; width: 8vw'
            " />
            </q-avatar>
          </q-btn>
        </div>
        <div>
          <q-btn flat style="padding: 0px 0px 0px 0px"
            href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub" target="_blank">
            <q-avatar><img src="/img/icon/instagram.png " alt="instagram" :style="
              $q.screen.width > 500 && $q.screen.height > 500
                ? 'height: 35px; width: 36px;margin-left: 9px;'
                : 'height: 8vw; width: 8vw'
            " />
            </q-avatar>
          </q-btn>
        </div>

        <div>
          <q-btn flat style="padding: 0px 0px 0px 0px"
            href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub" target="_blank">
            <q-avatar><img src="/img/icon/zalo.png " alt="zalo" :style="
              $q.screen.width > 500 && $q.screen.height > 500
                ? 'height: 35px; width: 36px;margin-left: 9px;'
                : 'height: 8vw; width: 8vw'
            " />
            </q-avatar>
          </q-btn>
        </div>

        <div>
          <q-btn flat style="padding: 0px 0px 0px 0px"
            href="https://shopee.vn/shop/196811123?utm_source=an_17171860000&utm_medium=affiliates&utm_campaign=&utm_content=SellerVN-196811123"
            target="_blank">
            <q-avatar><img src="/img/icon/shopee.png " alt="shopee" :style="
              $q.screen.width > 500 && $q.screen.height > 500
                ? 'height: 35px; width: 36px;margin-left: 9px;'
                : 'height: 8vw; width: 8vw'
            " />
            </q-avatar>
          </q-btn>
        </div>

        <div>
          <q-btn flat style="padding: 0px 0px 0px 0px"
            href="https://www.lazada.vn/shop/zatakub/?path=promotion-36612-0.htm&tab=promotion" target="_blank">
            <q-avatar><img src="/img/icon/lazada.png " alt="lazada" :style="
              $q.screen.width > 500 && $q.screen.height > 500
                ? 'height: 35px; width: 36px;margin-left: 9px;'
                : 'height: 8vw; width: 8vw'
            " />
            </q-avatar>
          </q-btn>
        </div>




      </div>
    </div>

  </q-page>
</template>

<script>

export default {

  setup() {


    return {

    }
  }

}
</script>
