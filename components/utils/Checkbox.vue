<template>
  <div class="inline-flex gap-3 items-center">
    <label class="relative flex items-center rounded-full cursor-pointer" htmlFor="checkbox">
      <input type="checkbox"
             class="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
             id="checkbox" v-model="checked" @change="onChange"/>
      <span
          class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="black"
           stroke="black" stroke-width="1">
        <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
      </svg>
    </span>
    </label>
    {{ label }}
  </div>
</template>

<script setup lang="ts">

  const props = defineProps<{
    label: String,
    onChecked: (checked: boolean) => void
  }>();

  const checked = ref(false);

  const onChange = (): void => {
    props.onChecked(checked.value);
  };

</script>

<style scoped lang="scss">

</style>
