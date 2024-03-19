<template>
  <div class="flex w-full">
    <input :id="identifier" :placeholder="props.placeholder" :type="inputType || 'text'"
           @input="props.onInput"
           ref="inputEl"
           class=" w-full py-3 px-5 block w-9/12 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
           :class="{'error': showError}"
    >
    <slot class="absolute"></slot>
    <span v-if="showError" class="absolute text-sm text-red right-20 pt-7">{{ errorMsg }}</span>
    <span v-if="isRequired" class="absolute right-10 pt-1 text-cta">*</span>
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
