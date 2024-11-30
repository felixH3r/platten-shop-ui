<template>
  <section class="flex justify-center">
    <div class="max-w-screen-xl">
      <!--      <h2 class="mb-10">{{ TC.contentCardSection.header }}</h2>-->
      <ContentCard :title="TC.contentCardSection.title" :content="TC.contentCardSection.content"
                   :image-url="'https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/tisch_sample.jpeg'"
                   :image-alt="'Beispiel für neue Tischplatte mit Holzzuschnitten'"
                   :cta-button="TC.contentCardSection.ctaButton" :on-click="onCTAClick"/>
    </div>
  </section>
</template>

<script setup lang="ts">

  import {TC} from "../../utils/text-content";
  import ContentCard from "~/components/utils/ContentCard.vue";
  import {navigateTo} from "#app";

  const onCTAClick = () => {
    navigateTo('/shop-app');
  };
</script>

<style scoped lang="scss">

</style>
