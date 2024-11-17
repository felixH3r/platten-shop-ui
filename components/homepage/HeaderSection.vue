<template>
  <section class="
            h-[70vh] md:h-screen w-screen
            mb-32 md:mb-12
            flex items-end justify-center
            md:pb-20
            pt-40
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
    <div class="
      flex flex-col w-full min-h-48 max-w-screen-xl bg-white rounded-2xl 
      p-6 md:p-10 -mb-32 md:mb-0
      shadow-xl
    ">
      <h1 class="pb-2 md:pb-5">{{ TC.headerSection.header }}</h1>
      <h2 class="font-light text-gray">{{ TC.headerSection.subHeader }}</h2>

      <div class="flex flex-col gap-3 md:flex-row justify-between mb-6 mt-6 md:mt-10">
        <div class="flex items-center gap-2 md:gap-4">
          <StarsSVG class="w-7 h-7 md:w-12 md:h-12"/>
          <span class="">{{ TC.headerSection.usp_1 }}</span>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <TumbUpSVG class="w-7 h-7 md:w-12 md:h-12"/>
          <span class="">{{ TC.headerSection.usp_2 }}</span>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <RocketSVG class="w-7 h-7 md:w-12 md:h-12"/>
          <span>{{ TC.headerSection.usp_3 }}</span>
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
  import StarsSVG from "~/components/icons/StarsSVG.vue";
  import RocketSVG from "~/components/icons/RocketSVG.vue";
  import TumbUpSVG from "~/components/icons/TumbUpSVG.vue";

  const openConfigurator = (): void => {
    navigateTo('/shop-app');
  };
</script>

<style scoped lang="scss">

</style>
