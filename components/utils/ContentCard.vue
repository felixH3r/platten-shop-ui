<template>
  <div id="content-card" class="flex flex-col lg:flex-row gap-16 bg-base-200 p-5 md:p-10 rounded-3xl">
    <div class="flex flex-col gap-16 lg:w-8/12">
      <h3>{{ title }}</h3>
      <span>{{ content }}</span>
    </div>
    <div class="flex flex-col gap-16 justify-between items-end lg:w-4/12">
      <NuxtImg src="https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/tisch_sample.jpeg"
               format="webp"
               loading="lazy"
               class="rounded-2xl object-cover w-full md:h-96 lg:h-60"/>
      <CTAButton :content="ctaButton"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CTAButton from "~/components/utils/CTAButton.vue";

  const props = defineProps({
    title: String,
    content: String,
    ctaButton: String,
  });
</script>

<style scoped lang="scss">

</style>
