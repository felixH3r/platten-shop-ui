<template>
  <div id="content-card" class="flex flex-col lg:flex-row gap-8 md:gap16 bg-base-200 p-5 md:p-10 rounded-3xl">
    <div class="flex flex-col gap-5 md:gap-16 lg:w-8/12">
      <h3 class="text-2xl font-bold">{{ title }}</h3>
      <span>{{ content }}</span>
    </div>
    <div class="flex flex-col gap-8 md:gap-16 justify-between items-end lg:w-4/12">
      <NuxtImg src="https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/tisch_sample.jpeg"
               format="webp"
               loading="lazy"
               class="rounded-2xl object-cover w-full md:h-96 lg:h-60"/>
      <CTAButton :content="ctaButton" :on-click="onClick"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CTAButton from "~/components/utils/CTAButton.vue";
  import type {PropType} from "@vue/runtime-core";

  const props = defineProps({
    title: String,
    content: String,
    ctaButton: String,
    onClick: Function as PropType<() => void>,
  });
</script>

<style scoped lang="scss">

</style>
