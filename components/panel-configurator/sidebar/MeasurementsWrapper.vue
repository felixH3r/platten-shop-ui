<template>
  <h4>{{ header }}</h4>
  <input :placeholder="props.inputPlaceholder" class="measurement-input">
</template>

<script lang="ts" setup>
  const props = defineProps({
    header: String,
    inputPlaceholder: String,
  });

</script>

<style scoped lang="scss">
  $input-padding: 1.5rem;
  .measurement-input {
    width: calc(100% - 2 * $input-padding);
    padding: 0 $input-padding;
    height: 2.5rem;
    font-family: $font-family-body;
    border: none;
    border-radius: $le_ri_fully_rounded;
  }
</style>
