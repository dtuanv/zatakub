<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 60vw">
      <q-card-section>
        <div class="text-h5 flex flex-center">Register Page</div>
      </q-card-section>

      <q-form @submit="submitNewRegister" @reset="resetForm" class="q-gutter-md">
        <q-input
          outlined
          v-model="username"
          label="Your username *"
          hint="Username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please write your userusername']"
        />

        <q-input
          outlined
          type="password"
          v-model="password"
          label="Your password *"
          hint="Password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please write your password']"
        />
        <q-input
          label="admin code: "
          v-model="code"
          :rules="[(val) => (val && val.length > 0) || 'Please write admin code']"
        >
        </q-input>

        <div>
          <q-btn
            label="Register"
            type="submit"
            color="primary"
            :loading="isLoading"
            :disable="isLoading"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
      </q-form>
      <q-ajax-bar
        ref="ajaxBar"
        position="bottom"
        color="accent"
        size="10px"
        skip-hijack
      />
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { RegisterService, RegisterRequest } from "src/services/RegisterService";

export default {
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const registerService = new RegisterService();
    const username = ref(null);
    const password = ref(null);
    const code = ref("");
    const ajaxBar = ref(null);

    const isLoading = computed(() => {
      return $store.getters["isLoadingModule/getIsLoadingStatus"];
    });

    const resetForm = () => {
      name.value = null;
      password.value = null;
    };

    const notifySuccessRegister = () => {
      $q.notify({
        message: "You successfully registered..",
        color: "positive",
      });
    };

    const notifyFailedRegister = () => {
      $q.notify({
        message: "failed!!",
        color: "negative",
        avatar: `${WebApi.iconUrl}`,
      });
    };

    const submitNewRegister = async () => {
      try {
        if (
          code.value ===
          "nuradtaminmozaiduojckjdkhfhdangnha#sdsd/*/8988()&%pvaonha51515+784kub934.,nxzs2@3f³"
        ) {
          ajaxBar.value.start();
          $store.dispatch("isLoadingModule/setIsLoadingToTrue");
          const registerRequest = new RegisterRequest(username.value, password.value);
          await registerService.doRegister(registerRequest);
          notifySuccessRegister();
        } else {
          $q.notify({
            message: "invalid code..",
            color: "negative",
            avatar: `${WebApi.iconUrl}`,
          });
        }
      } catch (error) {
        notifyFailedRegister();
        console.log(error);
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
        ajaxBar.value.stop();
      }
    };

    return {
      code,
      username,
      password,
      resetForm,
      submitNewRegister,
      ajaxBar,
      isLoading,
    };
  },
};
</script>
