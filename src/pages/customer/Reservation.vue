<template>
  <q-page>


    <div :style=" $q.screen.width > 400 && $q.screen.height > 700 ? 'margin-top:50px':''">
      <div class="text-h4 flex justify-center" style="font-family: cursive; color: coral">
        Reservierung
      </div>
      <!-- icon -->
      <div class="row justify-center">
        <div v-for="reservation in reservations" :key="reservation.key">
          <ReservationBox :reservation="reservation"> </ReservationBox>
        </div>
      </div>

      <div style="width:100%" class="">
        <div class="flex justify-center">
          <q-card
            :style=" $q.screen.width > 400 && $q.screen.height > 700 ?'position:fixed;z-index:100;margin-right: 12px; max-width:700px ':'position:fixed;z-index:100;margin-right: 14px;margin-left: 15px;  '"
            class="shadow-12" v-if="dialog_gespeichertDaten">
            <q-card-section style="padding-bottom: 0px">
              <div class="flex justify-center "
                style="font-size:17px; font-family:inherit;background-color: blanchedalmond;;">
                Löschung bzw. Sperrung Ihrer Daten
              </div>
            </q-card-section>
            <q-card-actions>
              <div class="q-pa-sm">
                <div>Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit. </div>
                <div>
                  Wir speichern Ihre
                  personenbezogenen Daten daher nur so lange, wie dies zur Erreichung der hier genannten Zwecke
                  erforderlich
                  ist oder wie es die vom Gesetzgeber vorgesehenen vielfältigen Speicherfristen vorsehen.
                </div>
                <div class="q-mt-sm">
                  Nach Fortfall des
                  jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinemäßig und
                  entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.
                </div>

                <div class="row q-mt-sm">
                  <div class="col-8"></div>
                  <div class="col-2">
                    <q-btn @click="dialog_gespeichertDaten=false" color="positive" label="Akzeptieren"></q-btn>

                  </div>
                </div>

              </div>
            </q-card-actions>
          </q-card>
        </div>

      </div>


      <!-- <q-btn v-if="button_next === true && button_time === true" label="Next" class="float-right q-mr-sm" color="positive"
    @click="dialog_reservation = true" dense></q-btn> -->

      <q-card class="shadow-4 q-mt-lg"
        :style=" $q.screen.width > 400 && $q.screen.height > 700 ? 'margin-top:60px' : '' ">
        <q-card-section>
          <div class="text-h7" style="color: cornflowerblue; font-family: cursive" v-if="orGuestNum == ''">
            Anzahl der Gäste : {{ guestNum }}
          </div>
          <div class="text-h7" style="color: cornflowerblue; font-family: cursive" v-if="orGuestNum != ''">
            Ihre gewünschte Anzahl der Gäste : {{ orGuestNum }}
            <div>{{ changeStatus() }}</div>
          </div>
          <!-- <div v-if="guestNum!==0 || orGuestNum!=''">{{resetStatus()}}</div> -->
          <div v-if="guestNum == 0 && orGuestNum == ''">
            {{ resetStatus() }}
          </div>
        </q-card-section>
        <div class="row q-ml-md ">
          <q-card-actions class="" v-for="guest in guests" :key="guest">
            <q-btn class="hoverButton" style="width: 10vw" :label="guest.label"
              @click="chooseNumberGuests(guest), (date_card = true)"></q-btn>
          </q-card-actions>
          <q-card-actions class="row">

            <div class="q-mr-sm " style="color: cornflowerblue; font-family: cursive">oder die gewünschte Anzahl:</div>
            <q-input v-model="orGuestNum" color="positive" style="max-width: 100%;" label="Anzahl" :rules="[
              (val) =>
                (!!val && val < 16 && val!=0 ||  val == '' ) || 'Bitte rufen Sie uns an, wenn Sie ein Tish für mehr 15 Personen reservieren',
            ]"></q-input>
          </q-card-actions>
        </div>
      </q-card>

      <q-card class="q-mt-lg shadow-4" v-if="date_card==true && dialog_gespeichertDaten==false">
        <q-card-section>
          <!-- <div class="q-mb-sm">
          <q-badge color="teal"> Date: {{ dateInGermany }} </q-badge>
        </div>
        <div class="q-mb-sm">
          <q-badge color="teal"> Time: {{ time }} </q-badge>
        </div> -->
          <div class="row" style="width:100%">
            <div class="text-h7 col-7" style="color: cornflowerblue; font-family: cursive">
              DATUM : {{ dateInGermany }}
            </div>

            <div class="text-h7" style="color: cornflowerblue; font-family: cursive">
              Uhrzeit : {{ time }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <div class="row" style="width:100%">
            <div class="col-9">
              <q-btn icon="event" round color="primary" label="Hier clicken">
                <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="proxyDate" :options="fromCurrendate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat
                        @click="save(), (button_time = true),dialog_time = true,checkTimeToday()" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>

            </div>
            <div class="col-2">
              <q-btn v-if="button_time" color="primary" icon="timer" @click="dialog_time = true"></q-btn>
            </div>
          </div>

        </q-card-actions>
      </q-card>
      <br />
      <q-btn v-if="button_next === true && button_time === true" label="Weiter" class="float-right q-mr-sm shadow-5"
        color="positive" @click="dialog_reservation = true" dense></q-btn>
    </div>
    <div v-if="$q.screen.width < 400 && $q.screen.height < 700 && date_card === true" style="min-height:0px"></div>
    <div id="bottom"></div>
    <!-- <div min-height:500px >hi</div> -->
    <q-dialog v-model="dialog_time">
      <q-card>
        <q-card-section>
          <div class="text-h4 flex justify-center" style="font-family: cursive; color: cadetblue">
            Uhrzeit
          </div>
        </q-card-section>
        <q-card-actions style="margin-left: 2vh;">
          <div v-for="(time, index) in times" :key="index">

            <div class="">
              <q-item style="">
                <q-btn class="hoverButton" @click="chooseTime(time), (button_next = true)" v-close-popup>{{
                time.label
                }}
                </q-btn>
              </q-item>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- dialog_reservation -->
    <!-- <q-card> -->
    <q-dialog v-model="dialog_reservation" class="">
      <q-card class="my-card" style="max-height: 55vh; margin-top: 18vh">
        <q-card-section>
          <div class="text-h4 flex justify-center">Information</div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>
          <q-form @submit="reservationSave">
            <!-- Input Validation -->
            <q-input v-model="user.name" class="col-4" label="Vorname" color="white" :rules="[
              (val) =>
                (!!val && val.length > 1) || 'Bitte geben Sie ihr richtiger Vorname ein',
            ]"></q-input>
            <!-- <q-input
            v-model="user.adresse"
            class="col-4"
            label="Adresse"
            color="white"
            :rules="adresseRules"
          ></q-input> -->
            <q-input v-model="user.mobil" class="col-4" label="Telefonnummer" color="white" :rules="mobilRules">
            </q-input>
            <q-input label="Notiz" v-model="user.note" autogrow />
            <q-btn class="q-mt-lg float-right" label="Send" color="primary" type="submit" dense></q-btn>
          </q-form>
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ReservationBox from "/src/components/ReservationBox.vue";

