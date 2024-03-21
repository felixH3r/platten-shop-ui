<template>
  <div class="flex flex-col gap-0 h-12 mt-1">
    <div
        class="flex justify-between w-full bg-white py-3 px-5 block w-9/12 border-gray-200 rounded-full text-sm disabled:opacity-50 disabled:pointer-events-none"
        :class="{'error': showError}"
    >
      <input :id="identifier" :placeholder="props.placeholder" :type="inputType || 'text'"
             @input="props.onInput"
             ref="inputEl"
             class="w-full outline-none selection:transparent"
      >
      <div>
        <slot></slot>
        <span v-if="isRequired" class="text-cta">*</span>
      </div>
    </div>
    <span v-if="showError" class="text-sm text-red h-5">{{ errorMsg }}</span>
  </div>
</template>

<script setup lang="ts">

  import {boolean} from "@oclif/parser/lib/flags";
  import {AdminPostOrdersClaimFulfillmentsCancelParams} from "@medusajs/medusa";
  import {useMainStore} from "~/store/mainStore";

  const props = defineProps<{
    placeholder?: string,
    onInput?: (_event: InputEvent, inputFieldValue: string) => void,
    inputType?: string,
    isRequired?: boolean,
    identifier?: string,
    customValidate?: () => boolean,
  }>();

  const inputEl = ref<HTMLInputElement | null>(null);
  const showError = ref(false);
  const errorMsg = ref('');

  const validate = (customErrMsg = '', customValidate?: (input: string) => boolean): boolean => {
    showError.value = false;
    errorMsg.value = '';
    if (!props.isRequired || !inputEl.value) {
      return true;
    }
    if (!inputEl.value.value) {
      showError.value = true;
      errorMsg.value = TC.errorMsg.required;
      return false;
    }
    if (customValidate !== undefined && !customValidate(inputEl.value.value)) {
      errorMsg.value = customErrMsg;
      showError.value = true;
      return false;
    }
    return true;
  };

  defineExpose({
    inputEl: inputEl,
    validate
  });
</script>

<style scoped lang="scss">
  .error {
    border: 1px solid red;
  }
</style>
