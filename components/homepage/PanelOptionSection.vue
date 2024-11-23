<template>
  <section class="flex justify-center w-full py-12 md:pb-20 md:pt-24">
    <div class="max-w-screen-xl text-center w-full ">
      <h2 class="text-2xl md:text-4xl font-bold pb-3">{{ TC.panelOptionSection.header }}</h2>
      <p class="pb-14"> Platten auf Maß, die begeistern!</p>
      <PanelOptionsSlider/>
    </div>
  </section>
</template>

<script setup lang="ts">

  import PanelOptionsSlider from "~/components/panel-configurator/panel-content/PanelOptionsSlider.vue";
</script>

<style scoped lang="scss">

</style>
