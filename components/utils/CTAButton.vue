<template>
  <button
      @click="props.onClick"
      class="flex rounded-full bg-cta px-10 py-3 text-white"
  >
    {{ content }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    content: String,
    onClick: Function
  });
</script>

<style scoped lang="scss">

</style>
