<template>
  <!-- Input Number -->
  <div class="inline-block"
       data-hs-input-number>
    <div class="flex items-center gap-x-1.5">
      <button type="button"
              class="w-7 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full bg-primary-variant text-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              @click="decrease"
              data-hs-input-number-decrement>
        <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M5 12h14"/>
        </svg>
      </button>

      <input class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0" type="number"
             v-model="currentVal">

      <button type="button"
              class="w-7 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full bg-primary-variant text-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
              @click="increaseQty">
        <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
      </button>
    </div>
  </div>
  <!-- End Input Number -->
</template>

<script setup lang="ts">
  import {Nullable} from '~/utils/types';

  const props = defineProps<{
    defaultValue: Number,
    onChange: (newVal: number) => Promise<void>
  }>();

  const currentVal = ref(props.defaultValue as number);

  const increaseQty = async () => {
    currentVal.value++;
    await props.onChange(currentVal.value);
  };

  const decrease = async () => {
    currentVal.value--;
    await props.onChange(currentVal.value);
  };

  // const onChange = async () => {
  //   if (inputEl.value) {
  //     await props.onChange(parseInt(inputEl.value.value));
  //   }
  // };
</script>

<style scoped lang="scss">

</style>
