<template>
  <section class="
          h-screen bg-primary w-screen
          flex items-center justify-start"
  >
    <div class="flex items-end justify-between w-full lg:flex-row flex-col">
      <div class="flex flex-col lg:w-3/4">
        <h1>{{ TC.headerSection.header }}</h1>
        <h2 class="font-normal text-2xl">{{ TC.headerSection.subHeader }}</h2>
      </div>
      <CTAButton :content="TC.headerSection.ctaButton"/>
    </div>
  </section>
</template>

<script setup lang="ts">

  import {TC} from "../../utils/text-content";
  import CTAButton from "~/components/utils/CTAButton.vue";
</script>

<style scoped lang="scss">

</style>
