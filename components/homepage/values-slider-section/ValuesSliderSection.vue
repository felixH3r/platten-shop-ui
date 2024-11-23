<template>
  <section class="py-12 md:py-24 relative bg-base-200">
    <div class="w-full max-w-screen-xl mx-auto">
      <div class="w-full flex-col justify-start items-center lg:gap-12 gap-8 inline-flex">
        <div class="w-full flex-col justify-start items-center gap-3 flex">
          <span class="w-full text-center text-gray-500 text-base font-normal leading-relaxed">{{
              TC.valuesSliderSection.subtitle
            }}</span>
          <h2 class="w-full text-center text-4xl font-bold leading-normal">
            {{ TC.valuesSliderSection.title }}</h2>
        </div>
        <div class="w-full justify-start lg:items-end items-center lg:gap-16 gap-8 flex lg:flex-row flex-col">
          <NuxtImg class="object-cover w-96 h-96 rounded-2xl"
                   src="https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/mc_Esstisch_Skrakant_Render+2.jpg"
                   alt="How It Works image"/>
          <SliderComponent>
            <SliderCard :title="TC.valuesSliderSection.slide_1.title"
                        :subtitle="TC.valuesSliderSection.slide_1.subtitle"
                        :content="TC.valuesSliderSection.slide_1.content"/>
            <SliderCard :title="TC.valuesSliderSection.slide_2.title"
                        :subtitle="TC.valuesSliderSection.slide_2.subtitle"
                        :content="TC.valuesSliderSection.slide_2.content"/>
            <SliderCard :title="TC.valuesSliderSection.slide_3.title"
                        :subtitle="TC.valuesSliderSection.slide_3.subtitle"
                        :content="TC.valuesSliderSection.slide_3.content"/>
          </SliderComponent>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

  import SliderComponent from "~/components/homepage/values-slider-section/SliderComponent.vue";
  import SliderCard from "~/components/homepage/values-slider-section/SliderCard.vue";
</script>

<style scoped lang="scss">

</style>
