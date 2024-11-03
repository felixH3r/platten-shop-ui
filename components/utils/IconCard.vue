<template>
  <div class="
    pr-3 my-5 w-full text-right
    md:w-56 md:h-72 md:p-8 md:text-left rounded-2xl bg-base-200
    flex md:flex-col items-center justify-between">
    <slot></slot>
    <h3>{{ title }}</h3>
    <span class="w-2/4 md:w-full md:self-start">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String,
    content: String,
  });
</script>

<style scoped lang="scss">

</style>
