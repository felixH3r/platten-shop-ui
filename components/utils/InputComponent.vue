<template>
  <div class="flex w-full">
    <input :id="identifier" :placeholder="props.placeholder" :type="inputType || 'text'"
           @input="props.onInput"
           ref="inputEl"
           class=" w-full py-3 px-5 block w-9/12 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
           :class="{'error': showError}"
    >
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

  const validate = (): boolean => {
    if (!props.isRequired || !inputEl.value) {
      return true;
    }
    if (!inputEl.value.value) {
      showError.value = true;
      useMainStore().formValidation.errorOccurred = true;
      return false;
    }
    // if (props.customValidate !== undefined && !props.customValidate()) {
    //   useMainStore().formValidation.errorOccurred = true;
    //   return false;
    // }
    return true;
  };

  // watch(() => useMainStore().getValidateInput, validate);


  defineExpose({
    inputEl: inputEl,
    validate
  });
</script>

<style scoped lang="scss">
  //.valid input {
  //  border: 1px solid green;
  //}
  //
  .error {
    border: 1px solid red;
  }
</style>
