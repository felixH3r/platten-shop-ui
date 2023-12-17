<template>
  <input :placeholder="props.placeholder" type="text" @input="props.onInput" ref="inputEl"
         class="py-3 px-5 block w-9/12 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
</template>

<script setup lang="ts">
  const props = defineProps({
    placeholder: String,
    onInput: Function
  });
  const inputEl = ref<HTMLInputElement | null>(null);

  defineExpose({
    inputEl: inputEl
  });
</script>

<style scoped lang="scss">
</style>
