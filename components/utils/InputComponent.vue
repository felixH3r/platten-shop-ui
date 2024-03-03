<template>
  <div class="flex w-full">
    <input :id="identifier" v-model="inputVal" :placeholder="props.placeholder" :type="inputType || 'text'"
           @input="props.onInput"
           ref="inputEl"
           class=" w-full py-3 px-5 block w-9/12 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
           :class="{'error': showError}"
    >
    <span v-if="isRequired" class="absolute right-10 pt-1 text-cta">*</span>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
    placeholder: String,
    onInput: Function,
    inputType: String,
    isRequired: Boolean,
    identifier: String,
  });

  const inputEl = ref<HTMLInputElement | null>(null);
  const inputVal = ref('');
  const showError = ref(false);

  const validate = (): boolean => {
    if (!props.isRequired || !inputEl.value) {
      return true;
    }
    if (!inputEl.value.value) {
      showError.value = true;
      return false;
    }
    return true;
  };


  defineExpose({
    inputEl: inputEl,
    inputVal: inputVal,
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