import { useQuasar } from "quasar";
import { date } from "quasar";
const user = ref({});
export default {
  components: { ReservationBox },

  methods: {
    chooseNumberGuests(num) {
      this.guestNum = num.value;
      this.$store.dispatch("cache/changeStatus", 1);
    },
    chooseTime(timeI) {
      // console.log(timeI.value);
      this.time = timeI.value;
      this.$store.dispatch("cache/changeStatus", 3);
    },
  },
  computed: {
    changeGuestNum() {
      this.guestNum = this.orGuestNum;
      console.log("change");
    },


    // changeStatus(){
    //   guestInfo.value.status = true

    // }
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    //**  data define beginn **
    const time = ref("");
    const today = Date.now();
    const formattedString = date.formatDate(today, "DD-MM-YYYY");
    const dateInGermany = ref("");
    const proxyDate = ref("");
    const getTime = date.formatDate(today, "HH:mm");
    // time list
    // const times = computed({
    //   get: () => $store.state.cache.times,
    // });
    const timesOrig = computed({
      get: () => $store.state.cache.times,
    });
    const times = ref(timesOrig.value)

    // time list end

    // const date = ref("2019/03/01");

    // **  date define end **


    const goToNext = () => {
      nextButton.value?.scrollIntoView({ behavior: "smooth", block: "center" });
    };



    // const guestStore = computed({
    //   get: () => $store.state.cache.guestNum,
    // });

    // **guest in store**
    const guests = computed({
      get: () => $store.state.cache.guests,
    });

    const guestInfo = computed({
      get: () => $store.state.cache.guestInfo,
    });

    const reservations = $store.state.cache.reservations;

    const guestNum = ref(guestInfo.value.guestNum);
    // const guestNum = ref(0)

    const orGuestNum = ref(guestInfo.value.orGuestNum);

    // **guest in store** END



    // if(  orGuestNum.value !=0 || orGuestNum.value != "" ){
    if (true) {
      $store.dispatch("cache/changeGuestNum", orGuestNum.value);
      // console.log("orGuestNum  in if TUann", orGuestNum.value)
    }

    return {
      checkTimeToday() {

        if (dateInGermany.value === formattedString) {
          this.times = timesOrig.value.filter((pr) => {
            return pr.value > getTime;
          });
        } else {
          this.times = timesOrig.value
        }
      },
      reservations,
      goToNext,
      scrollToBottom() {
        // const element = document.getElementById("bottom");
        // element.scrollIntoView({ behavior: "smooth", block: "end" })

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        console.log("bottom")

      },
      dialog_time: ref(false),
      date_card: ref(false),
      button_next: ref(false),
      button_time: ref(false),
      dialog_reservation: ref(false),
      dialog_gespeichertDaten: ref(true),
      user,
      dateInGermany,
      time,

      // formattedString,
      proxyDate,
      guestNum,
      orGuestNum,
      guests,
      times,
      timesOrig,
      fromCurrendate(d) {
        const heute = date.formatDate(today, "YYYY/MM/DD");

        return d >= heute;
      },
      resetStatus() {
        $store.dispatch("cache/resetStatus");
      },
      changeStatus() {
        $store.dispatch("cache/changeStatus", 1);
        this.date_card = true;
      },

      // time: ref(""),

      updateProxy() {
        proxyDate.value = date.formatDate(today, "YYYY/MM/DD");
      },

      save() {
        dateInGermany.value = date.formatDate(proxyDate.value, "DD-MM-YYYY");
        // console.log("date ", dateInGermany.value);
        $store.dispatch("cache/changeStatus", 2);
      },
      reservationSave() {
        let guestNumber = "";
        if (orGuestNum.value !== "") {
          guestNumber = orGuestNum.value;
        } else {
          guestNumber = guestNum.value;
        }

        // console.log("Check time 2 with this ", this.time),
        axios({
          method: "post",
          url: `${WebApi.server}/reservationSave`,
          // data: JSON.stringify(product),

          data:
          // name : $store.state.cache.cart.getName,
          {
            // guestNum: (gue) => (gue.orGuestNum.value !=='' ? 15 : 12),
            guestNum: guestNumber,
            date: dateInGermany.value,
            time: time.value,
            name: user.value.name,
            mobil: user.value.mobil,
            note: user.value.note,
            status: 2,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            $q.notify({
              message: "Danke dir!!!^^",

              color: "positive",
              avatar: `${WebApi.iconUrl}`,

            });

            router.replace("/thank");
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // input validation
      adresseRules: [
        (val) =>
          (val !== null && val !== "" && !!val) ||
          "Please write your adresse!!",
      ],
      mobilRules: [
        (val) =>
          (val !== null &&
            val !== "" &&
            !!val &&
            val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?.*$/g)) ||
          // val.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g)) ||
          "Bitte geben Sie  richtige Telefonnummer ein",
        (val) =>
          (val.charAt(0) == 0 && !!val) || "Bitte geben Sie die richtige Telefonnummer mit 0 am Anfang ein",
        // (val.includes(0) && !!val) || "Please write a correct mobil",
      ],
      //end Input validation
    };
  },
};
</script>
<style>
.hoverButton:hover {
  background-color: #4caf50;
  /* Green */
  color: white;
}
</style>
