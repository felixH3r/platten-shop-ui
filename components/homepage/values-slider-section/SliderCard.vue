<template>
  <div class="swiper-slide">
    <div class="w-full flex-col justify-center items-start gap-4 flex">
          <span
              class="w-full text-base font-medium leading-relaxed lg:text-start text-center">{{ props.subtitle }}</span>
      <div class="w-full flex-col justify-center lg:items-start items-center gap-1.5 flex">
        <h4 class="text-gray-900 text-xl font-semibold leading-8 lg:text-start text-center">{{ props.title }}</h4>
        <p class="lg:max-w-3xl w-full text-gray-400 text-base font-normal leading-relaxed lg:text-start text-center">
          {{ props.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string,
    subtitle: string,
    content: string,
  }>();

</script>

<style scoped lang="scss">

</style>
