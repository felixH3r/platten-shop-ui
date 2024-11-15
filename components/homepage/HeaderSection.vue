<template>
  <section class="
            h-1/2 md:h-screen w-screen
            mb-64
            flex items-end justify-center
            md:pb-20
            pt-48
            bg-[url('https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/tisch_sample.jpeg')]
            bg-cover bg-center bg-black bg-opacity-25
            bg-blend-overlay
"
  >
    <!--    <NuxtImg-->
    <!--        src="https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/tisch_sample.jpeg"-->
    <!--        format="webp"-->
    <!--        loading="lazy"-->
    <!--    >-->
    <!--    </NuxtImg>-->
    <div class="flex flex-col w-full min-h-48 max-w-screen-xl bg-white rounded-2xl p-6 -mb-48 md:mb-0 shadow-xl">
      <h1>{{ TC.headerSection.header }}</h1>
      <h2 class="">{{ TC.headerSection.subHeader }}</h2>

      <div class="flex flex-col md:flex-row justify-between mb-6 mt-10">
        <div class="flex items-center gap-2">
          <LargeSelectionSVG class="w-10 h-10 md:w-20 md:h-20"/>
          <span>Große Auswahl</span>
        </div>
        <div class="flex items-center gap-2">
          <LargeSelectionSVG class="w-10 h-10 md:w-20 md:h-20"/>
          <span>Große Auswahl</span>
        </div>
        <div class="flex items-center gap-2">
          <LargeSelectionSVG class="w-10 h-10 md:w-20 md:h-20"/>
          <span>Große Auswahl</span>
        </div>

      </div>
      <div class="w-full flex justify-end">
        <CTAButton :content="TC.headerSection.ctaButton" :on-click="openConfigurator"/>
      </div>

    </div>
    <!--    <div class="flex items-end justify-between w-full lg:flex-row flex-col">-->
    <!--      <div class="flex flex-col lg:w-3/4">-->
    <!--        <h1>{{ TC.headerSection.header }}</h1>-->
    <!--        <h2 class="font-normal text-2xl">{{ TC.headerSection.subHeader }}</h2>-->
    <!--      </div>-->
    <!--      <CTAButton :content="TC.headerSection.ctaButton" :on-click="openConfigurator"/>-->
    <!--    </div>-->

  </section>
</template>

<script setup lang="ts">
  // import {TC} from "../../utils/text-content";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import {navigateTo} from "#app";
  import LargeSelectionSVG from "~/components/icons/LargeSelectionSVG.vue";

  const openConfigurator = (): void => {
    navigateTo('/shop-app');
  };
</script>

<style scoped lang="scss">

</style>
