<template>
  <section>
    <h2 class="mb-10">{{ TC.contentCardSection.header }}</h2>
    <ContentCard :title="TC.contentCardSection.title" :content="TC.contentCardSection.content"
                 :cta-button="TC.contentCardSection.ctaButton"/>
  </section>
</template>

<script setup lang="ts">

  import {TC} from "../../utils/text-content";
  import ContentCard from "~/components/utils/ContentCard.vue";
</script>

<style scoped lang="scss">

</style>
