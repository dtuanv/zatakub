<template>
  <div
    style="
      position: relative;

      bottom: 0vh;
      padding: 2vh 0px 5px 10px;
      background-color: #342a2a;
    "
  >
    <div>
      <!-- <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
      </GoogleMap> -->
    </div>
    <div class="row">
      <div class="col-6">
        <div
          :class="
            $q.screen.width > 500 && $q.screen.height > 700 ? 'flex justify-center' : ''
          "
        >
          <div style="color: blanchedalmond" class="text-h6">Kontakt :</div>
          <div
            :style="
              $q.screen.width > 500 && $q.screen.height > 700
                ? 'color:aliceblue;padding: 7px 0px 0px 11px;'
                : 'color:aliceblue;'
            "
          >
            <div style="color: chartreuse">In voller Blüte</div>
            <div>Hohenzollernplatz 7-8</div>
            <div>14129 Berlin.</div>
          </div>

          <div
            :style="
              $q.screen.width > 500 && $q.screen.height > 700
                ? 'color:aliceblue;padding:28px 0px 0px 11px;'
                : 'color:aliceblue;'
            "
          >
            <!-- <div>In voller Blüte</div> -->
            <div>oder Westfälischestr. 52</div>
            <div>10711 Berlin.</div>
          </div>
        </div>
      </div>
      <div
        class="col-6"
        :style="
          $q.screen.width > 900 && $q.screen.height > 900 ? 'padding-left: 225px;' : ''
        "
      >
        <div class="row" style="margin-left: 12px">
          <div style="color: blanchedalmond; font-size: 14px; padding-top: 16px">
            Folge uns:
          </div>
          <div>
            <q-btn
              flat
              style="padding: 0px 0px 0px 0px"
              href="https://www.facebook.com/profile.php?id=100087438932902"
              target="_blank"
            >
              <q-avatar
                ><img
                  src="/img/icon/facebook.png "
                  alt=""
                  :style="
                    $q.screen.width > 500 && $q.screen.height > 500
                      ? 'height: 35px; width: 36px;margin-left: 9px;'
                      : 'height: 8vw; width: 8vw'
                  "
                />
              </q-avatar>
            </q-btn>
          </div>
          <div>
            <q-btn
              flat
              style="padding: 0px 0px 0px 0px"
              href="https://www.instagram.com/kotoasiankitchen/"
              target="_blank"
            >
              <q-avatar
                ><img
                  src="/img/icon/instagram.png "
                  alt=""
                  :style="
                    $q.screen.width > 500 && $q.screen.height > 500
                      ? 'height: 35px; width: 36px;margin-left: 9px;'
                      : 'height: 8vw; width: 8vw'
                  "
                />
              </q-avatar>
            </q-btn>
          </div>
        </div>

        <div class="">
          <q-btn
            flat
            style="
              text-decoration-line: underline;
              color: blanchedalmond;
              font-size: 11px;
            "
            label="Impressung"
            class=""
            @click="dialog_impressung = true"
          ></q-btn>

          <q-btn
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
        </div>
      </div>
    </div>
    <div
      class="flex justify-center"
      style="margin-top: 2vh; margin-bottom: 5px; color: red"
    >
      Copyright © 2022 In voller Blütte
    </div>
  </div>
  <!-- dialog_impressung -->
  <q-dialog v-model="dialog_impressung">
    <q-card
      :style="
        $q.screen.width > 400 && $q.screen.height > 700
          ? 'width: 90vw; height: 35vh'
          : 'width: 90vw; height: 400px'
      "
    >
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
    };
  },
};
</script>
