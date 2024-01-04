<template>
  <!--  Select-->
  <!--  <div class="relative">-->
  <!--    <select data-hs-select='{-->
  <!--        "placeholder": "Select option...",-->
  <!--        "toggleTag": "<button type=\"button\"></button>",-->
  <!--        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white rounded-full text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",-->
  <!--        "dropdownClasses": "mt-2 z-50 w-full max-h-[300px] p-1 space-y-0.5 bg-white rounded-lg overflow-hidden overflow-y-auto dark:bg-slate-900 dark:border-gray-700",-->
  <!--        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-gray-200 dark:focus:bg-slate-800",-->
  <!--        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"-->
  <!--      }' class="">-->
  <!--      <option v-for="(value, index) in valuesComputed" :key="value"> {{ value }}</option>-->
  <!--    </select>-->

  <!--    <div class="absolute top-1/2 end-3 -translate-y-1/2">-->
  <!--      <svg class="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg"-->
  <!--           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"-->
  <!--           stroke-linecap="round" stroke-linejoin="round">-->
  <!--        <path d="m7 15 5 5 5-5"/>-->
  <!--        <path d="m7 9 5-5 5 5"/>-->
  <!--      </svg>-->
  <!--    </div>-->
  <!--  </div>-->


  <!-- End Select -->
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
    if (props.values[0]) {
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
