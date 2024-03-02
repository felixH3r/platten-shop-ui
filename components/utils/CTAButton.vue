<template>
  <div class="flex items-center">
    <button
        @click="props.onClick"
        class="flex items-center rounded-full bg-cta px-10 py-3 text-white"
        type="submit"
    >
      <div
          v-if="isLoading"
          class="absolute right-1 animate-spin inline-block border-[3px] border-current border-t-transparent text-gray rounded-full h-5 w-5 mr-2"
          role="status" aria-label="loading">
      </div>
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
