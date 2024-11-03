<template>
  <div class="flex items-center">
    <button
        @click="props.onClick"
        class="btn btn-primary px-7"
        type="submit"
        :class="{'pl-3' : isLoading}"
    >
      <span
          v-if="isLoading"
          class="loading loading-spinner"
          role="status" aria-label="loading">
      </span>
      {{ content }}
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    content: String,
    onClick: Function,
    isLoading: Boolean,
  });
</script>

<style scoped lang="scss">

</style>
