<template>
  <section>
    <h2 class="mb-10">{{ TC.cardsSection.header }}</h2>
    <div class="flex flex-col md:flex-row justify-between lg:mx-20">
      <IconCard :content="TC.cardsSection.content_1">
        <LargeSelection/>
      </IconCard>
      <IconCard :content="TC.cardsSection.content_2">
        <ProfessionSVG/>
      </IconCard>
      <IconCard :content="TC.cardsSection.content_3">
        <ShippingSVG/>
      </IconCard>
    </div>
  </section>
</template>

<script setup lang="ts">

  import {TC} from "../../utils/text-content";
  import IconCard from "~/components/utils/IconCard.vue";
  import LargeSelection from "~/components/icons/LargeSelectionSVG.vue";
  import ProfessionSVG from "~/components/icons/ProfessionSVG.vue";
  import ShippingSVG from "~/components/icons/ShippingSVG.vue";
</script>

<style scoped lang="scss">

</style>
