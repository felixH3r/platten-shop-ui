<template>
  <h4>{{ header }}</h4>
  <input :placeholder="props.inputPlaceholder">
</template>

<script lang="ts" setup>
  const props = defineProps({
    header: String,
    inputPlaceholder: String,
  });

</script>

<style scoped lang="scss">

</style>
