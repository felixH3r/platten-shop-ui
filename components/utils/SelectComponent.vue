<template>
  <div class="relative">
    <select
        class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        v-model="selected" @change="handleChange"
    >
      <option v-for="(value, index) in values"> {{ value }}</option>
    </select>

    <div class="absolute top-1/2 end-3 -translate-y-1/2">
      <svg class="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg"
           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="m7 15 5 5 5-5"/>
        <path d="m7 9 5-5 5 5"/>
      </svg>
    </div>
  </div>

</template>

<script setup lang="ts">

  import {PricedVariant} from "@medusajs/medusa/dist/types/pricing";

  const selected = ref<string | null>(null);

  const props = defineProps<{
    values: Array<string | undefined>;
    onSelect: (selectedVariant: string) => void;
  }>();

  onMounted(() => {
    if (props.values && props.values[0]) {
      selected.value = props.values[0];
      handleChange();
    }
  });

  const handleChange = () => {
    if (!selected.value) {
      return;
    }
    props.onSelect(selected.value);
  };

  watch(() => props.values, (newValues) => {
    if (newValues && newValues[0]) {
      // Always set the default value to the first item in new values
      selected.value = newValues[0];
      handleChange();
    }
  });


</script>

<style scoped lang="scss">
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
</style>
