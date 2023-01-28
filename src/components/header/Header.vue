<template>
  <div style="
      position: relative;

      bottom: 0vh;
      padding: 10px 10px 5px 10px;
      background-color: #efbec3;
    ">
    <div>
      <!-- <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
      </GoogleMap> -->
    </div>
    <div :class="$q.platform.is.mobile ? '' : 'row'">
      <div :class="$q.platform.is.mobile ? 'col-12' : 'col-5'">
        <div :class="
          $q.screen.width > 500 && $q.screen.height > 700 ? '' : ''
        ">
          <div style="width:100%; font-size: 20px;" class="row">
            <div class="q-mr-sm" style="    font-weight: 500;font-stretch: normal;">

            </div>
            <div style="font-family: emoji; color: darkcyan;font-size: 25px;">
              Zatakub
            </div>
          </div>

          <!-- <div style="padding-left:8px">Cung cấp sản phẩm chất lượng từ các thương hiệu hàng đầu.</div> -->

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
      </div>
      <div class="col-3">

        <q-item v-if="$q.platform.is.mobile" clickable @click="mobil_policy_dialog = true">
          <div
            :style="$q.platform.is.mobile ? 'font-size:16px;text-decoration:underline; font-weight: 500;font-stretch: normal;' : ''">
            Chính sách

          </div>
        </q-item>
        <div v-else class="q-mt-lg" style=" font-size: 16px;font-weight: 500;font-stretch: normal;padding-left: 10px;">
          Chính sách:
        </div>
        <div v-if="!$q.platform.is.mobile">

          <div>
            <q-item clickable style="display:inline-block; padding-bottom: 0px;min-height: 36px;"
              @click="return_policy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="img:/img/icon/layout/exchange.png"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Chính sách đổi trả
                </div>
              </div>
            </q-item>
          </div>

          <div>
            <q-item clickable style="display:inline-block; padding-bottom: 0px;padding-top: 5px;min-height: 36px;"
              @click="security_policy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="security" style="color: brown;"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Chính sách bảo mật
                </div>
              </div>
            </q-item>
          </div>

          <div>
            <q-item clickable style="display:inline-block;padding-bottom: 0px;padding-top: 2px;min-height: 36px;"
              @click="webpolicy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="local_police" style="color: cornflowerblue;"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Điều khoản dịch vụ
                </div>
              </div>
            </q-item>
          </div>

        </div>




      </div>
      <div class="col-4" :class="$q.platform.is.mobile ? '' : 'q-mt-lg'" :style="
        $q.screen.width > 900 && $q.screen.height > 900 ? 'padding-left: 225px;' : ''
      ">
        <div class="row" style="">
          <div style=" font-size: 14px; padding-top: 16px">

          </div>
          <div>
            <q-btn flat style="padding: 0px 0px 0px 0px"
              href="https://www.facebook.com/MyPhamToc.ChuyenNghiepChinhHang.Zatakub" target="_blank">
              <q-avatar><img src="/img/icon/facebook.png " alt="iconFacebook" :style="
                $q.screen.width > 500 && $q.screen.height > 500
                  ? 'height: 35px; width: 36px;margin-left: 9px;'
                  : 'height: 8vw; width: 8vw'
              " />
              </q-avatar>
            </q-btn>
          </div>
          <div>
            <q-btn flat style="padding: 0px 0px 0px 0px"
              href="https://www.instagram.com/myphamtocchinhhangzatakub/" target="_blank">
              <q-avatar><img src="/img/icon/instagram.png " alt="iconInstagram" :style="
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
              <q-avatar><img src="/img/icon/zalo.png " alt="iconZalo" :style="
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
              <q-avatar><img src="/img/icon/shopee.png " alt="iconShopee" :style="
                $q.screen.width > 500 && $q.screen.height > 500
                  ? 'height: 35px; width: 36px;margin-left: 9px;'
                  : 'height: 8vw; width: 8vw'
              " />
              </q-avatar>
            </q-btn>
          </div>

          <div>
            <q-btn flat style="padding: 0px 0px 0px 0px"
              href="https://www.lazada.vn/shop/zatakub/?path=promotion-36612-0.htm&tab=promotion"
              target="_blank">
              <q-avatar><img src="/img/icon/lazada.png " alt="iconLazada" :style="
                $q.screen.width > 500 && $q.screen.height > 500
                  ? 'height: 35px; width: 36px;margin-left: 9px;'
                  : 'height: 8vw; width: 8vw'
              " />
              </q-avatar>
            </q-btn>
          </div>




        </div>

        <div class="">
          <div style=" font-size: 16px;">
            Phương thức thanh toán:
          </div>
          <div>
            <q-img style="height:auto; width:250px" src="/img/icon/layout/paymethod.png" alt="iconPay"></q-img>
          </div>

          <!--   <q-btn
            flat
            style="
              text-decoration-line: underline;
              color: blanchedalmond;
              font-size: 11px;
            "
            label="Datenschutzerklärung"
            class=" "
            to="/datenschutzErklaerung"
          ></q-btn>
          -->
        </div>
      </div>
    </div>
    <div :class="$q.platform.is.mobile ? '' : 'row'">
      <div :class="$q.platform.is.mobile ? '' : 'col-5'"></div>
      <div class="flex justify-center" style="margin-top: 2vh; margin-bottom: 5px; color: red">
        <div style="display:inline-block;border: 2px solid cadetblue;height: 1.7rem;">
          Copyright © 2023 Zatakub

        </div>
      </div>
    </div>

  </div>



  <!-- dialog return policy beginn -->
  <q-dialog v-model="return_policy_dialog">
    <q-card class="q-pa-sm">
      <q-card-section>

        <div class="flex flex-center text-h5">Chính sách đổi trả</div>


      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <div>
          <div style="font-size:18px"> 1. Điều kiện đổi trả</div>
          <div>
            Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm
            giao/nhận hàng trong những trường hợp sau:
          </div>
          <ul>
            <li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.
            </li>
            <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
            <li>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</li>
          </ul>
          <div>
            Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc hoàn
            trả/đổi trả hàng hóa.
          </div>
          <br>

          <div style="font-size:18px"> 2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</div>
          <ul>
            <li><b>Thời gian thông báo đổi trả</b>: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm
              thiếu phụ kiện, quà tặng hoặc bể vỡ.</li>
            <li><b>Thời gian gửi chuyển trả sản phẩm:</b> : trong vòng 14 ngày kể từ khi nhận sản phẩm.</li>
            <li> <b>Địa điểm đổi trả sản phẩm</b>: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của
              chúng tôi hoặc chuyển qua đường bưu điện.</li>
          </ul>
          <div>
            Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách
            hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
          </div>

        </div>


      </q-card-actions>
      <div class="flex flex-center">
        <q-btn color="positive" label="OK" @click="closePolicyDialog()"></q-btn>
      </div>
    </q-card>
  </q-dialog>
  <!-- dialog return policy end -->

  <!-- dialog security policy begin -->

  <q-dialog v-model="security_policy_dialog">
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="flex flex-center text-h5">Chính sách bảo mật</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <div>
          Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu thập và sử dụng thông tin cá nhân của mình
          thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể cung cấp thông qua trang web khi Quý khách đăng
          ký tài khoản, đăng ký nhận thông tin liên lạc từ chúng tôi, hoặc khi Quý khách mua sản phẩm, dịch vụ, yêu cầu
          thêm thông tin dịch vụ từ chúng tôi.
        </div>
        <br>
        <div>
          Chúng tôi sử dụng thông tin cá nhân của Quý khách để liên lạc khi cần thiết liên quan đến việc Quý khách sử
          dụng website của chúng tôi, để trả lời các câu hỏi hoặc gửi tài liệu và thông tin Quý khách yêu cầu.
        </div>
        <br>
        <div>
          Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất để bảo vệ thông tin
          cũng như việc thanh toán của khách hàng.
        </div>
        <br>
        <div>
          Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.
        </div>
      </q-card-actions>
      <div class="flex flex-center">
        <q-btn color="positive" label="OK" @click="closePolicyDialog()"></q-btn>
      </div>
    </q-card>
  </q-dialog>


  <!-- dialog security policy end -->

  <!-- webpolicy_dialog begin -->


  <q-dialog v-model="webpolicy_dialog">
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="flex flex-center text-h5">Điều khoản dịch vụ </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <div>
          <div style="font-size:18px">1. Giới thiệu</div>
          <div>
            <div>Chào mừng quý khách hàng đến với website chúng tôi.</div>
            <br>
            <div>Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều
              khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua
              bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không
              cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này
              được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.</div>
            <br>
            <div>
              Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
            </div>
            <br>
          </div>
          <div style="font-size:18px">2. Hướng dẫn sử dụng website</div>
          <div>
            Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay
            người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng
            hóa theo quy định hiện hành của pháp luật Việt Nam.
          </div>
          <br>
          <div style="font-size:18px">3. Thanh toán an toàn và tiện lợi</div>
          <div>Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
          </div>
          <div> <b>Cách 1</b>: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)</div>
          <div> <b>Cách 2</b>: Thanh toán online qua thẻ tín dụng, chuyển khoản</div>
        </div>
      </q-card-actions>
      <div class="flex flex-center">
        <q-btn color="positive" label="OK" @click="closePolicyDialog()"></q-btn>
      </div>
    </q-card>
  </q-dialog>
  <!-- webpolicy_dialog end -->
  <!-- dialog_impressung -->
  <q-dialog v-model="dialog_impressung">
    <q-card :style="
      $q.screen.width > 400 && $q.screen.height > 700
        ? 'width: 90vw; height: 35vh'
        : 'width: 90vw; height: 400px'
    ">
      <q-card-section class="text-h4 flex justify-center"> Impressung</q-card-section>
      <q-separator />

      <div class="" style="width: 100%">
        <div class="text-h6 flex justify-center" style="color: chocolate">
          In voller Blüte
        </div>
        <div class="row q-mt-lg">
          <div v-if="$q.screen.width > 400 && $q.screen.height > 700" class="col-3"></div>
          <div v-else class="q-ml-sm"></div>
          <div class="">Adresse1:</div>
          <div class="q-ml-xs">Hohenzollernplatz 7-8, 14129 Berlin</div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-3"></div>

          <div>Telefon:</div>
          <div class="q-ml-xs">030/239 001 36</div>
        </div>
        <q-separator />
        <div class="q-ml-sm">
          <div>Adresse2: Westfälischestr. 52, 10711 Berlin</div>
          <div class="row">
            <div class="col-3"></div>

            <div>Telefon: 030/680 086 39</div>
          </div>
        </div>
        <q-separator />

        <div class="row q-mt-sm">
          <div class="col-3"></div>
          <div>Email:</div>
          <div class="q-ml-xs">in.voller.bluete@gmail.com</div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-3"></div>

          <div>Ust-ID:</div>
          <div class="q-ml-xs">67 129 548 138</div>
        </div>
        <div class="row">
          <div v-if="$q.screen.width > 400 && $q.screen.height > 700" class="col-3"></div>
          <div v-else class="q-ml-sm"></div>
          <div class="q-mt-sm">Gesetzlicher Vertreter: Inh. Nguyen, Phuong Nhung</div>
        </div>
        <div class="q-ml-lg q-mt-sm">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen
        </div>
      </div>
    </q-card>
  </q-dialog>
  <!-- dialog_impressung -->


  <!-- mobil policy list dialog begin  -->

  <q-dialog v-model="mobil_policy_dialog">
    <q-card>
      <q-card-actions>
        <div>
          <div>
            <q-item clickable style="display:inline-block; padding-bottom: 0px;min-height: 36px;"
              @click="return_policy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="img:/img/icon/layout/exchange.png"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Chính sách đổi trả
                </div>
              </div>
            </q-item>
          </div>

          <div>
            <q-item clickable style="display:inline-block; padding-bottom: 0px;padding-top: 5px;min-height: 36px;"
              @click="security_policy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="security" style="color: brown;"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Chính sách bảo mật
                </div>
              </div>
            </q-item>
          </div>

          <div>
            <q-item clickable style="display:inline-block;padding-bottom: 0px;padding-top: 2px;min-height: 36px;"
              @click="webpolicy_dialog = true">
              <div class="row">
                <div class="q-mr-sm">
                  <q-icon size="xs" name="local_police" style="color: cornflowerblue;"></q-icon>
                </div>
                <div style="text-decoration: underline;">
                  Điều khoản dịch vụ
                </div>
              </div>
            </q-item>
          </div>

        </div>
      </q-card-actions>
      <div class="flex flex-center">
        <q-btn color="positive" label="OK" @click="closePolicyDialog()"></q-btn>
      </div>
    </q-card>
  </q-dialog>

  <!-- mobil policy list dialog end  -->
</template>
<script>
import { ref } from "vue";
// import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  name: "Header",
  // components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    return {
      center,
      dialog_impressung: ref(false),
      return_policy_dialog: ref(false),
      security_policy_dialog: ref(false),
      webpolicy_dialog: ref(false),
      mobil_policy_dialog: ref(false),
    };
  },
  methods: {
    closePolicyDialog() {
      this.return_policy_dialog = false
      this.security_policy_dialog = false
      this.webpolicy_dialog = false
      this.mobil_policy_dialog = false
    }
  }
};
</script>
